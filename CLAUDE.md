# Blob Quiz — CLAUDE.md

Project context for AI-assisted development. Read this before making any changes.

---

## What this is

"คุณคือเจ้าก้อน (Blob) สายพันธุ์ไหน?" — a Thai-language personality quiz web app.
Users answer 10 sarcastic/cute questions and discover which Blob species they are (Common → Mythic rarity).
Results are shareable via `/result/[id]` URL.

---

## Stack

| Layer | Tech |
|-------|------|
| Framework | Next.js **14.2.5** (App Router) — NOT 15, config must be `.mjs` |
| Styling | Tailwind CSS 3.4.4 + custom config |
| Animation | Framer Motion 11 |
| Fonts | Fredoka One (display) + Nunito (body) via Google Fonts |
| Package manager | **pnpm** |
| Language | TypeScript |

---

## Folder structure

```
blob-quiz/
├── src/
│   ├── types/index.ts              — PersonalityType, Rarity, ScoreMap, Question, BlobResult
│   ├── constants/
│   │   ├── quizData.ts             — 10 Thai questions with introStory + 4 options each
│   │   └── blobResults.ts          — BLOB_RESULTS: Record<id, BlobResult> for 6 blob types
│   ├── logic/
│   │   └── rarityCalculator.ts     — calculateResult(), initScores(), addScores()
│   ├── components/
│   │   ├── QuestionCard.tsx        — story phase → question phase (AnimatePresence)
│   │   ├── ProgressBar.tsx         — current/total with gradient fill
│   │   ├── LoadingScreen.tsx       — 5s interstitial (ad placeholder) + rotating messages
│   │   ├── ResultCard.tsx          — rarity badge, blob emoji, traits, share/retry
│   │   └── AdBanner.tsx            — AdSense placeholder (empty, comment only)
│   └── app/
│       ├── globals.css             — mesh-bg gradient, keyframes
│       ├── layout.tsx              — Thai metadata, mesh-bg body
│       ├── page.tsx                — Client: landing → quiz → loading phases
│       └── result/[id]/
│           ├── page.tsx            — Server: generateMetadata, generateStaticParams
│           └── ResultPageClient.tsx — Client: ResultCard + AdBanner + retry
├── next.config.mjs                 — MUST be .mjs (Next 14 doesn't support .ts config)
├── tailwind.config.ts
├── postcss.config.mjs
└── CLAUDE.md                       — this file
```

---

## Personality types & blobs

| ID | Name | Rarity | Description |
|----|------|--------|-------------|
| `burnout` | เจ้าก้อนหมดไฟ | Common | เหนื่อยทุกวัน แต่ก็ยังสู้ |
| `buffet` | เจ้าก้อนบุฟเฟ่ต์ | Common | มีชีวิตอยู่เพื่อกิน |
| `sale` | เจ้าก้อนเซลล์ | Rare | SALE = เหตุผลในการมีชีวิต |
| `deadline` | เจ้าก้อน Deadline | Super Rare | ทำงานได้ดีที่สุดตอนใกล้ตาย |
| `finalboss` | เจ้าก้อน Final Boss | Legendary | ใจเย็น ไม่แคร์ ชนะทุกอย่าง |
| `lucky` | เจ้าก้อนโชคดี | Mythic | โชคดีโดยไม่มีเหตุผล |

---

## Rarity system (rarityCalculator.ts)

- **1% wildcard**: any dominant type has 1% chance to get Mythic (lucky blob)
- Score normalized by max possible per type: `{ burnout:21, buffet:21, sale:18, deadline:21, finalboss:21, lucky:18 }`
- Cascade by dominant type:
  - `lucky` dominant → 30% Mythic, 35% Legendary, 35% Super Rare
  - `finalboss` → 20% Legendary, 35% Super Rare, 25% Rare, rest Common
  - `deadline` → 55% Super Rare, 25% Rare, rest Common
  - `sale` → 70% Rare, rest Common
  - `burnout` / `buffet` → always Common

---

## Quiz flow

1. **Landing** — hero blob, rarity pills, CTA button
2. **Story phase** — per-question illustrated scene card, word-by-word text reveal, 3s auto-advance or tap to skip
3. **Question phase** — question + 4 option buttons, staggered in from right
4. **Loading screen** — 5s interstitial with rotating Thai messages (ad slot here)
5. **Result page** — `/result/[id]`, static generated, shareable URL

---

## Key design decisions

- `page.tsx` (home) is `'use client'` — manages phase state
- `result/[id]/page.tsx` is a **server component** for SEO metadata; renders `ResultPageClient.tsx` for interactivity
- `sessionStorage` holds scores only during the session (not used for result display — result is derived from URL id)
- QuestionCard has internal `phase: 'story' | 'question'` state; resets on each new `question.id`
- Config is `next.config.mjs` not `.ts` — Next.js 14 throws on `.ts`

---

## Running locally

```bash
cd "e:/Coding/mobile quiz/blob-quiz"
pnpm dev
# → http://localhost:3000
```

---

## Tone & copy style

All Thai copy is **น่ารักแต่ปั่น** (cute but sarcastic). Keep this voice in any new questions or UI text. Avoid overly formal Thai. Emoji usage is intentional and part of the brand.
