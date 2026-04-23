'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LOADING_MESSAGES = [
  'กำลังวิเคราะห์วิญญาณก้อนของคุณ... 🔮',
  'ปรึกษากับจักรวาลอยู่นะ รอแป๊บ... 🌌',
  'เช็กฐานข้อมูลก้อนทั่วโลก... 🌍',
  'คำนวณระดับความขี้เกียจ... ⚡',
  'เกือบได้ผลแล้ว! ใจเย็นๆ นะ... 🐾',
  'โหลดนิดนึง อย่าเพิ่งหนี... 💫',
  'ตกลงคุณเป็นก้อนอะไรกันแน่... 🤔',
  'ก้อนสายพันธุ์ของคุณกำลังตื่นขึ้น... ✨',
];

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [msgIndex, setMsgIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const msgTimer = setInterval(() => {
      setMsgIndex((prev) => (prev + 1) % LOADING_MESSAGES.length);
    }, 700);

    const progTimer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progTimer);
          clearInterval(msgTimer);
          return 100;
        }
        return prev + 2;
      });
    }, 100);

    const doneTimer = setTimeout(onComplete, 5000);

    return () => {
      clearInterval(msgTimer);
      clearInterval(progTimer);
      clearTimeout(doneTimer);
    };
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-8 px-6"
      style={{
        background:
          'linear-gradient(135deg, #FFB3C6 0%, #FDEEA3 33%, #B5EAD7 66%, #B3D9FF 100%)',
        backgroundSize: '400% 400%',
        animation: 'gradient-shift 3s ease infinite',
      }}
    >
      {/* ─── Place Interstitial / Full-screen Ad Here ─────────────────────────
       *
       *  This screen shows for 5 seconds — ideal placement for a full-screen
       *  interstitial ad (e.g. AdMob Interstitial or custom full-page AdSense).
       *
       *  Example AdSense interstitial:
       *  <ins className="adsbygoogle" style={{ display: 'block' }}
       *    data-ad-format="fluid" data-ad-layout-key="..."
       *    data-ad-client="ca-pub-XXXXXXXXXXXXXXXX" data-ad-slot="XXXXXXXXXX" />
       *
       * ──────────────────────────────────────────────────────────────────────── */}

      {/* Morphing blob */}
      <motion.div
        animate={{
          borderRadius: [
            '60% 40% 30% 70% / 60% 30% 70% 40%',
            '40% 60% 70% 30% / 40% 50% 60% 50%',
            '30% 60% 40% 70% / 50% 60% 30% 60%',
            '60% 40% 30% 70% / 60% 30% 70% 40%',
          ],
          rotate: [0, 5, -5, 0],
          scale: [1, 1.05, 0.97, 1],
        }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        className="w-36 h-36 flex items-center justify-center shadow-2xl"
        style={{
          background: 'linear-gradient(135deg, #FFB3C6, #C7B8EA)',
        }}
      >
        <span className="text-6xl select-none">🔮</span>
      </motion.div>

      {/* Spinning stars */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
        className="absolute w-56 h-56 pointer-events-none"
      >
        {['✨', '⭐', '💫', '🌟'].map((star, i) => (
          <span
            key={i}
            className="absolute text-xl"
            style={{
              top: `${50 + 46 * Math.sin((i * Math.PI) / 2)}%`,
              left: `${50 + 46 * Math.cos((i * Math.PI) / 2)}%`,
              transform: 'translate(-50%, -50%)',
            }}
          >
            {star}
          </span>
        ))}
      </motion.div>

      {/* Message */}
      <div className="text-center z-10 max-w-xs">
        <AnimatePresence mode="wait">
          <motion.p
            key={msgIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="font-display text-lg text-white drop-shadow-md"
          >
            {LOADING_MESSAGES[msgIndex]}
          </motion.p>
        </AnimatePresence>
      </div>

      {/* Progress bar */}
      <div className="w-full max-w-xs z-10">
        <div className="h-3 bg-white/40 rounded-full overflow-hidden shadow-inner">
          <motion.div
            className="h-full rounded-full"
            style={{
              width: `${progress}%`,
              background: 'linear-gradient(90deg, #FF85A2, #C7B8EA, #93C5FD)',
            }}
            transition={{ duration: 0.1 }}
          />
        </div>
        <p className="text-center font-body text-white/80 text-xs mt-2">{progress}%</p>
      </div>
    </motion.div>
  );
}
