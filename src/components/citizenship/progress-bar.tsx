// import { cn } from "@/lib/utils";

interface ProgressBarProps {
  currentQuestion: number;
  totalQuestions: number;
}

/**
 * Displays a progress bar indicating the user's current position within a sequence of questions.
 *
 * Shows the current question number, total number of questions, and a visual progress bar reflecting completion percentage.
 *
 * @param currentQuestion - The current question number in the sequence.
 * @param totalQuestions - The total number of questions in the sequence.
 */
export function ProgressBar({
  currentQuestion,
  totalQuestions,
}: ProgressBarProps) {
  const progress = (currentQuestion / totalQuestions) * 100;

  return (
    <div className="mx-auto mb-6 w-full max-w-lg">
      <div className="mb-1 flex justify-between text-sm">
        <span>
          Question {currentQuestion} of {totalQuestions}
        </span>
        <span>{Math.round(progress)}% Complete</span>
      </div>
      <div className="bg-muted h-2 w-full overflow-hidden rounded-full">
        <div
          className="bg-primary h-full transition-all duration-300 ease-in-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
