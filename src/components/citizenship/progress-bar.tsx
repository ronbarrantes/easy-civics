// import { cn } from "@/lib/utils";

interface ProgressBarProps {
  currentQuestion: number;
  totalQuestions: number;
}

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
