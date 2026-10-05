/*
 * Inline SVG line icons (24×24, stroke-based). Many shapes adapted from Lucide (ISC license).
 * Each entry is a list of [tag, attributes] drawn with currentColor.
 */
'use strict';

const ICONS = {
  leaf: [['path', { d: 'M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z' }], ['path', { d: 'M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12' }]],
  moon: [['path', { d: 'M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z' }]],
  sun: [['circle', { cx: 12, cy: 12, r: 4 }], ['path', { d: 'M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41' }]],
  sunrise: [['path', { d: 'M12 2v8M4.93 10.93l1.41 1.41M2 18h2M20 18h2M19.07 10.93l-1.41 1.41M22 22H2M8 6l4-4 4 4M16 18a4 4 0 0 0-8 0' }]],
  sunset: [['path', { d: 'M12 10V2M4.93 10.93l1.41 1.41M2 18h2M20 18h2M19.07 10.93l-1.41 1.41M22 22H2M16 6l-4 4-4-4M16 18a4 4 0 0 0-8 0' }]],
  dumbbell: [['path', { d: 'M6.5 6.5v11M3.5 9v6M17.5 6.5v11M20.5 9v6M6.5 12h11' }]],
  scale: [['path', { d: 'm16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z' }], ['path', { d: 'm2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z' }], ['path', { d: 'M7 21h10M12 3v18M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2' }]],
  droplet: [['path', { d: 'M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7Z' }]],
  candy: [['path', { d: 'm9.5 7.5-2 2a4.95 4.95 0 1 0 7 7l2-2a4.95 4.95 0 1 0-7-7Z' }], ['path', { d: 'M14 6.5v10M10 7.5v10' }], ['path', { d: 'm16 7 1-5 1.37.68A3 3 0 0 0 19.7 3H21v1.3c0 .46.1.92.32 1.33L22 7l-5 1' }], ['path', { d: 'm8 17-1 5-1.37-.68A3 3 0 0 0 4.3 21H3v-1.3a3 3 0 0 0-.32-1.33L2 17l5-1' }]],
  pill: [['path', { d: 'm10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z' }], ['path', { d: 'm8.5 8.5 7 7' }]],
  cup: [['path', { d: 'M5 8h14l-1.5 13h-11L5 8Z' }], ['path', { d: 'M4 8h16M12 8l2-6h3' }]],
  tea: [['path', { d: 'M17 8h1a4 4 0 1 1 0 8h-1' }], ['path', { d: 'M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z' }], ['path', { d: 'M6 2v2M10 2v2M14 2v2' }]],
  jar: [['rect', { x: 5, y: 9, width: 14, height: 12, rx: 2 }], ['path', { d: 'M7 9V5.5h10V9M5 13.5h14' }]],
  sprout: [['path', { d: 'M7 20h10M10 20c5.5-2.5.8-6.4 3-10' }], ['path', { d: 'M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8Z' }], ['path', { d: 'M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4 1-4.9 2Z' }]],
  tree: [['path', { d: 'M12 22v-7M9 22h6' }], ['path', { d: 'M12 15a5 5 0 0 0 5-5 5 5 0 0 0-2.4-4.3 3 3 0 0 0-5.2 0A5 5 0 0 0 7 10a5 5 0 0 0 5 5Z' }]],
  backpack: [['rect', { x: 4, y: 8, width: 16, height: 13, rx: 3 }], ['path', { d: 'M9 8V6a3 3 0 0 1 6 0v2M8 21v-5h8v5' }]],
  citrus: [['circle', { cx: 12, cy: 12, r: 9 }], ['circle', { cx: 12, cy: 12, r: 6.5 }], ['path', { d: 'M12 5.5v13M5.5 12h13M7.4 7.4l9.2 9.2M16.6 7.4l-9.2 9.2' }]],
  grape: [['circle', { cx: 8, cy: 9, r: 2.2 }], ['circle', { cx: 12.5, cy: 9, r: 2.2 }], ['circle', { cx: 17, cy: 9, r: 2.2 }], ['circle', { cx: 10.2, cy: 13.4, r: 2.2 }], ['circle', { cx: 14.8, cy: 13.4, r: 2.2 }], ['circle', { cx: 12.5, cy: 17.8, r: 2.2 }], ['path', { d: 'M12.5 6.8V3l2.5-1' }]],
  fuel: [['path', { d: 'M3 22h12M4 9h10M14 22V4a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v18' }], ['path', { d: 'M14 13h2a2 2 0 0 1 2 2v2a2 2 0 0 0 4 0V9.83a2 2 0 0 0-.59-1.42L18 5' }]],
  flower: [['circle', { cx: 12, cy: 12, r: 3 }], ['path', { d: 'M12 7.5a4.5 4.5 0 1 1 4.5 4.5M12 7.5A4.5 4.5 0 1 0 7.5 12M12 7.5V9m-4.5 3a4.5 4.5 0 1 0 4.5 4.5M7.5 12H9m7.5 0a4.5 4.5 0 1 1-4.5 4.5m4.5-4.5H15m-3 4.5V15' }]],
  wind: [['path', { d: 'M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2M9.6 4.6A2 2 0 1 1 11 8H2M12.6 19.4A2 2 0 1 0 14 16H2' }]],
  flame: [['path', { d: 'M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.07-2.14-.22-4.05 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.15.43-2.29 1-3a2.5 2.5 0 0 0 2.5 2.5Z' }]],
  feather: [['path', { d: 'M12.67 19a2 2 0 0 0 1.42-.59l6.15-6.17a6 6 0 0 0-8.49-8.49L5.59 9.91A2 2 0 0 0 5 11.33V18a1 1 0 0 0 1 1Z' }], ['path', { d: 'M16 8 2 22M17.5 15H9' }]],
  sliders: [['path', { d: 'M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M2 14h4M10 8h4M18 16h4' }]],
  compass: [['circle', { cx: 12, cy: 12, r: 10 }], ['path', { d: 'm16.24 7.76-1.8 5.41a2 2 0 0 1-1.27 1.27L7.76 16.24l1.8-5.41a2 2 0 0 1 1.27-1.27Z' }]],
  trophy: [['path', { d: 'M6 9H4.5a2.5 2.5 0 0 1 0-5H6M18 9h1.5a2.5 2.5 0 0 0 0-5H18M4 22h16' }], ['path', { d: 'M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22' }], ['path', { d: 'M18 2H6v7a6 6 0 0 0 12 0V2Z' }]],
  mountain: [['path', { d: 'm8 3 4 8 5-5 5 15H2L8 3Z' }]],
  calendar: [['rect', { x: 3, y: 4, width: 18, height: 18, rx: 2 }], ['path', { d: 'M16 2v4M8 2v4M3 10h18' }]],
  sofa: [['path', { d: 'M20 9V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v3' }], ['path', { d: 'M2 16a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-5a2 2 0 0 0-4 0v1.5a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5V11a2 2 0 0 0-4 0Z' }], ['path', { d: 'M4 18v2M20 18v2' }]],
  book: [['path', { d: 'M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2ZM22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7Z' }]],
  glasses: [['circle', { cx: 6, cy: 15, r: 4 }], ['circle', { cx: 18, cy: 15, r: 4 }], ['path', { d: 'M14 15a2 2 0 0 0-4 0M2.5 13 5 7c.7-1.3 1.4-2 3-2M21.5 13 19 7c-.7-1.3-1.5-2-3-2' }]],
  zap: [['path', { d: 'M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14Z' }]],
  heart: [['path', { d: 'M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z' }]],
  target: [['circle', { cx: 12, cy: 12, r: 10 }], ['circle', { cx: 12, cy: 12, r: 6 }], ['circle', { cx: 12, cy: 12, r: 2 }]],
  activity: [['path', { d: 'M22 12h-4l-3 9L9 3l-3 9H2' }]],
  timer: [['path', { d: 'M10 2h4M12 14l3-3' }], ['circle', { cx: 12, cy: 14, r: 8 }]],
  bath: [['path', { d: 'M3 12h18v3a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5v-3Z' }], ['path', { d: 'M6 12V5a2 2 0 0 1 3.5-1.3M7 20l-1 2M17 20l1 2' }]],
  flask: [['path', { d: 'M10 2v7.5L4.5 19A2 2 0 0 0 6.2 22h11.6a2 2 0 0 0 1.7-3L14 9.5V2M8.5 2h7M7 16h10' }]],
  bed: [['path', { d: 'M2 4v16M2 8h18a2 2 0 0 1 2 2v10M2 17h20M6 8v9' }]],
  map: [['path', { d: 'M14.1 5.9 9.9 3.8a2 2 0 0 0-1.8 0L3.6 6a1 1 0 0 0-.6.9V20a1 1 0 0 0 1.4.9l3.7-1.8a2 2 0 0 1 1.8 0l4.2 2.1a2 2 0 0 0 1.8 0l4.5-2.2a1 1 0 0 0 .6-.9V4a1 1 0 0 0-1.4-.9l-3.7 1.8a2 2 0 0 1-1.8 0Z' }], ['path', { d: 'M15 5.8v15M9 3.2v15' }]],
  crown: [['path', { d: 'M11.56 3.27a.5.5 0 0 1 .88 0l2.95 5.6a1 1 0 0 0 1.52.29l4.27-3.66a.5.5 0 0 1 .8.52l-2.83 10.25a1 1 0 0 1-.96.73H5.81a1 1 0 0 1-.96-.73L2.02 6.02a.5.5 0 0 1 .8-.52l4.27 3.66a1 1 0 0 0 1.52-.29Z' }], ['path', { d: 'M5 21h14' }]],
  list: [['path', { d: 'M9 6h11M9 12h11M9 18h11M4 6h.01M4 12h.01M4 18h.01' }]],
  clock: [['circle', { cx: 12, cy: 12, r: 10 }], ['path', { d: 'M12 6v6l4 2' }]],
  check: [['path', { d: 'M20 6 9 17l-5-5' }]],
  x: [['path', { d: 'M18 6 6 18M6 6l12 12' }]],
  'arrow-left': [['path', { d: 'M19 12H5M12 19l-7-7 7-7' }]],
  'arrow-right': [['path', { d: 'M5 12h14M12 5l7 7-7 7' }]],
  share: [['circle', { cx: 18, cy: 5, r: 3 }], ['circle', { cx: 6, cy: 12, r: 3 }], ['circle', { cx: 18, cy: 19, r: 3 }], ['path', { d: 'm8.59 13.51 6.83 3.98M15.41 6.51l-6.82 3.98' }]],
  rotate: [['path', { d: 'M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8' }], ['path', { d: 'M3 3v5h5' }]],
  gift: [['rect', { x: 3, y: 8, width: 18, height: 4, rx: 1 }], ['path', { d: 'M12 8v13M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7M7.5 8a2.5 2.5 0 0 1 0-5C11 3 12 8 12 8s1-5 4.5-5a2.5 2.5 0 0 1 0 5' }]],
  lock: [['rect', { x: 3, y: 11, width: 18, height: 11, rx: 2 }], ['path', { d: 'M7 11V7a5 5 0 0 1 10 0v4' }]],
  image: [['rect', { x: 3, y: 3, width: 18, height: 18, rx: 2 }], ['circle', { cx: 9, cy: 9, r: 2 }], ['path', { d: 'm21 15-3.09-3.09a2 2 0 0 0-2.82 0L6 21' }]],
  award: [['circle', { cx: 12, cy: 8, r: 6 }], ['path', { d: 'M15.48 12.89 17 22l-5-3-5 3 1.52-9.11' }]],
};

const SVG_NS = 'http://www.w3.org/2000/svg';

/* Builds a decorative SVG icon. Returns null for unknown names so callers can skip it. */
function createIcon(name, { size = 24, className = 'icon' } = {}) {
  const shapes = ICONS[name];
  if (!shapes) return null;
  const svg = document.createElementNS(SVG_NS, 'svg');
  Object.entries({
    class: className,
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    'stroke-width': 1.6,
    'stroke-linecap': 'round',
    'stroke-linejoin': 'round',
    'aria-hidden': 'true',
    focusable: 'false',
  }).forEach(([key, value]) => svg.setAttribute(key, String(value)));
  shapes.forEach(([tag, attrs]) => {
    const node = document.createElementNS(SVG_NS, tag);
    Object.entries(attrs).forEach(([key, value]) => node.setAttribute(key, String(value)));
    svg.append(node);
  });
  return svg;
}
