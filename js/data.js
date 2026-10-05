/*
 * Product catalog + quiz definitions.
 * Scores map an outcome id (product or archetype) to points awarded when an option is picked.
 * Product URLs point at the live store; swap or extend freely.
 */
'use strict';

const SITE = 'https://cbdamericanshaman.com';
const IMG = 'assets/img/products/';

const PRODUCTS = {
  'hemp-oil-tincture': {
    name: 'Hemp Oil Tincture',
    category: 'CBD Oil',
    url: `${SITE}/hemp-oil-tincture`,
    img: `${IMG}hemp-oil-tincture.jpg`,
    blurb: 'Our signature terpene-rich tincture. A few drops under the tongue fit any routine.',
  },
  'vg-cloud': {
    name: 'VG Cloud Tincture',
    category: 'CBD Oil',
    url: `${SITE}/vg-cloud-terpene-rich-cbd-oil-tincture`,
    img: `${IMG}vg-cloud.jpg`,
    blurb: 'Vegetable-glycerin based tincture with a smooth, slightly sweet taste.',
  },
  'water-soluble': {
    name: 'Water Soluble CBD, Full Spectrum',
    category: 'CBD Oil',
    url: `${SITE}/cbd/water-soluble-full-spectrum-hemp-oil`,
    img: `${IMG}water-soluble.png`,
    blurb: 'Nano-sized particles that mix right into water, coffee or a smoothie.',
  },
  capsules: {
    name: 'Concentrated CBD Hemp Oil Capsules',
    category: 'Capsules',
    url: `${SITE}/concentrated-cbd-hemp-oil-capsules-15mg`,
    img: `${IMG}capsules.jpg`,
    blurb: 'Pre-measured, taste-free and travel friendly. Zero guesswork.',
  },
  'gummies-10mg': {
    name: '10mg CBD Gummies',
    category: 'Edibles',
    url: `${SITE}/cbd/gummies-10mg`,
    img: `${IMG}gummies-10mg.jpg`,
    blurb: 'A tasty, consistent 10mg serving in every gummy.',
  },
  'gummies-sample': {
    name: 'Sample Pack of Gummies',
    category: 'Edibles',
    url: `${SITE}/sample-pack-of-gummies`,
    img: `${IMG}gummies-sample.jpg`,
    blurb: 'Try a little of everything before you commit to a favorite.',
  },
  cookies: {
    name: 'CBD Cookies',
    category: 'Edibles',
    url: `${SITE}/cookies`,
    img: `${IMG}cookies.jpg`,
    blurb: 'A cozy treat to end the day on a sweet note.',
  },
  'topical-serum': {
    name: 'CBD Topical Serum (15ml)',
    category: 'Topicals',
    url: `${SITE}/terpene-rich-topical-serum-15ml`,
    img: `${IMG}topical-serum.jpg`,
    blurb: 'Fast-absorbing serum for targeted application after a long day or hard workout.',
  },
  'body-lotion': {
    name: 'CBD Body Lotion',
    category: 'Skin Care',
    url: `${SITE}/hydrating-body-lotion`,
    img: `${IMG}body-lotion.jpg`,
    blurb: 'Hydrating, everyday lotion infused with terpene-rich hemp oil.',
  },
  'lip-balm': {
    name: 'CBD Lip Balm',
    category: 'Skin Care',
    url: `${SITE}/lip-revitalizer`,
    img: `${IMG}lip-balm.jpg`,
    blurb: 'Pocket-sized lip care for every season.',
  },
  'under-eye-serum': {
    name: 'CBD Under Eye Serum',
    category: 'Skin Care',
    url: `${SITE}/under-eye-serum`,
    img: `${IMG}under-eye-serum.jpg`,
    blurb: 'A lightweight serum made for your self-care ritual.',
  },
  'botanical-terpene-vape': {
    name: 'Botanical Terpene Vape',
    category: 'Vape',
    url: `${SITE}/botanical-terpene-vape`,
    img: `${IMG}botanical-terpene-vape.jpg`,
    blurb: 'Flavor-forward botanical terpenes for an easy-going session.',
  },
  'sour-diesel': {
    name: 'THCP Sour Diesel Flower',
    category: 'Hemp Flower · 21+',
    url: `${SITE}/thcp-sour-diesel-flower`,
    img: `${IMG}sour-diesel.jpg`,
    blurb: 'Bold, gassy aroma. Commonly described as bright and energizing.',
  },
  'lemon-octane': {
    name: 'THCP Lemon Octane Strain',
    category: 'Hemp Flower · 21+',
    url: `${SITE}/thcp-lemon-octane-strain`,
    img: `${IMG}lemon-octane.jpg`,
    blurb: 'Zesty citrus terpenes with an uplifting, social vibe.',
  },
  'critical-berries': {
    name: 'THCP Critical Berries Strain',
    category: 'Hemp Flower · 21+',
    url: `${SITE}/thcp-critical-berries-strain`,
    img: `${IMG}critical-berries.jpg`,
    blurb: 'Sweet berry notes. A mellow pick for slow evenings.',
  },
  'lemon-octane-snow-caps': {
    name: 'THCP Lemon Octane Snow Caps',
    category: 'Hemp Flower · 21+',
    url: `${SITE}/thcp-lemon-octane-snow-caps`,
    img: `${IMG}lemon-octane-snow-caps.jpg`,
    blurb: 'Citrus flower dusted for extra intensity. For experienced users.',
  },
  'critical-berries-snow-caps': {
    name: 'THCP Critical Berries Snow Caps',
    category: 'Hemp Flower · 21+',
    url: `${SITE}/thcp-critical-berries-snow-caps`,
    img: `${IMG}critical-berries-snow-caps.jpg`,
    blurb: 'Berry flower with a frosty coat. Big flavor, big experience.',
  },
  'blue-lotus': {
    name: 'Blue Lotus Flower Preroll',
    category: 'Botanical Preroll',
    url: `${SITE}/blue-lotus-flower-preroll`,
    img: `${IMG}blue-lotus.jpg`,
    blurb: 'A gentle, floral botanical preroll with no cannabinoids.',
  },
};

