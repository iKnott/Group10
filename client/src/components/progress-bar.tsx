import { cn } from "@/lib/utils";

interface ProgressBarProps {
  current: number;
  total: number;
  className?: string;
}

export function ProgressBar({ current, total, className }: ProgressBarProps) {
  const percentage = (current / total) * 100;
  
  return (
    <div className={cn("w-full", className)}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">
          Question <span data-testid="current-question">{current}</span> of <span data-testid="total-questions">{total}</span>
        </h2>
        <div className="text-sm text-muted-foreground">
          <span data-testid="progress-percentage">{Math.round(percentage)}%</span> complete
        </div>
      </div>
      <div className="w-full bg-secondary rounded-full h-2">
        <div 
          className="bg-primary h-2 rounded-full transition-all duration-300" 
          style={{ width: `${percentage}%` }}
          data-testid="progress-bar"
        />
      </div>
    </div>
  );
}
