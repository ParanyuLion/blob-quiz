# Blob Quiz — คุณคือเจ้าก้อนสายพันธุ์ไหน?

ตอบ 10 คำถามแล้วค้นพบว่าเจ้าก้อนในตัวคุณคือสายพันธุ์อะไร ✨  
มี 6 สายพันธุ์ตั้งแต่ Common ถึง Mythic · โชคดีแค่ 1% เท่านั้นที่จะได้ Mythic

---

## Blob Species

| Rarity         | Emoji | Name                 | Thai                 |
| -------------- | ----- | -------------------- | -------------------- |
| ★ Common       | ☕    | The Burnout Blob     | ก้อนหมดไฟ สายเหนื่อย |
| ★ Common       | 🍖    | The Buffet Blob      | ก้อนตะกละ สายกิน     |
| ★★ Rare        | 🛍️    | The Sale Hunter      | นักช้อปละลายทรัพย์   |
| ★★★ Super Rare | ⚡    | The Deadline Warrior | อัจฉริยะข้ามคืน      |
| ★★★★ Legendary | 👑    | The Final Boss Blob  | ก้อนสงบนิ่ง ไม่สนโลก |
| ★★★★★ Mythic   | 🌈    | The Lucky Blob       | ก้อนทองคำ ดวงดีแบบงง |

---

## How It Works

1. **Landing** — hero blob, rarity pills, CTA button
2. **Story phase** — illustrated scene per question, word-by-word text reveal, 3s auto-advance or tap to skip
3. **Question phase** — 4 options, staggered slide-in animation
4. **Loading screen** — 5s interstitial with rotating Thai messages
5. **Result page** — statically generated at `/result/[id]`, fully shareable URL

Results are calculated from a weighted score across 6 personality axes with a 1% wildcard chance for Mythic on any result.

---

## Stack

|                 |                                     |
| --------------- | ----------------------------------- |
| Framework       | Next.js 14 (App Router)             |
| Styling         | Tailwind CSS 3                      |
| Animation       | Framer Motion 11                    |
| Language        | TypeScript                          |
| Package manager | pnpm                                |
| Fonts           | Fredoka One · Nunito (Google Fonts) |

---

## Getting Started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Project Structure

```
src/
├── app/
│   ├── page.tsx                 # Landing + quiz state machine
│   └── result/[id]/
│       ├── page.tsx             # Server component (SEO metadata)
│       └── ResultPageClient.tsx # Client result display
├── components/
│   ├── BlobFace.tsx
│   ├── QuestionCard.tsx         # Story → question phase
│   ├── ProgressBar.tsx
│   ├── LoadingScreen.tsx
│   ├── ResultCard.tsx
│   └── AdBanner.tsx
├── constants/
│   ├── quizData.ts              # 10 Thai questions
│   └── blobResults.ts           # 6 blob result definitions
├── logic/
│   └── rarityCalculator.ts      # Score → rarity with wildcard
└── types/index.ts
```