const QUIZZES = [
  /* 1. Classic stepper — single-choice cards with progress bar */
  {
    id: 'wellness-match',
    title: 'Wellness Match',
    tagline: 'Four questions to find the right everyday CBD product.',
    mechanic: 'Classic quiz',
    icon: 'leaf',
    minutes: 1,
    result: { type: 'product' },
    questions: [
      {
        type: 'choice',
        prompt: 'What brings you to CBD today?',
        options: [
          { label: 'Unwind and relax', icon: 'leaf', scores: { 'hemp-oil-tincture': 3, 'gummies-10mg': 2, 'vg-cloud': 2 } },
          { label: 'Better nights', icon: 'moon', scores: { cookies: 3, 'gummies-10mg': 3, 'hemp-oil-tincture': 1 } },
          { label: 'Post-workout recovery', icon: 'dumbbell', scores: { 'topical-serum': 4, 'water-soluble': 2 } },
          { label: 'Skin and self-care', icon: 'flower', scores: { 'body-lotion': 3, 'under-eye-serum': 3, 'lip-balm': 2 } },
          { label: 'Everyday balance', icon: 'scale', scores: { capsules: 3, 'hemp-oil-tincture': 2, 'water-soluble': 2 } },
        ],
      },
      {
        type: 'choice',
        prompt: 'How do you like to take it?',
        options: [
          { label: 'Drops under the tongue', icon: 'droplet', scores: { 'hemp-oil-tincture': 4, 'vg-cloud': 3 } },
          { label: 'Something tasty', icon: 'candy', scores: { 'gummies-10mg': 4, cookies: 3, 'gummies-sample': 2 } },
          { label: 'A simple capsule', icon: 'pill', scores: { capsules: 5 } },
          { label: 'Mixed into a drink', icon: 'cup', scores: { 'water-soluble': 5 } },
          { label: 'Applied to skin', icon: 'jar', scores: { 'topical-serum': 3, 'body-lotion': 3, 'under-eye-serum': 2 } },
        ],
      },
      {
        type: 'choice',
        prompt: 'How familiar are you with CBD?',
        options: [
          { label: 'Brand new', icon: 'sprout', scores: { 'gummies-sample': 4, 'gummies-10mg': 2, capsules: 1 } },
          { label: 'Tried it a few times', icon: 'leaf', scores: { 'gummies-10mg': 1, 'vg-cloud': 2, 'water-soluble': 1 } },
          { label: 'Part of my routine', icon: 'tree', scores: { 'hemp-oil-tincture': 3, 'water-soluble': 2, 'topical-serum': 1 } },
        ],
      },
      {
        type: 'choice',
        prompt: 'When would you use it most?',
        options: [
          { label: 'Morning kickoff', icon: 'sunrise', scores: { 'water-soluble': 3, capsules: 2 } },
          { label: 'On the go, all day', icon: 'backpack', scores: { capsules: 3, 'gummies-10mg': 2, 'lip-balm': 1 } },
          { label: 'Evening wind-down', icon: 'sunset', scores: { cookies: 3, 'hemp-oil-tincture': 2, 'body-lotion': 1 } },
        ],
      },
    ],
  },

  /* 2. This-or-that duels — fast binary picks for flower */
  {
    id: 'strain-finder',
    title: 'Strain Finder',
    tagline: 'Five quick either-or picks to narrow down your flower.',
    mechanic: 'This or that',
    icon: 'flower',
    minutes: 1,
    ageGate: true,
    result: { type: 'product' },
    questions: [
      {
        type: 'duel',
        prompt: 'Pick a flavor',
        options: [
          { label: 'Citrus zest', icon: 'citrus', scores: { 'lemon-octane': 3, 'lemon-octane-snow-caps': 3 } },
          { label: 'Sweet berries', icon: 'grape', scores: { 'critical-berries': 3, 'critical-berries-snow-caps': 3 } },
        ],
      },
      {
        type: 'duel',
        prompt: 'Pick a vibe',
        options: [
          { label: 'Spark and focus', icon: 'sun', scores: { 'sour-diesel': 3, 'lemon-octane': 2, 'lemon-octane-snow-caps': 1 } },
          { label: 'Melt and mellow', icon: 'moon', scores: { 'critical-berries': 2, 'critical-berries-snow-caps': 1, 'blue-lotus': 2 } },
        ],
      },
      {
        type: 'duel',
        prompt: 'Pick an aroma',
        options: [
          { label: 'Gassy and bold', icon: 'fuel', scores: { 'sour-diesel': 4 } },
          { label: 'Floral and gentle', icon: 'flower', scores: { 'blue-lotus': 3, 'botanical-terpene-vape': 2 } },
        ],
      },
      {
        type: 'duel',
        prompt: 'Pick a style',
        options: [
          { label: 'Classic flower', icon: 'leaf', scores: { 'sour-diesel': 1, 'lemon-octane': 1, 'critical-berries': 1, 'blue-lotus': 1 } },
          { label: 'Quick vape', icon: 'wind', scores: { 'botanical-terpene-vape': 4 } },
        ],
      },
      {
        type: 'duel',
        prompt: 'Pick your intensity',
        options: [
          { label: 'Bring it on', icon: 'flame', scores: { 'lemon-octane-snow-caps': 4, 'critical-berries-snow-caps': 4, 'sour-diesel': 1 } },
          { label: 'Ease me in', icon: 'feather', scores: { 'blue-lotus': 2, 'botanical-terpene-vape': 2, 'lemon-octane': 1, 'critical-berries': 1 } },
        ],
      },
    ],
  },

  /* 3. Slider-based ritual builder — returns a 3-product bundle */
  {
    id: 'ritual-builder',
    title: 'Ritual Builder',
    tagline: 'Rate your week and get a three-step daily routine.',
    mechanic: 'Sliders',
    icon: 'sliders',
    minutes: 1,
    result: {
      type: 'bundle',
      slots: [
        { label: 'Morning', icon: 'sunrise', pool: ['water-soluble', 'capsules', 'hemp-oil-tincture', 'vg-cloud'] },
        { label: 'Evening', icon: 'moon', pool: ['cookies', 'gummies-10mg', 'hemp-oil-tincture', 'vg-cloud'] },
        { label: 'Self-care', icon: 'jar', pool: ['topical-serum', 'body-lotion', 'under-eye-serum', 'lip-balm'] },
      ],
    },
    questions: [
      {
        type: 'sliders',
        prompt: 'Rate your typical week',
        help: 'Drag each slider. 0 = not at all, 10 = absolutely.',
        sliders: [
          { id: 'busy', label: 'How busy are your days?', minLabel: 'Laid-back', maxLabel: 'Non-stop', weights: { capsules: 3, 'water-soluble': 2 } },
          { id: 'nights', label: 'How much do you want better evenings?', minLabel: 'All good', maxLabel: 'Top priority', weights: { cookies: 3, 'gummies-10mg': 2, 'vg-cloud': 1 } },
          { id: 'active', label: 'How active are you?', minLabel: 'Couch mode', maxLabel: 'Training daily', weights: { 'topical-serum': 3, 'water-soluble': 1 } },
          { id: 'skin', label: 'How into skin care are you?', minLabel: 'Minimal', maxLabel: 'Full routine', weights: { 'under-eye-serum': 3, 'body-lotion': 2, 'lip-balm': 1 } },
          { id: 'taste', label: 'How much does taste matter?', minLabel: 'Not at all', maxLabel: 'A lot', weights: { 'vg-cloud': 2, 'gummies-10mg': 2, cookies: 1, 'hemp-oil-tincture': -1 } },
        ],
      },
    ],
  },

  /* 4. Personality quiz — archetype result with shareable badge */
  {
    id: 'spirit-guide',
    title: 'Find Your Spirit Guide',
    tagline: 'A short personality quiz with picks matched to your style.',
    mechanic: 'Personality',
    icon: 'compass',
    minutes: 2,
    result: {
      type: 'archetype',
      archetypes: {
        owl: { name: 'The Owl', icon: 'moon', desc: 'Calm, reflective and at your best after sunset. Your ritual is all about winding down.', products: ['cookies', 'gummies-10mg'] },
        wolf: { name: 'The Wolf', icon: 'mountain', desc: 'Driven and physical. You push hard and recover harder.', products: ['topical-serum', 'water-soluble'] },
        hummingbird: { name: 'The Hummingbird', icon: 'zap', desc: 'Always moving, never stopping. You need something fast and portable.', products: ['capsules', 'gummies-sample'] },
        bear: { name: 'The Bear', icon: 'sofa', desc: 'Comfort first. You love cozy nights and treating yourself well.', products: ['body-lotion', 'under-eye-serum'] },
        eagle: { name: 'The Eagle', icon: 'compass', desc: 'Curious and confident. You know what you like and go all in.', products: ['hemp-oil-tincture', 'vg-cloud'] },
      },
    },
    questions: [
      {
        type: 'choice',
        prompt: 'Your ideal Saturday looks like:',
        options: [
          { label: 'A long hike or a big workout', icon: 'mountain', scores: { wolf: 3, eagle: 1 } },
          { label: 'Errands, plans and friends', icon: 'calendar', scores: { hummingbird: 3 } },
          { label: 'Blankets, movies and snacks', icon: 'sofa', scores: { bear: 3, owl: 1 } },
          { label: 'Exploring somewhere new', icon: 'compass', scores: { eagle: 3 } },
          { label: 'Reading late into the night', icon: 'book', scores: { owl: 3 } },
        ],
      },
      {
        type: 'choice',
        prompt: 'Friends would describe you as:',
        options: [
          { label: 'Wise and chill', icon: 'glasses', scores: { owl: 3 } },
          { label: 'Competitive', icon: 'trophy', scores: { wolf: 3 } },
          { label: 'High energy', icon: 'zap', scores: { hummingbird: 3 } },
          { label: 'Warm and nurturing', icon: 'heart', scores: { bear: 3 } },
          { label: 'Bold and independent', icon: 'target', scores: { eagle: 3 } },
        ],
      },
      {
        type: 'choice',
        prompt: 'Pick a time of day',
        options: [
          { label: 'Sunrise', icon: 'sunrise', scores: { wolf: 2, hummingbird: 1 } },
          { label: 'High noon', icon: 'sun', scores: { eagle: 2, hummingbird: 2 } },
          { label: 'Golden hour', icon: 'sunset', scores: { bear: 2 } },
          { label: 'Midnight', icon: 'moon', scores: { owl: 3 } },
        ],
      },
      {
        type: 'choice',
        prompt: 'Your go-to self-care move?',
        options: [
          { label: 'Stretch and foam roll', icon: 'activity', scores: { wolf: 3 } },
          { label: 'A few quiet minutes', icon: 'timer', scores: { hummingbird: 3 } },
          { label: 'Bath, face mask, the works', icon: 'bath', scores: { bear: 3 } },
          { label: 'Trying something new', icon: 'flask', scores: { eagle: 3 } },
          { label: 'Tea and journaling', icon: 'tea', scores: { owl: 3 } },
        ],
      },
    ],
  },

  /* 5. Gamified quest — XP, streaks, levels, trivia + reward unlock */
  {
    id: 'shaman-quest',
    title: 'Shaman Quest',
    tagline: 'Answer trivia, earn points and unlock a discount code.',
    mechanic: 'Gamified',
    icon: 'trophy',
    minutes: 2,
    gamified: true,
    reward: { code: 'QUEST10', label: '10% off your next order (placeholder code)', minXp: 100 },
    result: { type: 'product' },
    questions: [
      {
        type: 'trivia',
        prompt: 'CBD is short for:',
        options: [{ label: 'Cannabinol' }, { label: 'Cannabidiol', correct: true }, { label: 'Carbidiol' }],
        fact: 'CBD = cannabidiol. Cannabinol is a different compound, known as CBN.',
      },
      {
        type: 'choice',
        prompt: 'Choose your quest goal',
        options: [
          { label: 'Find calm', icon: 'leaf', scores: { 'hemp-oil-tincture': 3, 'vg-cloud': 2 } },
          { label: 'Rest and recharge', icon: 'bed', scores: { 'gummies-10mg': 3, cookies: 2 } },
          { label: 'Recover faster', icon: 'dumbbell', scores: { 'topical-serum': 4 } },
          { label: 'Glow up', icon: 'flower', scores: { 'under-eye-serum': 3, 'body-lotion': 2 } },
        ],
      },
      {
        type: 'trivia',
        prompt: 'Terpenes are:',
        options: [
          { label: 'Aromatic compounds that give plants their scent', correct: true },
          { label: 'A type of vitamin' },
          { label: 'A synthetic flavoring' },
        ],
        fact: 'Terpenes are natural aromatic compounds found in hemp, citrus, pine and many other plants.',
      },
      {
        type: 'choice',
        prompt: 'Pick your gear',
        options: [
          { label: 'Dropper bottle', icon: 'droplet', scores: { 'hemp-oil-tincture': 3, 'vg-cloud': 2 } },
          { label: 'Gummy pouch', icon: 'candy', scores: { 'gummies-10mg': 3, 'gummies-sample': 2 } },
          { label: 'Capsule case', icon: 'pill', scores: { capsules: 4 } },
          { label: 'Shaker bottle', icon: 'cup', scores: { 'water-soluble': 4 } },
          { label: 'Balm kit', icon: 'jar', scores: { 'topical-serum': 2, 'body-lotion': 2, 'lip-balm': 1 } },
        ],
      },
      {
        type: 'trivia',
        prompt: 'Water-soluble CBD is made by:',
        options: [
          { label: 'Adding sugar' },
          { label: 'Breaking oil into tiny particles that disperse in water', correct: true },
          { label: 'Freezing the oil' },
        ],
        fact: 'Breaking CBD oil into nano-sized particles lets it mix evenly into water-based drinks.',
      },
      {
        type: 'choice',
        prompt: 'What is your experience level?',
        options: [
          { label: 'Rookie', icon: 'sprout', scores: { 'gummies-sample': 4 } },
          { label: 'Adventurer', icon: 'map', scores: { 'gummies-10mg': 1, 'water-soluble': 2 } },
          { label: 'Legend', icon: 'crown', scores: { 'hemp-oil-tincture': 3 } },
        ],
      },
    ],
  },
];
