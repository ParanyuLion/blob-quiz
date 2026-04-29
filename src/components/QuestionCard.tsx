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

const STORY_DURATION = 4200;
const ANSWER_DELAY = 420;

// Per-question cartoon scene configs
const SCENE_CONFIGS = [
  { sky: ['#FFF0E8', '#FFD4C0'], ground: '#FFBFA0', clouds: ['☁️', '🌤️'],
    props: [{ e: '⏰', x: '78%', y: '14%', s: 32, d: 0.25, dr: 'prop-drift-2' }, { e: '🛏️', x: '8%', y: '52%', s: 30, d: 0.4, dr: 'prop-drift-1' }, { e: '😴', x: '18%', y: '12%', s: 26, d: 0.55, dr: 'prop-drift-3' }],
    blobColor: ['#FFB3C6', '#FF85A2'] },
  { sky: ['#E8F4FF', '#C7E0FF'], ground: '#A8D8FF', clouds: ['💬', '📲'],
    props: [{ e: '📱', x: '74%', y: '16%', s: 30, d: 0.3, dr: 'prop-drift-1' }, { e: '💬', x: '10%', y: '18%', s: 26, d: 0.45, dr: 'prop-drift-2' }, { e: '😵', x: '76%', y: '55%', s: 24, d: 0.6, dr: 'prop-drift-3' }],
    blobColor: ['#B3D9FF', '#6BB8FF'] },
  { sky: ['#FFF8E8', '#FFE8B0'], ground: '#FFD580', clouds: ['🌤️', '☀️'],
    props: [{ e: '📦', x: '72%', y: '15%', s: 30, d: 0.3, dr: 'prop-drift-2' }, { e: '🍜', x: '10%', y: '50%', s: 32, d: 0.4, dr: 'prop-drift-1' }, { e: '🛵', x: '70%', y: '55%', s: 28, d: 0.55, dr: 'prop-drift-3' }],
    blobColor: ['#FDEEA3', '#FFD166'] },
  { sky: ['#F0F0FF', '#D8D8FF'], ground: '#C0C0F0', clouds: ['☁️', '💻'],
    props: [{ e: '💻', x: '70%', y: '14%', s: 32, d: 0.25, dr: 'prop-drift-1' }, { e: '☕', x: '10%', y: '16%', s: 28, d: 0.4, dr: 'prop-drift-2' }, { e: '📋', x: '72%', y: '56%', s: 26, d: 0.55, dr: 'prop-drift-3' }],
    blobColor: ['#C7B8EA', '#A78BCC'] },
  { sky: ['#FFF0F8', '#FFD8EC'], ground: '#FFB0D4', clouds: ['🌸', '💗'],
    props: [{ e: '🏬', x: '68%', y: '12%', s: 32, d: 0.3, dr: 'prop-drift-2' }, { e: '🛍️', x: '8%', y: '50%', s: 30, d: 0.45, dr: 'prop-drift-1' }, { e: '💳', x: '74%', y: '56%', s: 24, d: 0.6, dr: 'prop-drift-3' }],
    blobColor: ['#FFB3C6', '#FF85A2'] },
  { sky: ['#F0FFF0', '#C8F0C8'], ground: '#90D890', clouds: ['🎈', '🎉'],
    props: [{ e: '🎉', x: '72%', y: '14%', s: 32, d: 0.3, dr: 'prop-drift-1' }, { e: '🍽️', x: '8%', y: '52%', s: 28, d: 0.4, dr: 'prop-drift-2' }, { e: '🎈', x: '18%', y: '14%', s: 26, d: 0.55, dr: 'prop-drift-3' }],
    blobColor: ['#B5EAD7', '#6EDFC0'] },
  { sky: ['#FFF8F0', '#FFE8CC'], ground: '#FFCC88', clouds: ['⚡', '🏋️'],
    props: [{ e: '🏋️', x: '70%', y: '14%', s: 30, d: 0.3, dr: 'prop-drift-2' }, { e: '💪', x: '10%', y: '16%', s: 28, d: 0.45, dr: 'prop-drift-1' }, { e: '👟', x: '72%', y: '58%', s: 26, d: 0.6, dr: 'prop-drift-3' }],
    blobColor: ['#FFD4B2', '#FFB347'] },
  { sky: ['#1A1A3A', '#2D2D5E'], ground: '#3D3D6E', clouds: ['⭐', '🌙'],
    props: [{ e: '📺', x: '68%', y: '14%', s: 32, d: 0.3, dr: 'prop-drift-1' }, { e: '🍿', x: '10%', y: '52%', s: 28, d: 0.4, dr: 'prop-drift-2' }, { e: '🌙', x: '18%', y: '14%', s: 24, d: 0.55, dr: 'prop-drift-3' }],
    blobColor: ['#9B8EC4', '#7C6BAD'] },
  { sky: ['#E8FEFF', '#B8F0FF'], ground: '#80DCFF', clouds: ['🫧', '💧'],
    props: [{ e: '🚿', x: '72%', y: '14%', s: 30, d: 0.25, dr: 'prop-drift-2' }, { e: '🧴', x: '8%', y: '52%', s: 28, d: 0.4, dr: 'prop-drift-1' }, { e: '🫧', x: '16%', y: '14%', s: 24, d: 0.55, dr: 'prop-drift-3' }],
    blobColor: ['#B3D9FF', '#6EDFC0'] },
  { sky: ['#F8F0FF', '#E8D8FF'], ground: '#C8A8FF', clouds: ['🌟', '🔮'],
    props: [{ e: '🔮', x: '72%', y: '14%', s: 30, d: 0.3, dr: 'prop-drift-1' }, { e: '🗓️', x: '8%', y: '52%', s: 28, d: 0.45, dr: 'prop-drift-2' }, { e: '🌟', x: '18%', y: '14%', s: 26, d: 0.6, dr: 'prop-drift-3' }],
    blobColor: ['#C7B8EA', '#A78BCC'] },
];

