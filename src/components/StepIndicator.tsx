import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import type { WizardStep } from "@/lib/types";

const steps = [
  { num: 1, label: "Select" },
  { num: 2, label: "Paste" },
  { num: 3, label: "Extract" },
  { num: 4, label: "Review" },
] as const;

interface StepIndicatorProps {
  current: WizardStep;
}

export function StepIndicator({ current }: StepIndicatorProps) {
  return (
    <div className="flex items-center justify-between px-2 py-4">
      {steps.map((step, i) => {
        const isDone = current > step.num;
        const isActive = current === step.num;
        return (
          <div key={step.num} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center gap-1">
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-all duration-300",
                  isDone && "bg-accent text-accent-foreground",
                  isActive && "bg-primary text-primary-foreground shadow-md shadow-primary/25",
                  !isDone && !isActive && "bg-muted text-muted-foreground"
                )}
              >
                {isDone ? <Check className="w-4 h-4" /> : step.num}
              </div>
              <span
                className={cn(
                  "text-[10px] font-medium transition-colors duration-300",
                  isActive ? "text-primary" : isDone ? "text-accent" : "text-muted-foreground"
                )}
              >
                {step.label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div
                className={cn(
                  "flex-1 h-0.5 mx-2 rounded-full transition-colors duration-300",
                  isDone ? "bg-accent" : "bg-muted"
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
