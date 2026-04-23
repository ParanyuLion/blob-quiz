'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { BlobResult } from '../../../types';
import ResultCard from '../../../components/ResultCard';
import AdBanner from '../../../components/AdBanner';

interface Props {
  result: BlobResult;
}

const DECORATIVE = [
  { size: 'w-32 h-32', top: '-4%', right: '-5%', from: '#FDEEA3', to: '#FFD166' },
  { size: 'w-24 h-24', bottom: '10%', left: '-4%', from: '#B5EAD7', to: '#6EDFC0' },
];

export default function ResultPageClient({ result }: Props) {
  const router = useRouter();

  const handleRetry = () => {
    sessionStorage.removeItem('blobScores');
    router.push('/');
  };

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-start px-4 pt-8 pb-16 overflow-hidden">
      {/* Decorative blobs */}
      {DECORATIVE.map((b, i) => (
        <motion.div
          key={i}
          className={`absolute ${b.size} pointer-events-none`}
          style={{
            top: b.top,
            right: b.right,
            bottom: b.bottom,
            left: b.left,
            background: `linear-gradient(135deg, ${b.from}, ${b.to})`,
            opacity: 0.3,
            filter: 'blur(2px)',
          }}
          animate={{
            borderRadius: [
              '60% 40% 30% 70% / 60% 30% 70% 40%',
              '40% 60% 70% 30% / 40% 50% 60% 50%',
              '60% 40% 30% 70% / 60% 30% 70% 40%',
            ],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: i * 1.5 }}
        />
      ))}

      {/* Header */}
      <motion.p
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="font-display text-sm text-gray-400 mb-5 z-10"
      >
        🫧 ผลการทดสอบสายพันธุ์ก้อน
      </motion.p>

      {/* Result card */}
      <div className="w-full max-w-md z-10">
        <ResultCard result={result} onRetry={handleRetry} />
      </div>

      {/* Ad banner below result */}
      <div className="w-full max-w-md mt-6 z-10">
        <AdBanner />
      </div>

      {/* Footer */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="font-body text-xs text-gray-300 mt-8 text-center z-10"
      >
        แชร์ link นี้ให้เพื่อนๆ มาทดสอบด้วยกัน! 🌸
      </motion.p>
    </main>
  );
}
