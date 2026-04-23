'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { questions } from '../constants/quizData';
import { calculateResult, initScores, addScores } from '../logic/rarityCalculator';
import { ScoreMap } from '../types';
import QuestionCard from '../components/QuestionCard';
import LoadingScreen from '../components/LoadingScreen';
import BlobFace from '../components/BlobFace';

type Phase = 'landing' | 'quiz' | 'loading';

const DECORATIVE_BLOBS = [
  { size: 'w-40 h-40', top: '-5%', left: '-8%', from: '#FFB3C6', to: '#FF85A2', delay: 0 },
  { size: 'w-28 h-28', top: '8%', right: '-4%', from: '#FDEEA3', to: '#FFD166', delay: 1 },
  { size: 'w-24 h-24', bottom: '15%', left: '-3%', from: '#B5EAD7', to: '#6EDFC0', delay: 2 },
  { size: 'w-32 h-32', bottom: '-4%', right: '-6%', from: '#C7B8EA', to: '#A78BCC', delay: 0.5 },
];

export default function HomePage() {
  const router = useRouter();
  const [phase, setPhase] = useState<Phase>('landing');
  const [currentQ, setCurrentQ] = useState(0);
  const [scores, setScores] = useState<ScoreMap>(initScores());

  const handleAnswer = useCallback(
    (partial: Partial<ScoreMap>) => {
      const next = addScores(scores, partial);
      setScores(next);

      if (currentQ + 1 >= questions.length) {
        setPhase('loading');
      } else {
        setCurrentQ((q) => q + 1);
      }
    },
    [scores, currentQ],
  );

  const handleLoadingComplete = useCallback(() => {
    const result = calculateResult(scores);
    sessionStorage.setItem('blobScores', JSON.stringify(scores));
    router.push(`/result/${result.id}`);
  }, [scores, router]);

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center px-4 py-10 overflow-hidden">
      {/* Decorative background blobs */}
      {DECORATIVE_BLOBS.map((b, i) => (
        <motion.div
          key={i}
          className={`absolute ${b.size} pointer-events-none`}
          style={{
            top: b.top,
            left: b.left,
            right: b.right,
            bottom: b.bottom,
            background: `linear-gradient(135deg, ${b.from}, ${b.to})`,
            opacity: 0.35,
            filter: 'blur(2px)',
          }}
          animate={{
            borderRadius: [
              '60% 40% 30% 70% / 60% 30% 70% 40%',
              '40% 60% 70% 30% / 40% 50% 60% 50%',
              '60% 40% 30% 70% / 60% 30% 70% 40%',
            ],
            y: [0, -10, 0],
          }}
          transition={{ duration: 5 + b.delay, repeat: Infinity, ease: 'easeInOut', delay: b.delay }}
        />
      ))}

      <AnimatePresence mode="wait">
        {/* ── LANDING ── */}
        {phase === 'landing' && (
          <motion.div
            key="landing"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center gap-6 text-center max-w-sm w-full z-10"
          >
            {/* Hero blob */}
            <motion.div
              animate={{
                borderRadius: [
                  '60% 40% 30% 70% / 60% 30% 70% 40%',
                  '40% 60% 70% 30% / 40% 50% 60% 50%',
                  '30% 60% 40% 70% / 50% 60% 30% 60%',
                  '60% 40% 30% 70% / 60% 30% 70% 40%',
                ],
                y: [0, -14, 0],
              }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              className="relative w-36 h-36 shadow-2xl"
              style={{ background: 'linear-gradient(135deg, #FFB3C6 0%, #C7B8EA 100%)' }}
            >
              <BlobFace personality="generic" />
              <span className="absolute bottom-2 left-1/2 -translate-x-1/2 text-4xl select-none z-10">🫧</span>
            </motion.div>

            {/* Title */}
            <div>
              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="font-display text-3xl text-gray-700 leading-tight"
              >
                คุณคือเจ้าก้อน
                <br />
                <span
                  style={{
                    background: 'linear-gradient(90deg, #FF85A2, #A78BCC)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  Blob สายพันธุ์ไหน?
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.35 }}
                className="font-body text-sm text-gray-400 mt-3 leading-relaxed"
              >
                ตอบ 10 คำถามแล้วค้นพบว่า
                <br />
                เจ้าก้อนในตัวคุณคือสายพันธุ์อะไร ✨
              </motion.p>
            </div>

            {/* Rarity pills */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
              className="flex flex-wrap gap-2 justify-center"
            >
              {[
                { label: 'Common', stars: 1, color: '#9CA3AF' },
                { label: 'Rare', stars: 2, color: '#3B82F6' },
                { label: 'Super Rare', stars: 3, color: '#A855F7' },
                { label: 'Legendary', stars: 4, color: '#F59E0B' },
                { label: 'Mythic', stars: 5, color: '#FF6B9D' },
              ].map(({ label, stars, color }) => (
                <span
                  key={label}
                  className="px-3 py-1 rounded-full text-xs font-body font-bold text-white shadow-sm"
                  style={{ backgroundColor: color }}
                >
                  {'★'.repeat(stars)} {label}
                </span>
              ))}
            </motion.div>

            {/* CTA */}
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.55, type: 'spring', stiffness: 200 }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setPhase('quiz')}
              className="w-full max-w-xs py-5 rounded-2xl font-display text-xl text-white shadow-xl"
              style={{ background: 'linear-gradient(135deg, #FF85A2 0%, #C7B8EA 100%)' }}
            >
              เริ่มทดสอบเลย! 🫧
            </motion.button>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="font-body text-xs text-gray-300"
            >
              มี 6 สายพันธุ์ · Mythic หายาก 1% · แชร์ได้
            </motion.p>
          </motion.div>
        )}

        {/* ── QUIZ ── */}
        {phase === 'quiz' && (
          <motion.div
            key="quiz"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full max-w-lg z-10 px-1"
          >
            <QuestionCard
              question={questions[currentQ]}
              questionIndex={currentQ}
              totalQuestions={questions.length}
              onAnswer={handleAnswer}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── LOADING ── */}
      <AnimatePresence>
        {phase === 'loading' && <LoadingScreen onComplete={handleLoadingComplete} />}
      </AnimatePresence>
    </main>
  );
}
