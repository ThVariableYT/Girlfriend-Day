"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useState } from "react";
import { Heart, Check, X, RotateCcw, Sparkles } from "lucide-react";
import { quizQuestions, quizResultMessage } from "./quiz-questions";
import { Reveal } from "./reveal";

export function QuizSection() {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(
    Array(quizQuestions.length).fill(null)
  );
  const [picked, setPicked] = useState<number | null>(null);
  const [finished, setFinished] = useState(false);

  const q = quizQuestions[current];
  const total = quizQuestions.length;

  const choose = useCallback(
    (opt: number) => {
      if (picked !== null) return; // lock after first pick for this question
      setPicked(opt);
      const next = [...answers];
      next[current] = opt;
      setAnswers(next);
    },
    [picked, answers, current]
  );

  const next = useCallback(() => {
    if (current < total - 1) {
      setCurrent((c) => c + 1);
      setPicked(null);
    } else {
      setFinished(true);
    }
  }, [current, total]);

  const restart = useCallback(() => {
    setCurrent(0);
    setPicked(null);
    setAnswers(Array(total).fill(null));
    setFinished(false);
  }, [total]);

  const score = answers.reduce<number>(
    (acc, a, i) => (a === quizQuestions[i].correct ? acc + 1 : acc),
    0
  );
  const result = quizResultMessage(score, total);

  return (
    <section className="relative z-10 px-6 py-24 sm:py-28">
      <div className="mx-auto max-w-2xl">
        <Reveal className="mb-10 text-center">
          <p className="font-body text-sm uppercase tracking-[0.4em] text-[oklch(0.5_0.1_30)]">
            a little game for us
          </p>
          <h2 className="mt-3 font-serif-display text-4xl italic text-[oklch(0.35_0.08_20)] sm:text-5xl">
            Do You Remember, Mau?
          </h2>
          <p className="mx-auto mt-4 max-w-lg font-body text-lg text-[oklch(0.4_0.07_25)]">
            Five tiny questions about us. No pressure, no wrong answers that
            matter — only the fun of remembering.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="glass-card rounded-[1.75rem] p-6 sm:p-10">
            <AnimatePresence mode="wait">
              {!finished ? (
                <motion.div
                  key={`q-${current}`}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  {/* progress */}
                  <div className="mb-6 flex items-center justify-between">
                    <span className="font-body text-sm tracking-wide text-[oklch(0.5_0.08_30)]">
                      Question {current + 1} of {total}
                    </span>
                    <div className="flex gap-1.5">
                      {quizQuestions.map((_, i) => (
                        <span
                          key={i}
                          className="h-1.5 rounded-full transition-all duration-300"
                          style={{
                            width: i === current ? 22 : 10,
                            background:
                              i < current
                                ? "oklch(0.55 0.16 18)"
                                : i === current
                                ? "oklch(0.7 0.13 35)"
                                : "oklch(0.85 0.04 40)",
                          }}
                        />
                      ))}
                    </div>
                  </div>

                  <h3 className="font-serif-display text-2xl leading-snug text-[oklch(0.3_0.07_20)] sm:text-3xl">
                    {q.question}
                  </h3>

                  <div className="mt-6 space-y-3">
                    {q.options.map((opt, i) => {
                      const isPicked = picked === i;
                      const isCorrect = i === q.correct;
                      const reveal = picked !== null;
                      return (
                        <button
                          key={i}
                          onClick={() => choose(i)}
                          disabled={reveal}
                          className={[
                            "flex w-full items-center justify-between gap-3 rounded-2xl border px-5 py-4 text-left font-body text-lg transition sm:text-xl",
                            !reveal &&
                              "border-[oklch(0.88_0.04_35/0.7)] bg-[oklch(0.995_0.008_50/0.8)] hover:border-[oklch(0.7_0.13_40)] hover:bg-[oklch(0.97_0.03_45)]",
                            reveal && isCorrect &&
                              "border-[oklch(0.55_0.16_18/0.7)] bg-[oklch(0.95_0.05_30/0.8)] text-[oklch(0.3_0.08_18)]",
                            reveal && isPicked && !isCorrect &&
                              "border-[oklch(0.6_0.14_25/0.6)] bg-[oklch(0.96_0.04_30/0.7)] text-[oklch(0.4_0.1_22)]",
                            reveal && !isPicked && !isCorrect &&
                              "border-[oklch(0.9_0.03_40/0.6)] bg-[oklch(0.98_0.01_50/0.6)] opacity-70 text-[oklch(0.5_0.06_28)]",
                          ]
                            .filter(Boolean)
                            .join(" ")}
                        >
                          <span>{opt}</span>
                          {reveal && isCorrect && (
                            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[oklch(0.55_0.16_18)] text-[oklch(0.98_0.02_50)]">
                              <Check className="h-4 w-4" />
                            </span>
                          )}
                          {reveal && isPicked && !isCorrect && (
                            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[oklch(0.6_0.14_25)] text-[oklch(0.98_0.02_50)]">
                              <X className="h-4 w-4" />
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>

                  <AnimatePresence>
                    {picked !== null && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="mt-6 flex items-center justify-between gap-4"
                      >
                        <p className="font-body text-base italic text-[oklch(0.45_0.08_26)]">
                          {picked === q.correct
                            ? "you got it, love 💕"
                            : "that's okay — the right one glows above"}
                        </p>
                        <button
                          onClick={next}
                          className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[oklch(0.55_0.16_18)] to-[oklch(0.5_0.15_28)] px-6 py-3 font-body text-base text-[oklch(0.98_0.02_50)] shadow-md transition hover:scale-[1.03] active:scale-95"
                        >
                          {current < total - 1 ? "Next" : "See my result"}
                          <Heart className="h-4 w-4 fill-current" />
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ) : (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="text-center"
                >
                  <div className="mx-auto mb-5 flex w-fit items-center justify-center">
                    <span className="relative flex h-16 w-16 items-center justify-center">
                      <span className="absolute inset-0 rounded-full bg-[oklch(0.78_0.11_55/0.4)] blur-lg animate-glow" />
                      <Sparkles className="relative h-8 w-8 text-[oklch(0.55_0.15_25)]" />
                    </span>
                  </div>
                  <p className="font-body text-sm uppercase tracking-[0.35em] text-[oklch(0.5_0.1_30)]">
                    you scored
                  </p>
                  <p className="mt-2 font-vibes px-3 py-3 text-6xl leading-[1.3] text-gradient-rose">
                    {score} / {total}
                  </p>
                  <h3 className="mt-3 font-serif-display text-2xl italic text-[oklch(0.32_0.08_20)] sm:text-3xl">
                    {result.title}
                  </h3>
                  <p className="mx-auto mt-3 max-w-md font-body text-lg leading-relaxed text-[oklch(0.4_0.07_25)]">
                    {result.message}
                  </p>
                  <button
                    onClick={restart}
                    className="mt-7 inline-flex items-center gap-2 rounded-full border border-[oklch(0.7_0.1_40/0.6)] bg-[oklch(0.99_0.01_50/0.8)] px-6 py-3 font-body text-base text-[oklch(0.45_0.1_25)] shadow-sm backdrop-blur transition hover:scale-[1.03]"
                  >
                    <RotateCcw className="h-4 w-4" />
                    Play again
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
