import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { ExtractionResult } from "@/lib/types";

interface StepExtractedProps {
  data: ExtractionResult;
  onChange: (d: ExtractionResult) => void;
  onNext: () => void;
  onBack: () => void;
}

export function StepExtracted({ data, onChange, onNext, onBack }: StepExtractedProps) {
  return (
    <div className="space-y-5 animate-in fade-in slide-in-from-bottom-3 duration-500">
      <div className="space-y-2">
        <Label className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Link</Label>
        <Input
          value={data.link}
          onChange={(e) => onChange({ ...data, link: e.target.value })}
          placeholder="https://..."
        />
      </div>

      <div className="space-y-2">
        <Label className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Short Description</Label>
        <Textarea
          value={data.description}
          onChange={(e) => onChange({ ...data, description: e.target.value })}
          placeholder="Brief summary..."
          className="min-h-[80px] resize-none"
        />
      </div>

      <div className="space-y-2">
        <Label className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Deadline</Label>
        <Input
          type="date"
          value={data.deadline}
          onChange={(e) => onChange({ ...data, deadline: e.target.value })}
        />
      </div>

      <div className="flex gap-3">
        <Button variant="outline" onClick={onBack} className="h-12 px-4 active:scale-[0.97]">
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <Button
          onClick={onNext}
          className="flex-1 h-12 text-base font-semibold gap-2 active:scale-[0.97]"
        >
          Review <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
