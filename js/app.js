/*
 * Quiz engine. Renders every quiz in QUIZZES (js/data.js) with one shared flow:
 * intro → questions → result. All DOM is built with createElement/textContent (no innerHTML).
 */
'use strict';

(() => {
  const STORAGE_KEY = 'shaman-quiz-completed';
  const SLIDER_MAX = 10;
  const XP = { answer: 10, correct: 35, streakBonus: 5, streakAt: 3 };
  const LEVELS = [
    { min: 0, name: 'Seedling' },
    { min: 50, name: 'Sprout' },
    { min: 100, name: 'Healer' },
    { min: 140, name: 'Shaman' },
  ];

  const QUIZ_BY_ID = new Map(QUIZZES.map((quiz) => [quiz.id, quiz]));
  const grid = document.getElementById('quiz-grid');
  const stage = document.getElementById('quiz-stage');
  const content = document.getElementById('stage-content');
  const announcer = document.getElementById('announcer');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  let state = null;

  /* ---------- helpers ---------- */

  function el(tag, props = {}, ...children) {
    const node = document.createElement(tag);
    Object.entries(props).forEach(([key, value]) => {
      if (value == null || value === false) return;
      if (key === 'class') node.className = value;
      else if (key === 'text') node.textContent = value;
      else if (/^on[A-Z]/.test(key) && typeof value === 'function') node.addEventListener(key.slice(2).toLowerCase(), value);
      else node.setAttribute(key, value === true ? '' : String(value));
    });
    children.flat().forEach((child) => {
      if (child == null || child === false) return;
      node.append(child instanceof Node ? child : String(child));
    });
    return node;
  }

  const icon = (name, size = 20) => createIcon(name, { size });

  function announce(message) {
    announcer.textContent = '';
    // Re-set on next frame so repeated messages are still announced.
    requestAnimationFrame(() => { announcer.textContent = message; });
  }

  function render(build) {
    const update = () => {
      content.replaceChildren(build());
      content.querySelector('[data-focus]')?.focus({ preventScroll: true });
    };
    if (document.startViewTransition && !reducedMotion.matches) document.startViewTransition(update);
    else update();
  }

  function scrollToEl(node) {
    node.scrollIntoView({ behavior: reducedMotion.matches ? 'auto' : 'smooth', block: 'start' });
  }

  /* ---------- completion tracking (per-browser convenience only) ---------- */

  function readCompleted() {
    try {
      const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]');
      return new Set(Array.isArray(parsed) ? parsed.filter((id) => QUIZ_BY_ID.has(id)) : []);
    } catch {
      return new Set();
    }
  }

  function markCompleted(id) {
    const completed = readCompleted();
    completed.add(id);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...completed]));
    } catch {
      // Storage unavailable (private mode etc.) — badges just won't persist.
    }
    renderCompletion(completed);
  }

  function renderCompletion(completed = readCompleted()) {
    const total = QUIZZES.length;
    const done = completed.size;
    document.getElementById('completion-text').textContent = done === total
      ? `All ${total} quizzes completed`
      : `${done} of ${total} quizzes completed`;
    const bar = document.getElementById('completion-bar');
    bar.max = total;
    bar.value = done;
    bar.textContent = `${done} of ${total}`;
    grid.querySelectorAll('[data-quiz]').forEach((card) => {
      card.classList.toggle('is-complete', completed.has(card.dataset.quiz));
    });
  }

  /* ---------- picker ---------- */

  function questionCount(quiz) {
    return quiz.questions.reduce((sum, q) => sum + (q.type === 'sliders' ? q.sliders.length : 1), 0);
  }

  function renderPicker() {
    const cards = QUIZZES.map((quiz, i) => el('li', {},
      el('article', { class: 'quiz-card', 'data-quiz': quiz.id },
        el('div', { class: 'quiz-card-media' },
          quiz.image
            ? el('img', { src: quiz.image, alt: '', width: 400, height: 300, loading: 'lazy', decoding: 'async' })
            : el('div', { class: 'media-placeholder' }, icon('image', 32), el('span', { text: 'Image 400 × 300' })),
          el('span', { class: 'quiz-card-num', text: String(i + 1).padStart(2, '0') }),
          el('span', { class: 'done-badge' }, icon('check', 14), 'Completed'),
        ),
        el('div', { class: 'quiz-card-body' },
          el('p', { class: 'quiz-card-kicker' }, icon(quiz.icon, 16), quiz.mechanic),
          el('h3', { class: 'quiz-card-title', text: quiz.title }),
          el('p', { class: 'quiz-card-text', text: quiz.tagline }),
          el('p', { class: 'quiz-card-meta' },
            `${questionCount(quiz)} questions · ${quiz.minutes} min`,
            quiz.ageGate ? el('span', { class: 'age-tag', text: '21+' }) : null,
          ),
          el('button', {
            type: 'button',
            class: 'btn btn-primary quiz-card-btn',
            'aria-controls': 'quiz-stage',
            'aria-label': `Start ${quiz.title}`,
            onClick: () => openQuiz(quiz.id),
          }, 'Start quiz'),
        ),
      ),
    ));
    grid.replaceChildren(...cards);
  }

  /* ---------- flow ---------- */

  function openQuiz(id) {
    const quiz = QUIZ_BY_ID.get(id);
    if (!quiz) return;
    state = { quiz, step: -1, answers: [], xp: 0, streak: 0, bestStreak: 0, correct: 0 };
    if (location.hash !== `#${id}`) history.replaceState(null, '', `#${id}`);
    grid.querySelectorAll('.quiz-card').forEach((card) => {
      card.classList.toggle('is-active', card.dataset.quiz === id);
    });
    stage.hidden = false;
    render(renderIntro);
    scrollToEl(stage);
  }

  function closeQuiz() {
    const id = state?.quiz.id;
    state = null;
    stage.hidden = true;
    history.replaceState(null, '', location.pathname + location.search);
    grid.querySelectorAll('.quiz-card').forEach((card) => card.classList.remove('is-active'));
    const button = grid.querySelector(`[data-quiz="${id}"] button`);
    if (button) {
      scrollToEl(button.closest('.quiz-card'));
      button.focus({ preventScroll: true });
    }
  }

  function goTo(step) {
    state.step = step;
    render(step >= state.quiz.questions.length ? renderResult : renderQuestion);
    // Keep the new step in view when the previous one was scrolled past.
    if (stage.getBoundingClientRect().top < 0) scrollToEl(stage);
  }

  /* ---------- scoring ---------- */

  function addScores(totals, map, factor = 1) {
    Object.entries(map ?? {}).forEach(([id, points]) => {
      totals[id] = (totals[id] ?? 0) + points * factor;
    });
  }

  function computeScores(quiz, answers) {
    const totals = {};
    quiz.questions.forEach((q, i) => {
      const answer = answers[i];
      if (answer == null || q.type === 'trivia') return;
      if (q.type === 'sliders') q.sliders.forEach((s) => addScores(totals, s.weights, answer[s.id] ?? 0));
      else addScores(totals, q.options[answer]?.scores);
    });
    return totals;
  }

  function candidateIds(quiz) {
    const ids = new Set();
    quiz.questions.forEach((q) => {
      if (q.type === 'sliders') q.sliders.forEach((s) => Object.keys(s.weights).forEach((id) => ids.add(id)));
      else q.options.forEach((o) => Object.keys(o.scores ?? {}).forEach((id) => ids.add(id)));
    });
    return [...ids];
  }

  function rank(totals, pool) {
    return [...pool].sort((a, b) => (totals[b] ?? 0) - (totals[a] ?? 0));
  }

  function levelFor(xp) {
    const index = LEVELS.findLastIndex((level) => xp >= level.min);
    return { ...LEVELS[index], next: LEVELS[index + 1] ?? null };
  }

  /* ---------- shared UI pieces ---------- */

  function stageHeader({ showProgress = true } = {}) {
    const { quiz, step } = state;
    const total = quiz.questions.length;
    return el('div', { class: 'stage-header' },
      el('div', { class: 'stage-bar' },
        el('button', { type: 'button', class: 'btn-link', onClick: closeQuiz }, icon('arrow-left', 16), 'All quizzes'),
        el('span', { class: 'stage-quiz-name' }, icon(quiz.icon, 16), quiz.title),
      ),
      showProgress
        ? el('div', { class: 'step-progress' },
          el('p', { id: 'step-label', class: 'step-label', text: `Question ${step + 1} of ${total}` }),
          el('progress', { max: total, value: step + 1, 'aria-labelledby': 'step-label' }),
        )
        : null,
      quiz.gamified ? buildHud() : null,
    );
  }

  function buildHud() {
    const level = levelFor(state.xp);
    const span = level.next ? level.next.min - level.min : 1;
    const into = level.next ? state.xp - level.min : 1;
    return el('div', { class: 'hud', role: 'group', 'aria-label': 'Quest stats' },
      el('p', { class: 'hud-stat' }, el('strong', { text: `${state.xp}` }), ' XP'),
      el('p', { class: 'hud-stat' }, icon('flame', 16), `Streak ${state.streak}`),
      el('div', { class: 'hud-level' },
        el('p', { id: 'hud-level-label', text: `Level: ${level.name}${level.next ? ` (next: ${level.next.name} at ${level.next.min} XP)` : ' (max level)'}` }),
        el('progress', { max: span, value: into, 'aria-labelledby': 'hud-level-label' }),
      ),
    );
  }

  function refreshHud() {
    content.querySelector('.hud')?.replaceWith(buildHud());
  }

  function questionHeading(text, help) {
    return [
      el('h2', { id: 'stage-title', class: 'question-title', tabindex: '-1', 'data-focus': true, text }),
      help ? el('p', { class: 'question-help', text: help }) : null,
    ];
  }

  function actions(...buttons) {
    return el('div', { class: 'actions' }, ...buttons);
  }

  function backButton() {
    if (state.step <= 0 || state.quiz.gamified) return null;
    return el('button', { type: 'button', class: 'btn btn-outline', onClick: () => goTo(state.step - 1) }, 'Back');
  }

  function optionCard({ name, value, label, iconName, checked }) {
    return el('label', { class: `option-card${iconName ? '' : ' is-text'}` },
      el('input', { type: 'radio', name, value, required: true, checked }),
      iconName ? el('span', { class: 'option-icon' }, icon(iconName, 30)) : null,
      el('span', { class: 'option-label', text: label }),
      el('span', { class: 'option-mark' }, icon('check', 14)),
    );
  }

  /* ---------- screens ---------- */

  function renderIntro() {
    const { quiz } = state;
    const start = () => goTo(0);
    const meta = el('ul', { class: 'intro-meta' },
      el('li', {}, icon('list', 18), `${questionCount(quiz)} questions`),
      el('li', {}, icon('clock', 18), `About ${quiz.minutes} min`),
      el('li', {}, icon(quiz.icon, 18), quiz.mechanic),
    );

    const body = quiz.ageGate
      ? el('form', { class: 'age-gate', onSubmit: (e) => { e.preventDefault(); start(); } },
        el('p', { class: 'age-note', text: 'This quiz recommends hemp flower products intended for adults 21 and older.' }),
        el('label', { class: 'check' },
          el('input', { type: 'checkbox', name: 'age', required: true }),
          ' I confirm I am 21 years of age or older',
        ),
        actions(el('button', { type: 'submit', class: 'btn btn-primary' }, 'Start quiz')),
      )
      : actions(el('button', { type: 'button', class: 'btn btn-primary', onClick: start }, 'Start quiz'));

    return el('div', { class: 'screen screen-intro' },
      stageHeader({ showProgress: false }),
      el('div', { class: 'intro-icon' }, icon(quiz.icon, 36)),
      el('h2', { id: 'stage-title', tabindex: '-1', 'data-focus': true, text: quiz.title }),
      el('p', { class: 'intro-lead', text: quiz.tagline }),
      meta,
      quiz.gamified
        ? el('p', { class: 'intro-note', text: `Correct trivia answers earn bonus XP. Reach ${quiz.reward.minXp} XP to unlock a discount code. Answers are final once submitted.` })
        : null,
      body,
    );
  }

  function renderQuestion() {
    const question = state.quiz.questions[state.step];
    const builders = { choice: buildChoice, duel: buildDuel, sliders: buildSliders, trivia: buildTrivia };
    return el('div', { class: `screen screen-${question.type}` },
      stageHeader(),
      builders[question.type](question),
    );
  }

  function recordAnswer(value) {
    state.answers[state.step] = value;
    if (state.quiz.gamified) awardXp(XP.answer);
  }

  function awardXp(points) {
    state.streak += 1;
    state.bestStreak = Math.max(state.bestStreak, state.streak);
    const bonus = state.streak >= XP.streakAt ? XP.streakBonus : 0;
    state.xp += points + bonus;
    return points + bonus;
  }

  function buildChoice(question) {
    const previous = state.answers[state.step];
    const onSubmit = (e) => {
      e.preventDefault();
      const value = e.currentTarget.elements.answer.value;
      if (value === '') return;
      recordAnswer(Number(value));
      goTo(state.step + 1);
    };
    return el('form', { class: 'question', onSubmit },
      el('fieldset', {},
        el('legend', {}, ...questionHeading(question.prompt, question.help)),
        el('div', { class: 'option-grid' },
          question.options.map((option, i) => optionCard({
            name: 'answer', value: i, label: option.label, iconName: option.icon, checked: previous === i,
          })),
        ),
      ),
      actions(backButton(), el('button', { type: 'submit', class: 'btn btn-primary' }, 'Next')),
    );
  }

  function buildDuel(question) {
    const [left, right] = question.options;
    const pick = (i) => {
      recordAnswer(i);
      goTo(state.step + 1);
    };
    const duelButton = (option, i) => el('button', {
      type: 'button',
      class: `duel-btn${state.answers[state.step] === i ? ' is-selected' : ''}`,
      onClick: () => pick(i),
    }, el('span', { class: 'duel-icon' }, icon(option.icon, 44)), el('span', { class: 'duel-label', text: option.label }));

    return el('div', { class: 'question' },
      ...questionHeading(question.prompt, 'Tap the one that fits you best.'),
      el('div', { class: 'duel', role: 'group', 'aria-labelledby': 'stage-title' },
        duelButton(left, 0),
        el('span', { class: 'duel-vs', 'aria-hidden': 'true', text: 'or' }),
        duelButton(right, 1),
      ),
      actions(backButton()),
    );
  }

  function buildSliders(question) {
    const previous = state.answers[state.step] ?? {};
    const fields = question.sliders.map((slider) => {
      const inputId = `slider-${slider.id}`;
      const value = previous[slider.id] ?? Math.round(SLIDER_MAX / 2);
      const output = el('output', { for: inputId, class: 'slider-value', text: value });
      const input = el('input', {
        type: 'range', id: inputId, name: slider.id, min: 0, max: SLIDER_MAX, step: 1, value,
        'aria-describedby': `${inputId}-scale`,
        onInput: (e) => { output.textContent = e.target.value; },
      });
      return el('div', { class: 'slider-field' },
        el('div', { class: 'slider-head' }, el('label', { for: inputId, text: slider.label }), output),
        input,
        el('p', { class: 'slider-scale', id: `${inputId}-scale` },
          el('span', { text: `0 · ${slider.minLabel}` }),
          el('span', { text: `${slider.maxLabel} · ${SLIDER_MAX}` }),
        ),
      );
    });

    const onSubmit = (e) => {
      e.preventDefault();
      const form = e.currentTarget;
      const values = Object.fromEntries(question.sliders.map((s) => {
        const n = Number(form.elements[s.id].value);
        return [s.id, Number.isFinite(n) ? Math.min(Math.max(n, 0), SLIDER_MAX) : 0];
      }));
      recordAnswer(values);
      goTo(state.step + 1);
    };

    return el('form', { class: 'question', onSubmit },
      ...questionHeading(question.prompt, question.help),
      el('div', { class: 'slider-list' }, fields),
      actions(backButton(), el('button', { type: 'submit', class: 'btn btn-primary' }, 'Build my ritual')),
    );
  }

  function buildTrivia(question) {
    const feedback = el('div', { class: 'trivia-feedback', hidden: true });
    const nextButton = el('button', { type: 'button', class: 'btn btn-primary', hidden: true, onClick: () => goTo(state.step + 1) }, 'Next');
    const checkButton = el('button', { type: 'submit', class: 'btn btn-primary' }, 'Check answer');

    const onSubmit = (e) => {
      e.preventDefault();
      const form = e.currentTarget;
      const value = form.elements.answer.value;
      if (value === '') return;
      const chosen = Number(value);
      const isCorrect = question.options[chosen]?.correct === true;
      state.answers[state.step] = chosen;

      let message;
      if (isCorrect) {
        state.correct += 1;
        const gained = awardXp(XP.answer + XP.correct);
        message = `Correct! +${gained} XP`;
      } else {
        state.streak = 0;
        message = `Not quite. The answer is "${question.options.find((o) => o.correct)?.label}". Streak reset.`;
      }

      form.querySelectorAll('input').forEach((input) => { input.disabled = true; });
      form.querySelectorAll('.option-card').forEach((card, i) => {
        if (question.options[i].correct) card.classList.add('is-correct');
        else if (i === chosen) {
          card.classList.add('is-wrong');
          card.querySelector('.option-mark')?.replaceChildren(icon('x', 14));
        }
      });
      feedback.replaceChildren(
        el('p', { class: 'trivia-result', text: message }),
        el('p', { class: 'trivia-fact' }, el('strong', { text: 'Did you know? ' }), question.fact),
      );
      feedback.classList.toggle('is-correct', isCorrect);
      feedback.hidden = false;
      checkButton.hidden = true;
      nextButton.hidden = false;
      nextButton.focus();
      refreshHud();
      announce(`${message} ${question.fact}`);
    };

    return el('form', { class: 'question', onSubmit },
      el('fieldset', {},
        el('legend', {}, ...questionHeading(question.prompt, 'Trivia round: earn bonus XP.')),
        el('div', { class: 'option-grid option-grid-stack' },
          question.options.map((option, i) => optionCard({ name: 'answer', value: i, label: option.label })),
        ),
      ),
      feedback,
      actions(checkButton, nextButton),
    );
  }

  /* ---------- results ---------- */

  function productCard(id, { featured = false, label } = {}) {
    const product = PRODUCTS[id];
    if (!product) return null;
    return el('article', { class: `product-card${featured ? ' is-featured' : ''}` },
      label ? el('p', { class: 'product-slot' }, label) : null,
      el('img', { src: product.img, alt: product.name, width: 400, height: 400, loading: 'lazy', decoding: 'async' }),
      el('div', { class: 'product-body' },
        el('p', { class: 'product-cat', text: product.category }),
        el(featured ? 'h3' : 'h4', { class: 'product-name', text: product.name }),
        featured ? el('p', { class: 'match-pill', text: 'Best match' }) : null,
        el('p', { class: 'product-blurb', text: product.blurb }),
        el('a', { class: 'btn btn-primary btn-block', href: product.url, target: '_blank', rel: 'noopener' },
          'Shop now', el('span', { class: 'sr-only', text: ` ${product.name} (opens in new tab)` })),
      ),
    );
  }

  function answerSummary() {
    const labels = state.quiz.questions
      .map((q, i) => (q.type === 'choice' || q.type === 'duel' ? q.options[state.answers[i]]?.label : null))
      .filter(Boolean);
    if (!labels.length) return null;
    return el('p', { class: 'your-picks' }, el('strong', { text: 'Based on your answers: ' }), labels.join(', '));
  }

  function resultProduct(totals) {
    const [top, ...rest] = rank(totals, candidateIds(state.quiz));
    return {
      shareName: PRODUCTS[top]?.name,
      nodes: [
        el('h2', { id: 'stage-title', tabindex: '-1', 'data-focus': true, text: 'Your top match' }),
        productCard(top, { featured: true }),
        answerSummary(),
        rest.length ? el('h3', { class: 'small-title', text: 'Also great for you' }) : null,
        el('div', { class: 'product-row' }, rest.slice(0, 2).map((id) => productCard(id))),
      ],
    };
  }

  function resultBundle(totals) {
    const used = new Set();
    const picks = state.quiz.result.slots.map((slot) => {
      const id = rank(totals, slot.pool).find((candidate) => !used.has(candidate));
      used.add(id);
      return { slot, id };
    });
    return {
      shareName: 'a custom 3-step ritual',
      nodes: [
        el('h2', { id: 'stage-title', tabindex: '-1', 'data-focus': true, text: 'Your custom ritual' }),
        el('p', { class: 'result-lead', text: 'Three products, built around your week.' }),
        el('div', { class: 'product-row product-row-3' },
          picks.map(({ slot, id }) => productCard(id, { label: [icon(slot.icon, 18), slot.label] }))),
      ],
    };
  }

  function resultArchetype(totals) {
    const { archetypes } = state.quiz.result;
    const [topId] = rank(totals, Object.keys(archetypes));
    const archetype = archetypes[topId];
    return {
      shareName: archetype.name,
      nodes: [
        el('p', { class: 'eyebrow', text: 'Your spirit guide is' }),
        el('div', { class: 'badge' },
          el('span', { class: 'badge-icon' }, icon(archetype.icon, 40)),
          el('h2', { id: 'stage-title', tabindex: '-1', 'data-focus': true, text: archetype.name }),
          el('p', { text: archetype.desc }),
        ),
        el('h3', { class: 'small-title', text: `Picked for ${archetype.name}` }),
        el('div', { class: 'product-row' }, archetype.products.map((id) => productCard(id))),
      ],
    };
  }

  function questSummary() {
    const { quiz, xp, bestStreak, correct } = state;
    const level = levelFor(xp);
    const triviaCount = quiz.questions.filter((q) => q.type === 'trivia').length;
    const unlocked = xp >= quiz.reward.minXp;
    const codeEl = el('code', { class: 'reward-code', text: quiz.reward.code });

    return el('section', { class: 'quest-summary', 'aria-labelledby': 'quest-title' },
      el('h3', { id: 'quest-title', class: 'small-title', text: 'Quest complete' }),
      el('ul', { class: 'stat-list' },
        el('li', {}, el('strong', { text: `${xp}` }), ' XP earned'),
        el('li', {}, el('strong', { text: level.name }), ' level'),
        el('li', {}, el('strong', { text: `${correct}/${triviaCount}` }), ' trivia'),
        el('li', {}, el('strong', { text: `${bestStreak}` }), ' best streak'),
      ),
      unlocked
        ? el('div', { class: 'reward is-unlocked' },
          el('p', { class: 'reward-text' }, icon('gift', 20), `Reward unlocked: ${quiz.reward.label}`),
          el('div', { class: 'reward-row' },
            codeEl,
            el('button', { type: 'button', class: 'btn btn-outline', onClick: (e) => copyText(quiz.reward.code, e.currentTarget, 'Code copied') }, 'Copy code'),
          ))
        : el('div', { class: 'reward' },
          el('p', { class: 'reward-text' }, icon('lock', 20), `Reach ${quiz.reward.minXp} XP to unlock a discount code. You were ${quiz.reward.minXp - xp} XP short. Retake the quest to try again.`)),
    );
  }

  function renderResult() {
    const { quiz } = state;
    const totals = computeScores(quiz, state.answers);
    const builders = { product: resultProduct, bundle: resultBundle, archetype: resultArchetype };
    const { nodes, shareName } = builders[quiz.result.type](totals);
    markCompleted(quiz.id);

    const shareText = `I got ${shareName} on the CBD American Shaman ${quiz.title} quiz.`;
    return el('div', { class: 'screen screen-result' },
      stageHeader({ showProgress: false }),
      quiz.gamified ? questSummary() : null,
      nodes,
      actions(
        el('button', { type: 'button', class: 'btn btn-primary', onClick: (e) => share(shareText, e.currentTarget) }, 'Share result'),
        el('button', { type: 'button', class: 'btn btn-outline', onClick: () => openQuiz(quiz.id) }, 'Retake quiz'),
        el('button', { type: 'button', class: 'btn btn-outline', onClick: closeQuiz }, 'Try another quiz'),
      ),
    );
  }

  /* ---------- share / clipboard ---------- */

  async function copyText(text, button, doneMessage) {
    if (!navigator.clipboard?.writeText) {
      announce('Copy is not supported in this browser.');
      return;
    }
    try {
      await navigator.clipboard.writeText(text);
      const original = button.textContent;
      button.textContent = 'Copied!';
      announce(doneMessage);
      setTimeout(() => { button.textContent = original; }, 2000);
    } catch {
      announce('Could not copy. Please copy manually.');
    }
  }

  async function share(text, button) {
    const url = location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title: document.title, text, url });
        return;
      } catch (error) {
        if (error.name === 'AbortError') return;
      }
    }
    copyText(`${text} ${url}`, button, 'Result link copied to clipboard');
  }

  /* ---------- init ---------- */

  function openFromHash() {
    const id = location.hash.slice(1);
    if (QUIZ_BY_ID.has(id) && state?.quiz.id !== id) openQuiz(id);
  }

  renderPicker();
  renderCompletion();
  document.getElementById('year').textContent = String(new Date().getFullYear());
  window.addEventListener('hashchange', openFromHash);
  openFromHash();
})();
