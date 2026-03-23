import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, AlertTriangle, Send, Loader2, ExternalLink } from "lucide-react";
import { SHEET_TABS } from "@/lib/constants";
import type { OpportunityData } from "@/lib/types";

interface StepReviewProps {
  data: OpportunityData;
  selectedTab: string;
  isDuplicate: boolean;
  onSubmit: () => void;
  onBack: () => void;
  isSubmitting: boolean;
}

export function StepReview({ data, selectedTab, isDuplicate, onSubmit, onBack, isSubmitting }: StepReviewProps) {
  const tabLabel = SHEET_TABS.find((t) => t.id === selectedTab)?.label || selectedTab;

  const fields = [
    { label: "Sheet", value: tabLabel },
    { label: "Title", value: data.title || "—" },
    { label: "Link", value: data.link, isLink: true },
    { label: "Description", value: data.description },
    { label: "Category", value: data.category || "—" },
    { label: "Deadline", value: data.deadline || "—" },
    { label: "Status", value: data.status },
  ];

  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-3 duration-500">
      {isDuplicate && (
        <div className="flex items-start gap-3 p-3 rounded-lg bg-[hsl(var(--warning)/0.1)] border border-[hsl(var(--warning)/0.3)]">
          <AlertTriangle className="w-5 h-5 text-[hsl(var(--warning))] shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-foreground">Duplicate detected</p>
            <p className="text-xs text-muted-foreground mt-0.5">This link already exists in your sheet. You can still add it.</p>
          </div>
        </div>
      )}

      <Card className="shadow-lg shadow-black/[0.03]">
        <CardContent className="p-4 space-y-3">
          {fields.map((f) => (
            <div key={f.label}>
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">{f.label}</p>
              {f.isLink && f.value ? (
                <a href={f.value} target="_blank" rel="noopener noreferrer" className="text-sm text-primary underline underline-offset-2 break-all flex items-center gap-1">
                  {f.value} <ExternalLink className="w-3 h-3 shrink-0" />
                </a>
              ) : (
                <p className="text-sm text-foreground break-words">{f.value}</p>
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="flex gap-3">
        <Button variant="outline" onClick={onBack} className="h-12 px-4 active:scale-[0.97]">
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <Button
          onClick={onSubmit}
          disabled={isSubmitting}
          className="flex-1 h-12 text-base font-semibold gap-2 active:scale-[0.97]"
          variant={isDuplicate ? "destructive" : "default"}
        >
          {isSubmitting ? (
            <><Loader2 className="w-4 h-4 animate-spin" /> Submitting...</>
          ) : isDuplicate ? (
            <><AlertTriangle className="w-4 h-4" /> Add Anyway</>
          ) : (
            <><Send className="w-4 h-4" /> Submit</>
          )}
        </Button>
      </div>
    </div>
  );
}