export default function QuestionCard({
  question,
  questionIndex,
  totalQuestions,
  onAnswer,
  onBack,
}: QuestionCardProps) {
  const [phase, setPhase] = useState<"story" | "question">("story");
  const [selected, setSelected] = useState<number | null>(null);

  const cfg = SCENE_CONFIGS[questionIndex % SCENE_CONFIGS.length];
  const isDark = questionIndex === 7; // Netflix night scene

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

  // Scene theme values
  const textColor = isDark ? "rgba(255,255,255,0.9)" : "#3D2B5C";
  const bubbleBg = isDark ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.7)";
  const bubbleBorder = isDark ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.9)";

  return (
    <div className="w-full max-w-lg mx-auto flex flex-col gap-4">
      <ProgressBar current={questionIndex + 1} total={totalQuestions} />

      <AnimatePresence mode="wait">
        {/* ── STORY PHASE: Cartoon scene ── */}
        {phase === "story" && (
          <motion.div
            key="story"
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.04, y: -20 }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            onClick={handleStoryTap}
            className="relative w-full cursor-pointer select-none"
            style={{
              borderRadius: 28,
              overflow: "hidden",
              background: `linear-gradient(175deg, ${cfg.sky[0]} 0%, ${cfg.sky[1]} 60%, ${cfg.ground} 100%)`,
              minHeight: 320,
              boxShadow: `0 16px 48px ${cfg.sky[1]}88`,
            }}
          >
            {/* Clouds / floating bg icons */}
            {cfg.clouds.map((c, i) => (
              <span
                key={i}
                style={{
                  position: "absolute",
                  fontSize: 22,
                  opacity: 0.55,
                  top: i === 0 ? "7%" : "5%",
                  left: i === 0 ? "8%" : undefined,
                  right: i === 1 ? "12%" : undefined,
                  animation: `cloud-drift ${5 + i * 2}s ease-in-out ${i * 0.8}s infinite`,
                  filter: isDark ? "brightness(1.5)" : "none",
                }}
              >
                {c}
              </span>
            ))}

            {/* Floating scene props */}
            {cfg.props.map((p, i) => (
              <span
                key={i}
                style={{
                  position: "absolute",
                  fontSize: p.s,
                  zIndex: 3,
                  left: p.x,
                  top: p.y,
                  animation: `prop-pop 0.55s cubic-bezier(0.34,1.56,0.64,1) ${p.d}s both, ${p.dr} ${3.2 + i * 0.5}s ease-in-out ${p.d + 0.8}s infinite`,
                  filter: "drop-shadow(0 3px 6px rgba(0,0,0,0.18))",
                }}
              >
                {p.e}
              </span>
            ))}

            {/* Ground strip */}
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: 56,
                background: isDark
                  ? "linear-gradient(0deg, rgba(20,20,60,0.9), transparent)"
                  : `linear-gradient(0deg, ${cfg.ground}dd, transparent)`,
                borderRadius: "0 0 28px 28px",
              }}
            />

            {/* Main content: blob (left) + speech bubble (right) */}
            <div
              style={{
                position: "relative",
                zIndex: 4,
                display: "flex",
                flexDirection: "row",
                alignItems: "flex-end",
                padding: "20px 16px 52px",
                gap: 14,
                minHeight: 260,
              }}
            >
              {/* Blob character — enters from below with squash & stretch */}
              <div
                style={{
                  position: "relative",
                  width: 88,
                  height: 88,
                  flexShrink: 0,
                  alignSelf: "flex-end",
                  animation: "blob-bounce-in 0.75s cubic-bezier(0.34,1.56,0.64,1) 0.1s both",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: `linear-gradient(135deg, ${cfg.blobColor[0]}, ${cfg.blobColor[1]})`,
                    borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%",
                    boxShadow: `0 8px 28px ${cfg.blobColor[1]}66, inset 0 2px 0 rgba(255,255,255,0.5)`,
                    animation: "blob-morph 4s ease-in-out 0.8s infinite, blob-idle 3s ease-in-out 1s infinite",
                    border: "2px solid rgba(255,255,255,0.5)",
                  }}
                >
                  <BlobFace personality="generic" />
                </div>
                {/* Shadow under blob */}
                <div
                  style={{
                    position: "absolute",
                    bottom: -8,
                    left: "10%",
                    right: "10%",
                    height: 10,
                    background: "rgba(0,0,0,0.12)",
                    borderRadius: "50%",
                    filter: "blur(4px)",
                    animation: "blob-idle 3s ease-in-out 1s infinite",
                  }}
                />
                {/* Scene emoji reaction badge */}
                <span
                  style={{
                    position: "absolute",
                    top: -10,
                    right: -10,
                    fontSize: 24,
                    zIndex: 5,
                    animation: "prop-pop 0.5s cubic-bezier(0.34,1.56,0.64,1) 0.6s both, prop-drift-2 2.5s ease-in-out 1.2s infinite",
                    filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.2))",
                  }}
                >
                  {storyEmoji}
                </span>
              </div>

              {/* Speech bubble — right side */}
              <div
                style={{
                  flex: 1,
                  minWidth: 0,
                  animation: "bubble-pop 0.4s cubic-bezier(0.34,1.56,0.64,1) 0.55s both",
                  position: "relative",
                }}
              >
                {/* Bubble tail pointing left */}
                <div
                  style={{
                    position: "absolute",
                    left: -10,
                    bottom: 18,
                    width: 0,
                    height: 0,
                    borderTop: "8px solid transparent",
                    borderBottom: "8px solid transparent",
                    borderRight: `10px solid ${bubbleBorder}`,
                  }}
                />
                <div
                  style={{
                    background: bubbleBg,
                    backdropFilter: "blur(16px)",
                    WebkitBackdropFilter: "blur(16px)",
                    borderRadius: 20,
                    padding: "13px 14px",
                    border: `1.5px solid ${bubbleBorder}`,
                    boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                  }}
                >
                  <p
                    className="font-body"
                    style={{
                      fontSize: 13,
                      color: textColor,
                      lineHeight: 1.7,
                      fontStyle: "italic",
                      margin: 0,
                      fontWeight: 600,
                    }}
                  >
                    {storyWords.map((w, i) => (
                      <span
                        key={i}
                        style={{
                          display: "inline-block",
                          marginRight: 3,
                          animation: `story-word-in 0.28s ease-out ${0.65 + i * 0.05}s both`,
                        }}
                      >
                        {w}
                      </span>
                    ))}
                  </p>
                </div>
              </div>
            </div>

            {/* Tap hint + countdown bar */}
            <div
              style={{
                position: "absolute",
                bottom: 12,
                left: 0,
                right: 0,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 6,
                zIndex: 5,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 5,
                  animation: "tap-pulse 1.6s ease-in-out 0.9s infinite",
                }}
              >
                <span style={{ fontSize: 13 }}>👆</span>
                <span
                  className="font-body"
                  style={{
                    fontSize: 11.5,
                    fontWeight: 700,
                    color: isDark ? "rgba(255,255,255,0.6)" : "rgba(60,40,90,0.5)",
                  }}
                >
                  แตะเพื่อดำเนินต่อ
                </span>
              </div>
              {/* Countdown dots */}
              <div
                style={{
                  width: 120,
                  height: 3,
                  background: "rgba(255,255,255,0.3)",
                  borderRadius: 99,
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    background: "rgba(255,255,255,0.7)",
                    borderRadius: 99,
                    animation: `story-countdown ${STORY_DURATION / 1000}s linear forwards`,
                  }}
                />
              </div>
            </div>
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
                  background: `linear-gradient(135deg, ${cfg.sky[0]}55, ${cfg.sky[1]}55)`,
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
                      border: `2px solid ${isSelected ? cfg.sky[0] : "rgba(255,182,210,0.35)"}`,
                      background: isSelected
                        ? `linear-gradient(135deg, ${cfg.sky[0]}99, ${cfg.sky[1]}99)`
                        : "rgba(255,255,255,0.6)",
                      backdropFilter: "blur(10px)",
                      WebkitBackdropFilter: "blur(10px)",
                      boxShadow: isSelected
                        ? `0 6px 20px ${cfg.sky[0]}55, inset 0 1px 0 rgba(255,255,255,0.8)`
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
                          : `linear-gradient(135deg, ${cfg.sky[0]}55, ${cfg.sky[1]}55)`,
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
                    <span
                      className="font-body text-sm text-gray-600 leading-relaxed"
                      style={{ fontWeight: 600 }}
                    >
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
