"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Question } from "../types";
import ProgressBar from "./ProgressBar";
import AdBanner from "./AdBanner";
import BlobFace from "./BlobFace";

interface QuestionCardProps {
  question: Question;
  questionIndex: number;
  totalQuestions: number;
  onAnswer: (scores: Partial<Record<string, number>>) => void;
  onBack: () => void;
}

const STORY_DURATION = 2600;
const ANSWER_DELAY = 420;

const SCENE_PALETTES = [
  { from: "#FFB3C6", to: "#FDEEA3" },
  { from: "#B5EAD7", to: "#C7F2E8" },
  { from: "#C7B8EA", to: "#E8D5F5" },
  { from: "#FFD166", to: "#FFB3C6" },
  { from: "#B5EAD7", to: "#FDEEA3" },
  { from: "#B3D9FF", to: "#C7B8EA" },
  { from: "#FFB3C6", to: "#B5EAD7" },
  { from: "#FDEEA3", to: "#B3D9FF" },
  { from: "#C7B8EA", to: "#FDEEA3" },
  { from: "#FFD166", to: "#B5EAD7" },
];

const wordVariants = {
  hidden: { opacity: 0, y: 8, filter: "blur(4px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
};

export default function QuestionCard({
  question,
  questionIndex,
  totalQuestions,
  onAnswer,
  onBack,
}: QuestionCardProps) {
  const [phase, setPhase] = useState<"story" | "question">("story");
  const [selected, setSelected] = useState<number | null>(null);

  const palette = SCENE_PALETTES[questionIndex % SCENE_PALETTES.length];

  useEffect(() => {
    setPhase("story");
    setSelected(null);

    const autoTimer = setTimeout(() => setPhase("question"), STORY_DURATION);
    return () => clearTimeout(autoTimer);
  }, [question.id]);

  const handleStoryTap = useCallback(() => {
    if (phase === "story") setPhase("question");
  }, [phase]);

  const handleSelect = useCallback(
    (option: Question["options"][number], i: number) => {
      if (selected !== null) return;
      setSelected(i);
      setTimeout(() => onAnswer(option.scores), ANSWER_DELAY);
    },
    [selected, onAnswer],
  );

  const storyWords = useMemo(() => {
    const clean = question.introStory
      .replace(/^\S+\s*\*?\s*/, "")
      .replace(/\*$/, "")
      .trim();
    return clean.split(" ");
  }, [question.introStory]);

  const storyEmoji = useMemo(() => {
    const match = question.introStory.match(/^(\S+)/);
    return match ? match[1] : "🤩";
  }, [question.introStory]);

  return (
    <div className="w-full max-w-lg mx-auto flex flex-col gap-4">
      <ProgressBar current={questionIndex + 1} total={totalQuestions} />

      <AnimatePresence mode="wait">
        {/* ── STORY PHASE ── */}
        {phase === "story" && (
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
              minHeight: 240,
            }}
          >
            <motion.div
              className="absolute inset-0 opacity-20 pointer-events-none"
              animate={{
                borderRadius: [
                  "60% 40% 30% 70% / 60% 30% 70% 40%",
                  "40% 60% 70% 30% / 40% 50% 60% 50%",
                  "60% 40% 30% 70% / 60% 30% 70% 40%",
                ],
              }}
              style={{ background: "white" }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />

            <div className="relative z-10 flex flex-col items-center justify-center gap-5 px-6 py-10 text-center">
              <motion.span
                initial={{ scale: 0, rotate: -20 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.1 }}
                className="text-5xl drop-shadow-sm"
              >
                {storyEmoji}
              </motion.span>

              <motion.p
                className="font-body text-base text-gray-700 italic leading-relaxed max-w-xs"
                initial="hidden"
                animate="visible"
                transition={{ staggerChildren: 0.05, delayChildren: 0.25 }}
              >
                {storyWords.map((word, i) => (
                  <motion.span
                    key={i}
                    variants={wordVariants}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="inline-block mr-1"
                  >
                    {word}
                  </motion.span>
                ))}
              </motion.p>

              {/* Tap hint always visible */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
                className="flex items-center gap-1.5 mt-1"
              >
                <span className="text-xs">👆</span>
                <span className="font-body text-xs text-gray-500">แตะเพื่อดำเนินต่อ</span>
              </motion.div>
            </div>

            {/* Blob companion */}
            <div className="absolute bottom-4 right-4 w-12 h-12">
              <motion.div
                className="absolute inset-0"
                animate={{
                  borderRadius: [
                    "60% 40% 30% 70% / 60% 30% 70% 40%",
                    "40% 60% 70% 30% / 40% 50% 60% 50%",
                    "60% 40% 30% 70% / 60% 30% 70% 40%",
                  ],
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                style={{ background: "rgba(255,255,255,0.32)" }}
              />
              <BlobFace personality="generic" />
            </div>

            {/* Countdown strip */}
            <motion.div
              className="absolute bottom-0 left-0 h-1 rounded-b-3xl"
              style={{ background: "rgba(255,255,255,0.6)" }}
              initial={{ width: "100%" }}
              animate={{ width: "0%" }}
              transition={{ duration: STORY_DURATION / 1000, ease: "linear" }}
            />
          </motion.div>
        )}

        {/* ── QUESTION PHASE ── */}
        {phase === "question" && (
          <motion.div
            key="question"
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -60 }}
            transition={{ duration: 0.38, ease: [0.4, 0, 0.2, 1] }}
            className="flex flex-col gap-4"
          >
            {/* Back button + question text */}
            <div className="flex items-center gap-2 px-1">
              <button
                onClick={onBack}
                className="flex-shrink-0 flex items-center justify-center text-pink-400 font-body text-base outline-none"
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 12,
                  border: "1.5px solid rgba(255,182,210,0.5)",
                  background: "rgba(255,255,255,0.65)",
                  backdropFilter: "blur(10px)",
                  WebkitBackdropFilter: "blur(10px)",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                  cursor: "pointer",
                }}
              >
                ←
              </button>
              <div
                className="flex-1 px-4 py-3 rounded-2xl"
                style={{
                  background: `linear-gradient(135deg, ${palette.from}55, ${palette.to}55)`,
                  backdropFilter: "blur(8px)",
                  WebkitBackdropFilter: "blur(8px)",
                  border: "1px solid rgba(255,255,255,0.6)",
                }}
              >
                <h2 className="font-display text-base text-gray-700 leading-snug">
                  {question.question}
                </h2>
              </div>
            </div>

            {/* Options */}
            <div className="flex flex-col gap-3">
              {question.options.map((option, i) => {
                const [optEmoji, ...textParts] = option.text.split(" ");
                const optText = textParts.join(" ");
                const isSelected = selected === i;
                const isOther = selected !== null && !isSelected;

                return (
                  <motion.button
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{
                      opacity: isOther ? 0.55 : 1,
                      x: 0,
                      scale: isSelected ? 1.015 : isOther ? 0.99 : 1,
                    }}
                    transition={{ duration: 0.2, delay: selected === null ? 0.1 + i * 0.07 : 0 }}
                    whileHover={selected === null ? { scale: 1.02 } : {}}
                    whileTap={selected === null ? { scale: 0.97 } : {}}
                    onClick={() => handleSelect(option, i)}
                    className="w-full text-left rounded-2xl outline-none"
                    style={{
                      padding: "14px 16px 14px 12px",
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 12,
                      border: `2px solid ${isSelected ? palette.from : "rgba(255,182,210,0.35)"}`,
                      background: isSelected
                        ? `linear-gradient(135deg, ${palette.from}99, ${palette.to}99)`
                        : "rgba(255,255,255,0.6)",
                      backdropFilter: "blur(10px)",
                      WebkitBackdropFilter: "blur(10px)",
                      boxShadow: isSelected
                        ? `0 6px 20px ${palette.from}55, inset 0 1px 0 rgba(255,255,255,0.8)`
                        : "0 2px 10px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.8)",
                      cursor: selected !== null ? "default" : "pointer",
                      transition: "background 0.2s, border 0.2s, box-shadow 0.2s",
                      WebkitAppearance: "none",
                    }}
                  >
                    {/* Emoji badge */}
                    <div
                      style={{
                        width: 36,
                        height: 36,
                        flexShrink: 0,
                        borderRadius: 10,
                        marginTop: 1,
                        background: isSelected
                          ? "rgba(255,255,255,0.8)"
                          : `linear-gradient(135deg, ${palette.from}55, ${palette.to}55)`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 18,
                        transition: "background 0.2s, transform 0.2s",
                        transform: isSelected ? "scale(1.1)" : "scale(1)",
                      }}
                    >
                      {optEmoji}
                    </div>
                    <span className="font-body text-sm text-gray-600 leading-relaxed" style={{ fontWeight: 600 }}>
                      {optText}
                    </span>
                  </motion.button>
                );
              })}
            </div>

            <AdBanner className="mt-1" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
