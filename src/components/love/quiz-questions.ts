/**
 * The little "do you remember us?" quiz.
 *
 * ───────────────────────────────────────────────────────────────────────────
 * HOW TO CUSTOMIZE
 * ───────────────────────────────────────────────────────────────────────────
 * Edit the questions below to match your real memories with Mau.
 * Each question has:
 *   - question:  the prompt
 *   - options:   3 answer choices (string)
 *   - correct:   the index (0, 1 or 2) of the right answer
 *
 * Keep them light, sweet, and personal. 💕
 */
export type QuizQuestion = {
  question: string;
  options: string[];
  correct: number;
};

export const quizQuestions: QuizQuestion[] = [
  {
    question: "What do you call me, mostly?",
    options: ["Jash", "Poochu", "Baby"],
    correct: 1,
  },
  {
    question: "What do I call you, my love?",
    options: ["Payal", "Mau", "Sweetheart"],
    correct: 1,
  },
  {
    question: "Which of these is my favourite sound in the world?",
    options: ["You crying", "Your laugh", "A good song"],
    correct: 1,
  },
  {
    question: "On my messy, confusing days, what do you do?",
    options: ["You stay", "You walk away", "You get upset"],
    correct: 0,
  },
  {
    question: "What did I promise you, again and again?",
    options: ["To choose you every day", "To be perfect", "To never argue"],
    correct: 0,
  },
];

/** Shown at the end of the quiz based on the score (out of quizQuestions.length). */
export function quizResultMessage(score: number, total: number): { title: string; message: string } {
  if (score === total) {
    return {
      title: "Perfect, my love!",
      message:
        "You remembered every little thing. Of course you did — it's our story, and you hold it as close as I do.",
    };
  }
  if (score >= total - 1) {
    return {
      title: "So close, sweetheart",
      message:
        "Almost perfect. Don't worry, we have a whole lifetime to make even more memories to remember.",
    };
  }
  if (score >= Math.ceil(total / 2)) {
    return {
      title: "You're getting there, Mau",
      message:
        "You remember the heart of it, and that's what matters. Let's go make the rest of the memories again, together.",
    };
  }
  return {
    title: "That's okay, my love",
    message:
      "Even if the little details fade, the one thing that never will is how much I love you. Ready to make new memories?",
  };
}
