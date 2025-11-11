import { Slider } from "@/components/ui/slider";

interface SimilaritySliderProps {
  value: number;
  onChange: (value: number) => void;
}

export const SimilaritySlider = ({ value, onChange }: SimilaritySliderProps) => {
  return (
    <div className="w-full max-w-2xl mx-auto space-y-4">
      <div className="flex justify-between items-center">
        <label className="text-sm font-medium">Minimum Similarity Score</label>
        <span className="text-lg font-bold text-primary">{value.toFixed(2)}</span>
      </div>
      <Slider
        value={[value]}
        onValueChange={(values) => onChange(values[0])}
        min={0}
        max={1}
        step={0.01}
        className="w-full"
      />
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>0.00 (Show all)</span>
        <span>1.00 (Exact match)</span>
      </div>
    </div>
  );
};