import React from 'react';

function Icon({ d, size = 18, fill = 'none', stroke = 'currentColor', strokeWidth = 1.6, viewBox = '0 0 24 24', children }: any) {
  return (
    <svg width={size} height={size} viewBox={viewBox} fill={fill} stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      {d ? <path d={d} /> : children}
    </svg>
  );
}

export const I: Record<string, (p?: any) => React.ReactElement> = {
  home:    (p: any = {}) => <Icon {...p}><path d="M3 11l9-7 9 7v9a2 2 0 0 1-2 2h-4v-7h-6v7H5a2 2 0 0 1-2-2z" /></Icon>,
  book:    (p: any = {}) => <Icon {...p}><path d="M4 4h12a3 3 0 0 1 3 3v13a2 2 0 0 0-2-2H4z" /><path d="M4 4v15a2 2 0 0 0 2 2h12" /></Icon>,
  video:   (p: any = {}) => <Icon {...p}><rect x="3" y="6" width="13" height="12" rx="2" /><path d="M16 10l5-3v10l-5-3z" /></Icon>,
  doc:     (p: any = {}) => <Icon {...p}><path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" /><path d="M14 3v6h6" /></Icon>,
  exam:    (p: any = {}) => <Icon {...p}><path d="M9 4h6a1 1 0 0 1 1 1v15a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1z" /><path d="M11 9h2M11 13h2M11 17h2M5 4h3M5 8h2M5 12h2" /></Icon>,
  flask:   (p: any = {}) => <Icon {...p}><path d="M9 3h6M10 3v6L5 19a2 2 0 0 0 2 3h10a2 2 0 0 0 2-3l-5-10V3" /></Icon>,
  cal:     (p: any = {}) => <Icon {...p}><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M16 3v4M8 3v4M3 11h18" /></Icon>,
  phone:   (p: any = {}) => <Icon {...p}><path d="M5 4h3l2 5-2 1a11 11 0 0 0 6 6l1-2 5 2v3a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" /></Icon>,
  user:    (p: any = {}) => <Icon {...p}><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></Icon>,
  search:  (p: any = {}) => <Icon {...p}><circle cx="11" cy="11" r="7" /><path d="M21 21l-4-4" /></Icon>,
  bell:    (p: any = {}) => <Icon {...p}><path d="M6 8a6 6 0 0 1 12 0c0 7 3 8 3 8H3s3-1 3-8" /><path d="M10 21a2 2 0 0 0 4 0" /></Icon>,
  settings:(p: any = {}) => <Icon {...p}><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3h0a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8v0a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z" /></Icon>,
  logout:  (p: any = {}) => <Icon {...p}><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" /></Icon>,
  sun:     (p: any = {}) => <Icon {...p}><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></Icon>,
  moon:    (p: any = {}) => <Icon {...p}><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" /></Icon>,
  play:    (p: any = {}) => <Icon {...p}><path d="M6 4l14 8-14 8z" fill="currentColor" stroke="none" /></Icon>,
  arrowR:  (p: any = {}) => <Icon {...p}><path d="M5 12h14M13 6l6 6-6 6" /></Icon>,
  arrowL:  (p: any = {}) => <Icon {...p}><path d="M19 12H5M11 6l-6 6 6 6" /></Icon>,
  download:(p: any = {}) => <Icon {...p}><path d="M12 3v12M7 10l5 5 5-5M5 21h14" /></Icon>,
  check:   (p: any = {}) => <Icon {...p}><path d="M5 12l5 5L20 7" /></Icon>,
  plus:    (p: any = {}) => <Icon {...p}><path d="M12 5v14M5 12h14" /></Icon>,
  upload:  (p: any = {}) => <Icon {...p}><path d="M12 17V5M7 10l5-5 5 5M5 21h14" /></Icon>,
  filter:  (p: any = {}) => <Icon {...p}><path d="M3 5h18l-7 9v6l-4-2v-4z" /></Icon>,
  clock:   (p: any = {}) => <Icon {...p}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></Icon>,
  more:    (p: any = {}) => <Icon {...p}><circle cx="5" cy="12" r="1.5" fill="currentColor" stroke="none" /><circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" /><circle cx="19" cy="12" r="1.5" fill="currentColor" stroke="none" /></Icon>,
  whatsapp:(p: any = {}) => <Icon {...p}><path d="M3 21l1.6-4.5A8 8 0 1 1 8 19.5z" /></Icon>,
  mail:    (p: any = {}) => <Icon {...p}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 7 9-7" /></Icon>,
  chevR:   (p: any = {}) => <Icon {...p}><path d="M9 6l6 6-6 6" /></Icon>,
  chevL:   (p: any = {}) => <Icon {...p}><path d="M15 6l-6 6 6 6" /></Icon>,
  chevD:   (p: any = {}) => <Icon {...p}><path d="M6 9l6 6 6-6" /></Icon>,
  trend:   (p: any = {}) => <Icon {...p}><path d="M3 17l6-6 4 4 8-8M15 7h6v6" /></Icon>,
  star:    (p: any = {}) => <Icon {...p}><path d="M12 3l2.6 5.7L21 9.5l-4.5 4.4L17.7 21 12 17.8 6.3 21l1.2-7.1L3 9.5l6.4-.8z" /></Icon>,
  edit:    (p: any = {}) => <Icon {...p}><path d="M14 4l6 6L8 22H2v-6z" /></Icon>,
  trash:   (p: any = {}) => <Icon {...p}><path d="M4 7h16M9 7V4h6v3M6 7l1 14h10l1-14" /></Icon>,
  lock:    (p: any = {}) => <Icon {...p}><rect x="4" y="11" width="16" height="10" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" /></Icon>,
  eye:     (p: any = {}) => <Icon {...p}><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z" /><circle cx="12" cy="12" r="3" /></Icon>,
};
