import { SHEET_TABS, CATEGORIES } from "@/lib/constants";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

interface StepSelectProps {
  selectedTab: string;
  setSelectedTab: (v: string) => void;
  category: string;
  setCategory: (v: string) => void;
  title: string;
  setTitle: (v: string) => void;
  onNext: () => void;
}

export function StepSelect({
  selectedTab, setSelectedTab, category, setCategory, title, setTitle, onNext,
}: StepSelectProps) {
  const cats = CATEGORIES[selectedTab] || [];
  const needsCategory = cats.length > 0;
  const canProceed = selectedTab && (!needsCategory || category);

  return (
    <div className="space-y-5 animate-in fade-in slide-in-from-bottom-3 duration-500">
      <div className="space-y-2">
        <Label className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Target Sheet</Label>
        <div className="grid grid-cols-2 gap-2">
          {SHEET_TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => { setSelectedTab(tab.id); setCategory(""); }}
              className={cn(
                "px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 text-left",
                "active:scale-[0.97]",
                selectedTab === tab.id
                  ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                  : "bg-card text-card-foreground border border-border hover:border-primary/30 hover:shadow-sm"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {needsCategory && (
        <div className="space-y-2 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <Label className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Category</Label>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger>
              <SelectValue placeholder="Choose a category" />
            </SelectTrigger>
            <SelectContent>
              {cats.map((c) => (
                <SelectItem key={c} value={c}>{c}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      <div className="space-y-2">
        <Label className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Title <span className="text-muted-foreground/60">(optional)</span></Label>
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Opportunity name"
        />
      </div>

      <Button
        onClick={onNext}
        disabled={!canProceed}
        className="w-full h-12 text-base font-semibold gap-2"
      >
        Continue <ArrowRight className="w-4 h-4" />
      </Button>
    </div>
  );
}
