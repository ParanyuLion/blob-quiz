'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Question } from '../types';
import ProgressBar from './ProgressBar';
import AdBanner from './AdBanner';
import BlobFace from './BlobFace';

interface QuestionCardProps {
  question: Question;
  questionIndex: number;
  totalQuestions: number;
  onAnswer: (scores: Partial<Record<string, number>>) => void;
}

const STORY_DURATION = 3000;

const SCENE_PALETTES = [
  { from: '#FFB3C6', to: '#FDEEA3', icon: '🌅' },
  { from: '#B5EAD7', to: '#C7F2E8', icon: '🌿' },
  { from: '#C7B8EA', to: '#E8D5F5', icon: '✨' },
  { from: '#FFD166', to: '#FFB3C6', icon: '🌸' },
  { from: '#B5EAD7', to: '#FDEEA3', icon: '🍃' },
];

const wordVariants = {
  hidden: { opacity: 0, y: 8, filter: 'blur(4px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
};

export default function QuestionCard({
  question,
  questionIndex,
  totalQuestions,
  onAnswer,
}: QuestionCardProps) {
  const [phase, setPhase] = useState<'story' | 'question'>('story');
  const [showTap, setShowTap] = useState(false);

  const palette = SCENE_PALETTES[questionIndex % SCENE_PALETTES.length];

  // Reset to story on each new question
  useEffect(() => {
    setPhase('story');
    setShowTap(false);

    const tapTimer = setTimeout(() => setShowTap(true), 1400);
    const autoTimer = setTimeout(() => setPhase('question'), STORY_DURATION);

    return () => {
      clearTimeout(tapTimer);
      clearTimeout(autoTimer);
    };
  }, [question.id]);

  const handleStoryTap = useCallback(() => {
    if (phase === 'story') setPhase('question');
  }, [phase]);

  // Strip leading emoji/asterisk markers from introStory and split to words
  const storyWords = useMemo(() => {
    const clean = question.introStory.replace(/^\S+\s*\*?\s*/, '').replace(/\*$/, '').trim();
    return clean.split(' ');
  }, [question.introStory]);

  // Extract leading emoji from introStory
  const storyEmoji = useMemo(() => {
    const match = question.introStory.match(/^(\S+)/);
    return match ? match[1] : '🫧';
  }, [question.introStory]);

  return (
    <div className="w-full max-w-lg mx-auto flex flex-col gap-4">
      {/* Progress always visible */}
      <ProgressBar current={questionIndex + 1} total={totalQuestions} />

      <AnimatePresence mode="wait">
        {/* ── STORY PHASE ── */}
        {phase === 'story' && (
          <motion.div
            key="story"
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.04, y: -20 }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            onClick={handleStoryTap}
            className="relative w-full rounded-3xl overflow-hidden cursor-pointer select-none"
            style={{
              background: `linear-gradient(145deg, ${palette.from}, ${palette.to})`,
              minHeight: 260,
            }}
          >
            {/* Morphing blob background */}
            <motion.div
              className="absolute inset-0 opacity-20 pointer-events-none"
              animate={{
                borderRadius: [
                  '60% 40% 30% 70% / 60% 30% 70% 40%',
                  '40% 60% 70% 30% / 40% 50% 60% 50%',
                  '60% 40% 30% 70% / 60% 30% 70% 40%',
                ],
              }}
              style={{ background: 'white' }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            />

            <div className="relative z-10 flex flex-col items-center justify-center gap-5 px-6 py-10 text-center">
              {/* Scene emoji */}
              <motion.span
                initial={{ scale: 0, rotate: -20 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 260, damping: 18, delay: 0.1 }}
                className="text-5xl drop-shadow-sm"
              >
                {storyEmoji}
              </motion.span>

              {/* Story text — word by word */}
              <motion.p
                className="font-body text-base text-gray-700 italic leading-relaxed max-w-xs"
                initial="hidden"
                animate="visible"
                transition={{ staggerChildren: 0.055, delayChildren: 0.3 }}
              >
                {storyWords.map((word, i) => (
                  <motion.span
                    key={i}
                    variants={wordVariants}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    className="inline-block mr-1"
                  >
                    {word}
                  </motion.span>
                ))}
              </motion.p>

              {/* Tap to continue hint */}
              <AnimatePresence>
                {showTap && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
                    className="flex items-center gap-1.5 mt-1"
                  >
                    <span className="font-body text-xs text-gray-500">แตะเพื่อดำเนินต่อ</span>
                    <span className="text-xs">👆</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Blob companion */}
            <div className="absolute bottom-4 right-4 w-12 h-12">
              <motion.div
                className="absolute inset-0"
                animate={{
                  borderRadius: [
                    '60% 40% 30% 70% / 60% 30% 70% 40%',
                    '40% 60% 70% 30% / 40% 50% 60% 50%',
                    '60% 40% 30% 70% / 60% 30% 70% 40%',
                  ],
                }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                style={{ background: 'rgba(255,255,255,0.32)' }}
              />
              <BlobFace personality="generic" />
            </div>

            {/* Countdown strip at bottom */}
            <motion.div
              className="absolute bottom-0 left-0 h-1 rounded-b-3xl"
              style={{ background: 'rgba(255,255,255,0.6)' }}
              initial={{ width: '100%' }}
              animate={{ width: '0%' }}
              transition={{ duration: STORY_DURATION / 1000, ease: 'linear' }}
            />
          </motion.div>
        )}

        {/* ── QUESTION PHASE ── */}
        {phase === 'question' && (
          <motion.div
            key="question"
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -60 }}
            transition={{ duration: 0.38, ease: [0.4, 0, 0.2, 1] }}
            className="flex flex-col gap-4"
          >
            {/* Question card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.05 }}
              className="px-5 py-5 bg-white rounded-3xl shadow-lg border border-pink-50"
            >
              <h2 className="font-display text-xl text-gray-700 leading-snug mb-5">
                {question.question}
              </h2>

              <div className="flex flex-col gap-3">
                {question.options.map((option, i) => (
                  <motion.button
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.07 }}
                    whileHover={{ scale: 1.02, x: 4 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => onAnswer(option.scores)}
                    className="group w-full text-left px-5 py-4 rounded-2xl bg-gradient-to-r from-pink-50 to-rose-50 border-2 border-pink-100 hover:border-pink-300 hover:from-pink-100 hover:to-rose-100 transition-all duration-200 cursor-pointer"
                  >
                    <span className="font-body text-sm text-gray-600 group-hover:text-gray-800 leading-relaxed transition-colors">
                      {option.text}
                    </span>
                  </motion.button>
                ))}
              </div>
            </motion.div>

            <AdBanner className="mt-1" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
