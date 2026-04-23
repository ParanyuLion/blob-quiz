'use client';

import { PersonalityType } from '../types';

export type FacePersonality = PersonalityType | 'generic';

const BLINK_CSS = `
  @keyframes blob-blink {
    0%, 90%, 100% { transform: scaleY(1); }
    95%            { transform: scaleY(0.06); }
  }
  .bb {
    transform-box: fill-box;
    transform-origin: center;
    animation: blob-blink 4s ease-in-out infinite;
  }
`;

function Eye({ cx, cy, r = 6, pr = 3.5 }: { cx: number; cy: number; r?: number; pr?: number }) {
  return (
    <>
      <circle cx={cx} cy={cy} r={r} fill="white" opacity={0.92} />
      <circle cx={cx} cy={cy + 0.6} r={pr} fill="#2d1f1f" />
      <circle cx={cx - 1.4} cy={cy - 1.6} r={1.1} fill="white" />
    </>
  );
}

function star4(cx: number, cy: number, r = 8): string {
  const h = r * 0.28;
  return `M${cx},${cy - r} L${cx + h},${cy - h} L${cx + r},${cy} L${cx + h},${cy + h} L${cx},${cy + r} L${cx - h},${cy + h} L${cx - r},${cy} L${cx - h},${cy - h} Z`;
}

// ── faces ────────────────────────────────────────────────────────────────────

function GenericFace() {
  return (
    <>
      <g className="bb">
        <Eye cx={36} cy={32} />
        <Eye cx={64} cy={32} />
      </g>
      <path d="M43,49 Q50,56 57,49" stroke="#2d1f1f" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    </>
  );
}

function BurnoutFace() {
  return (
    <>
      <defs>
        <clipPath id="bbl"><rect x="27" y="33" width="18" height="11" /></clipPath>
        <clipPath id="bbr"><rect x="55" y="33" width="18" height="11" /></clipPath>
      </defs>
      {/* Half-closed sleepy eyes */}
      <circle cx="36" cy="31" r="8" fill="white" opacity="0.9" clipPath="url(#bbl)" />
      <circle cx="36" cy="35" r="5" fill="#2d1f1f" clipPath="url(#bbl)" />
      <path d="M28,32 Q36,28 44,32" stroke="#666" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <circle cx="64" cy="31" r="8" fill="white" opacity="0.9" clipPath="url(#bbr)" />
      <circle cx="64" cy="35" r="5" fill="#2d1f1f" clipPath="url(#bbr)" />
      <path d="M56,32 Q64,28 72,32" stroke="#666" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      {/* Flat tired mouth */}
      <path d="M42,51 L58,51" stroke="#777" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      {/* Sweat drop */}
      <ellipse cx="72" cy="25" rx="2" ry="3" fill="white" opacity="0.5" />
    </>
  );
}

function BuffetFace() {
  return (
    <>
      <g className="bb">
        <Eye cx={36} cy={31} r={7.5} pr={5} />
        <Eye cx={64} cy={31} r={7.5} pr={5} />
      </g>
      {/* Big U smile */}
      <path d="M33,50 Q50,68 67,50" stroke="#2d1f1f" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    </>
  );
}

function SaleFace() {
  return (
    <>
      <g className="bb">
        <path d={star4(36, 32)} fill="#FFD700" />
        <path d={star4(64, 32)} fill="#FFD700" />
      </g>
      {/* Surprised O mouth */}
      <ellipse cx="50" cy="54" rx="6" ry="5.5" fill="#2d1f1f" />
      <ellipse cx="50" cy="54" rx="4" ry="3.5" fill="#FF6B6B" />
    </>
  );
}

function DeadlineFace() {
  return (
    <>
      <g className="bb">
        <circle cx="36" cy="31" r="9" fill="white" opacity="0.9" />
        <circle cx="36" cy="31" r="6" fill="#111" />
        <circle cx="33.5" cy="28" r="2" fill="white" />
        <circle cx="64" cy="31" r="9" fill="white" opacity="0.9" />
        <circle cx="64" cy="31" r="6" fill="#111" />
        <circle cx="61.5" cy="28" r="2" fill="white" />
      </g>
      {/* Gritted teeth */}
      <path d="M38,53 L62,53" stroke="#2d1f1f" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      {[43, 48, 52, 57].map((x) => (
        <line key={x} x1={x} y1={51} x2={x} y2={53} stroke="#2d1f1f" strokeWidth="1.5" strokeLinecap="round" />
      ))}
    </>
  );
}

function FinalBossFace() {
  return (
    <>
      {/* Sharp angled heavy lids */}
      <circle cx="36" cy="34" r="6.5" fill="white" opacity="0.88" />
      <circle cx="36" cy="34" r="4" fill="#1a1a1a" />
      <circle cx="34.5" cy="31.5" r="1.2" fill="white" />
      <path d="M28,30 L44,33" stroke="#1a1a1a" strokeWidth="3" strokeLinecap="round" />

      <circle cx="64" cy="34" r="6.5" fill="white" opacity="0.88" />
      <circle cx="64" cy="34" r="4" fill="#1a1a1a" />
      <circle cx="62.5" cy="31.5" r="1.2" fill="white" />
      <path d="M56,33 L72,30" stroke="#1a1a1a" strokeWidth="3" strokeLinecap="round" />

      {/* Asymmetric smirk */}
      <path d="M43,53 Q54,61 62,53" stroke="#1a1a1a" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    </>
  );
}

function LuckyFace() {
  return (
    <>
      {/* Rosy cheeks */}
      <ellipse cx="21" cy="48" rx="8" ry="5" fill="#FFB3C6" opacity="0.6" />
      <ellipse cx="79" cy="48" rx="8" ry="5" fill="#FFB3C6" opacity="0.6" />
      {/* Sparkle star eyes */}
      <g className="bb">
        <path d={star4(36, 32, 10)} fill="#FFD700" opacity="0.9" />
        <circle cx="36" cy="32" r="3" fill="white" opacity="0.75" />
        <path d={star4(64, 32, 10)} fill="#FFD700" opacity="0.9" />
        <circle cx="64" cy="32" r="3" fill="white" opacity="0.75" />
      </g>
      {/* Huge grin */}
      <path d="M30,54 Q50,74 70,54" stroke="#2d1f1f" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      {/* Small sparkle dots */}
      <circle cx="18" cy="22" r="2.5" fill="white" opacity="0.65" />
      <circle cx="83" cy="19" r="2" fill="white" opacity="0.55" />
    </>
  );
}

// ── export ────────────────────────────────────────────────────────────────────

export default function BlobFace({ personality }: { personality: FacePersonality }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 2 }}
      aria-hidden="true"
    >
      <style>{BLINK_CSS}</style>
      {personality === 'burnout'   && <BurnoutFace />}
      {personality === 'buffet'    && <BuffetFace />}
      {personality === 'sale'      && <SaleFace />}
      {personality === 'deadline'  && <DeadlineFace />}
      {personality === 'finalboss' && <FinalBossFace />}
      {personality === 'lucky'     && <LuckyFace />}
      {(personality === 'generic') && <GenericFace />}
    </svg>
  );
}
