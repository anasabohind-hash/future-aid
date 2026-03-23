import { useState, useCallback } from "react";
import { StepIndicator } from "@/components/StepIndicator";
import { StepSelect } from "@/components/StepSelect";
import { StepPaste } from "@/components/StepPaste";
import { StepExtracted } from "@/components/StepExtracted";
import { StepReview } from "@/components/StepReview";
import { SHEET_TABS, SHEET_URL } from "@/lib/constants";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { ExternalLink } from "lucide-react";
import type { WizardStep, ExtractionResult, OpportunityData } from "@/lib/types";

export default function Index() {
  const [step, setStep] = useState<WizardStep>(1);
  const [selectedTab, setSelectedTab] = useState("");
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [rawText, setRawText] = useState("");
  const [extracted, setExtracted] = useState<ExtractionResult>({ link: "", description: "", deadline: "" });
  const [isExtracting, setIsExtracting] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDuplicate, setIsDuplicate] = useState(false);

  const handleExtract = useCallback(async () => {
    setIsExtracting(true);
    try {
      const { data, error } = await supabase.functions.invoke("extract-opportunity", {
        body: { text: rawText },
      });
      if (error) throw error;
      setExtracted({
        link: data.link || "",
        description: data.description || "",
        deadline: data.deadline || "",
      });
      setStep(3);
    } catch (e: any) {
      toast({ title: "Extraction failed", description: e.message || "Try again", variant: "destructive" });
    } finally {
      setIsExtracting(false);
    }
  }, [rawText]);

  const checkDuplicate = useCallback(async () => {
    if (!extracted.link) return false;
    try {
      const sheetName = SHEET_TABS.find((t) => t.id === selectedTab)?.sheet || "";
      const { data: rows, error } = await supabase.functions.invoke("google-sheet-proxy", {
        body: { action: "getRows", sheet: sheetName },
      });
      if (error) throw error;
      if (Array.isArray(rows)) {
        return rows.some((row: string[]) => row[1] === extracted.link);
      }
      return false;
    } catch (e) {
      console.error("Duplicate check failed:", e);
      return false;
    }
  }, [selectedTab, extracted.link]);

  const handleGoToReview = useCallback(async () => {
    const dup = await checkDuplicate();
    setIsDuplicate(dup);
    setStep(4);
  }, [checkDuplicate]);

  const handleSubmit = useCallback(async () => {
    setIsSubmitting(true);
    const sheetName = SHEET_TABS.find((t) => t.id === selectedTab)?.sheet || "";
    const payload: OpportunityData = {
      title,
      link: extracted.link,
      description: extracted.description,
      category,
      deadline: extracted.deadline,
      status: "Not Yet",
    };
    try {
      const { data, error } = await supabase.functions.invoke("google-sheet-proxy", {
        body: { action: "appendRow", sheet: sheetName, data: payload },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      toast({
        title: "✅ Saved!",
        description: "Opportunity added to your sheet.",
        action: (
          <a href={SHEET_URL} target="_blank" rel="noopener noreferrer" className="text-primary underline text-xs flex items-center gap-1">
            View Sheet <ExternalLink className="w-3 h-3" />
          </a>
        ),
      });
      // Reset
      setStep(1);
      setSelectedTab("");
      setCategory("");
      setTitle("");
      setRawText("");
      setExtracted({ link: "", description: "", deadline: "" });
      setIsDuplicate(false);
    } catch (e: any) {
      toast({ title: "Submit failed", description: e.message, variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  }, [selectedTab, title, extracted, category]);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-md mx-auto px-4 pb-24">
        {/* Header */}
        <header className="pt-6 pb-2 text-center">
          <h1 className="text-xl font-bold text-foreground tracking-tight">Opportunity Tracker</h1>
          <p className="text-xs text-muted-foreground mt-1">Capture & organize opportunities with AI</p>
        </header>

        <StepIndicator current={step} />

        <div className="mt-2">
          {step === 1 && (
            <StepSelect
              selectedTab={selectedTab} setSelectedTab={setSelectedTab}
              category={category} setCategory={setCategory}
              title={title} setTitle={setTitle}
              onNext={() => setStep(2)}
            />
          )}
          {step === 2 && (
            <StepPaste
              rawText={rawText} setRawText={setRawText}
              onExtract={handleExtract}
              onBack={() => setStep(1)}
              isExtracting={isExtracting}
            />
          )}
          {step === 3 && (
            <StepExtracted
              data={extracted} onChange={setExtracted}
              onNext={handleGoToReview}
              onBack={() => setStep(2)}
            />
          )}
          {step === 4 && (
            <StepReview
              data={{ title, link: extracted.link, description: extracted.description, category, deadline: extracted.deadline, status: "Not Yet" }}
              selectedTab={selectedTab}
              isDuplicate={isDuplicate}
              onSubmit={handleSubmit}
              onBack={() => setStep(3)}
              isSubmitting={isSubmitting}
            />
          )}
        </div>
      </div>

      {/* Floating Sheet Button */}
      <a
        href={SHEET_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-accent text-accent-foreground w-14 h-14 rounded-full flex items-center justify-center shadow-lg shadow-accent/25 hover:shadow-xl hover:shadow-accent/30 active:scale-[0.95] transition-all duration-200"
        aria-label="View Google Sheet"
      >
        <ExternalLink className="w-5 h-5" />
      </a>
    </div>
  );
}
