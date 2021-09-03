import * as React from 'react';

const Logo = (props) => (
  <svg
    width={192.911}
    height={83.622}
    viewBox="153.544 33.189 192.911 83.622"
    style={{
      background: '0 0',
    }}
    preserveAspectRatio="xMidYMid"
    {...props}
  >
    <defs>
      <linearGradient
        id="prefix__editing-outline-gradient"
        x1={-0.414}
        x2={1.414}
        y1={0.093}
        y2={0.907}
      >
        <stop offset={0} stopColor="#ee4208" />
        <stop offset={1} stopColor="#4139ff" />
      </linearGradient>
      <filter id="prefix__editing-outline" x="-100%" y="-100%" width="300%" height="300%">
        <feMorphology in="SourceGraphic" operator="dilate" radius={1} result="outline" />
        <feComposite operator="out" in="outline" in2="SourceAlpha" />
      </filter>
    </defs>
    <g filter="url(#prefix__editing-outline)">
      <path
        d="M3.88-19.48q-1.36-1.04-1.36-3.26 0-2.22 1.46-3.38 1.46-1.16 3.98-1.16 1.6 0 5.4.56l2.72.4q1.36.16 2.78.16 1.42 0 2.38-.6 1.44 1.28 1.44 3.12t-1.64 3.16q-1.68 1.4-3.84 1.4-1.04 0-2.72-.28-1.96 6.16-1.96 10.44 0 4.28 2.16 6.52-1 1.8-2.48 2.5T8.5.8Q6.28.8 4.9-.42T3.52-4.16q0-2.92 1.6-7.72 1.6-4.76 4-8.4-1.16-.12-2.36-.12-2.48 0-2.88.92zM31-2.2q-1.24 3-5.2 3-2.04 0-3.32-1.4-1.08-1.24-1.08-2.48 0-3.24 1.48-9.56l1.48-7.76 8.12-.8-2.44 12.64q-.68 2.96-.68 4 0 2.28 1.64 2.36zm-5.92-23.76q0-1.56 1.3-2.4 1.3-.84 3.18-.84 1.88 0 3.02.84 1.14.84 1.14 2.4t-1.26 2.36q-1.26.8-3.14.8-1.88 0-3.06-.8-1.18-.8-1.18-2.36zM51.32.8q-4.84 0-4.84-3.76.04-1.04.36-2.8l.72-3.68q1.08-5.2 1.08-6.36 0-2.32-1.36-2.32-2.28 0-3.48 5.96L41.44 0 33.4.8l4.16-21.24 6.56-.76-.64 3.92q1.88-3.92 7.64-3.92 2.8 0 3.98 1.18 1.18 1.18 1.18 3.82 0 2.48-1.28 8.28-.6 2.6-.6 3.58t.54 1.54q.54.56 1.34.64Q55.88-.8 54.5 0t-3.18.8zm20.76-22q1.44 0 2.56.32.04-.16.12-.6l.2-1.24q.16-.8.4-2.12L76-28l7.96-.8-4.44 23.2q-.04.24-.04.64v.64q0 .88.44 1.54t1.16.66q-.8 1.88-3.24 2.68Q77 .8 75.82.8q-1.18 0-2.26-.62-1.08-.62-1.4-1.66-.64 1.04-1.92 1.66Q68.96.8 67.1.8T63.7.32q-1.54-.48-2.5-1.52-1.76-2.04-1.76-6.68 0-6 3.52-9.64 3.52-3.68 9.12-3.68zm-.28 2.4q-1.48 0-2.28 1.6-.8 1.6-1.62 5.56-.82 3.96-.82 7.52 0 2.44 1.44 2.44 1.28 0 2.18-1.28.9-1.28 1.26-3.4l2.16-11.72q-.84-.72-2.32-.72zm28.88 12.04q1 .68 1 2.18t-.76 2.46q-.76.96-2 1.6Q96.36.8 93.6.8q-2.76 0-4.38-.6t-2.7-1.72q-2.12-2.12-2.12-6 0-6.04 3.28-9.72 3.52-3.96 9.64-3.96 3.8 0 5.68 1.6 1.4 1.2 1.4 3.16 0 7.04-12.16 7.04-.16 1.04-.16 1.92 0 1.84.82 2.54t2.34.7q1.52 0 3.14-.7t2.3-1.82zm-8.16-4.36q2.84 0 4.48-1.76 1.64-1.68 1.64-4.36 0-.92-.34-1.42-.34-.5-1.02-.5-.68 0-1.26.26t-1.18 1.14q-1.48 2-2.32 6.64zm25.76-.12q1.44-2.56 1.44-5.16 0-1.72-1.24-1.72-.96 0-1.96 1.64-1.04 1.64-1.36 3.76L113.08 0l-8.28.8 4.08-21.2 6.6-.8-.72 4.04q1.96-4.04 6.36-4.04 2.32 0 3.58 1.2 1.26 1.2 1.26 3.66t-1.62 4.02q-1.62 1.56-4.38 1.56-1.2 0-1.68-.48z"
        fill="url(#prefix__editing-outline-gradient)"
        transform="translate(186.377 90)"
      />
    </g>
    <style />
  </svg>
);

export default Logo;
