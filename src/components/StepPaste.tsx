import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Sparkles, Loader2 } from "lucide-react";

interface StepPasteProps {
  rawText: string;
  setRawText: (v: string) => void;
  onExtract: () => void;
  onBack: () => void;
  isExtracting: boolean;
}

export function StepPaste({ rawText, setRawText, onExtract, onBack, isExtracting }: StepPasteProps) {
  return (
    <div className="space-y-5 animate-in fade-in slide-in-from-bottom-3 duration-500">
      <div className="space-y-2">
        <Label className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
          Raw Opportunity Text
        </Label>
        <Textarea
          value={rawText}
          onChange={(e) => setRawText(e.target.value)}
          placeholder="Paste the email, website content, or any text describing the opportunity here..."
          className="min-h-[200px] text-sm leading-relaxed resize-none"
        />
      </div>

      <div className="flex gap-3">
        <Button variant="outline" onClick={onBack} className="h-12 px-4 active:scale-[0.97]">
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <Button
          onClick={onExtract}
          disabled={!rawText.trim() || isExtracting}
          className="flex-1 h-12 text-base font-semibold gap-2 active:scale-[0.97]"
        >
          {isExtracting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" /> Extracting...
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" /> Extract with AI
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
