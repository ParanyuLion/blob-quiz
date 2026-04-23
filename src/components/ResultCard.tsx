'use client';

import { motion } from 'framer-motion';
import { BlobResult } from '../types';
import BlobFace from './BlobFace';

interface ResultCardProps {
  result: BlobResult;
  onRetry: () => void;
}

const RARITY_GLOW: Record<string, string> = {
  Common: '0 0 30px rgba(156,163,175,0.4)',
  Rare: '0 0 40px rgba(59,130,246,0.5)',
  'Super Rare': '0 0 50px rgba(168,85,247,0.6)',
  Legendary: '0 0 60px rgba(245,158,11,0.7)',
  Mythic: '0 0 80px rgba(255,107,157,0.8), 0 0 120px rgba(124,58,237,0.4)',
};

const RARITY_BADGE_BG: Record<string, string> = {
  Common: 'bg-gray-100 text-gray-500 border-gray-300',
  Rare: 'bg-blue-100 text-blue-600 border-blue-300',
  'Super Rare': 'bg-purple-100 text-purple-600 border-purple-300',
  Legendary: 'bg-amber-100 text-amber-600 border-amber-300',
  Mythic: 'bg-gradient-to-r from-pink-500 to-purple-600 text-white border-transparent',
};

const RARITY_STARS: Record<string, number> = {
  Common: 1,
  Rare: 2,
  'Super Rare': 3,
  Legendary: 4,
  Mythic: 5,
};

export default function ResultCard({ result, onRetry }: ResultCardProps) {
  const isLegendaryPlus = result.rarity === 'Legendary' || result.rarity === 'Mythic';
  const isMythic = result.rarity === 'Mythic';

  const handleShare = () => {
    const url = typeof window !== 'undefined' ? window.location.href : '';
    const text = `${result.shareText}\n${url}`;
    if (navigator.share) {
      navigator.share({ text });
    } else {
      navigator.clipboard.writeText(text).then(() => alert('คัดลอกข้อความแล้ว! ไปแชร์ได้เลย 🎉'));
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
      className="w-full max-w-md mx-auto"
    >
      {/* Mythic rainbow shimmer container */}
      {isMythic && (
        <div
          className="absolute inset-0 rounded-3xl opacity-30 pointer-events-none"
          style={{
            background:
              'linear-gradient(90deg, #FF6B9D, #FFB347, #FFFF6B, #47FF8C, #6BE4FF, #7C3AED, #FF6B9D)',
            backgroundSize: '200% 100%',
            animation: 'rainbow 3s linear infinite',
            filter: 'blur(20px)',
            zIndex: -1,
          }}
        />
      )}

      <div
        className="relative bg-white rounded-3xl overflow-hidden shadow-2xl"
        style={{ boxShadow: RARITY_GLOW[result.rarity] }}
      >
        {/* Header gradient */}
        <div
          className="px-6 pt-8 pb-10 flex flex-col items-center gap-3"
          style={{
            background: `linear-gradient(135deg, ${result.gradientFrom}88, ${result.gradientTo}88)`,
          }}
        >
          {/* Rarity badge */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: 'spring', stiffness: 260 }}
          >
            <span
              className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-display font-bold border-2 tracking-wider ${RARITY_BADGE_BG[result.rarity]}`}
              style={
                isMythic
                  ? {
                      background:
                        'linear-gradient(90deg, #FF6B9D, #FFB347, #7C3AED)',
                      backgroundSize: '200%',
                      animation: 'rainbow 2s linear infinite',
                    }
                  : undefined
              }
            >
              {'★'.repeat(RARITY_STARS[result.rarity])}
            </span>
          </motion.div>

          {/* Blob visual */}
          <motion.div
            animate={{
              borderRadius: [
                '60% 40% 30% 70% / 60% 30% 70% 40%',
                '40% 60% 70% 30% / 40% 50% 60% 50%',
                '30% 60% 40% 70% / 50% 60% 30% 60%',
                '60% 40% 30% 70% / 60% 30% 70% 40%',
              ],
              y: [0, -8, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="relative w-28 h-28 shadow-xl"
            style={{
              background: `linear-gradient(135deg, ${result.gradientFrom}, ${result.gradientTo})`,
            }}
          >
            <BlobFace personality={result.id} />
            <span className="absolute bottom-2 left-1/2 -translate-x-1/2 text-2xl select-none z-10">
              {result.emoji}
            </span>
          </motion.div>

          {/* Legendary+ sparkles */}
          {isLegendaryPlus && (
            <motion.div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute text-lg"
                  style={{
                    top: `${20 + Math.random() * 60}%`,
                    left: `${10 + Math.random() * 80}%`,
                  }}
                  animate={{ opacity: [0, 1, 0], scale: [0.5, 1.2, 0.5], y: [-10, 10] }}
                  transition={{
                    duration: 1.5 + Math.random(),
                    repeat: Infinity,
                    delay: i * 0.4,
                  }}
                >
                  {isMythic ? '🌈' : '✨'}
                </motion.div>
              ))}
            </motion.div>
          )}

          <div className="text-center mt-1">
            <h1 className="font-display text-2xl text-gray-800 leading-tight">{result.name}</h1>
            <p className="font-body text-sm text-gray-500 mt-1">{result.subtitle}</p>
          </div>
        </div>

        {/* Body */}
        <div className="px-6 py-6 flex flex-col gap-5">
          {/* Description */}
          <p className="font-body text-sm text-gray-600 leading-relaxed text-center">
            {result.description}
          </p>

          {/* Traits */}
          <div>
            <p className="font-display text-sm text-gray-400 mb-3 text-center tracking-wider uppercase">
              ลักษณะประจำก้อน
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              {result.traits.map((trait) => (
                <span
                  key={trait}
                  className="px-3 py-1.5 rounded-full text-xs font-body font-semibold bg-pink-50 text-pink-500 border border-pink-100"
                >
                  {trait}
                </span>
              ))}
            </div>
          </div>

          {/* Star rarity indicator */}
          <div className="flex items-center justify-center gap-1 mt-1">
            {Array.from({ length: 5 }, (_, i) => {
              const filled = i < RARITY_STARS[result.rarity];
              return (
                <motion.span
                  key={i}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5 + i * 0.08 }}
                  className={`text-2xl transition-all select-none ${filled ? 'opacity-100' : 'opacity-15'}`}
                  style={{ color: filled ? result.badgeColor : '#D1D5DB' }}
                >
                  ★
                </motion.span>
              );
            })}
          </div>

          {/* Action buttons */}
          <div className="flex flex-col gap-3 mt-2">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleShare}
              className="w-full py-4 rounded-2xl font-display text-base text-white shadow-lg transition-all"
              style={{
                background: `linear-gradient(135deg, ${result.gradientFrom}, ${result.gradientTo})`,
              }}
            >
              แชร์ผลลัพธ์นี้ 🎉
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={onRetry}
              className="w-full py-3.5 rounded-2xl font-display text-base text-pink-400 border-2 border-pink-200 bg-white hover:bg-pink-50 transition-all"
            >
              ทดสอบใหม่อีกรอบ 🔁
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
