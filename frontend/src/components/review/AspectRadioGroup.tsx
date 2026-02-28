import { memo } from "react"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { cn } from "@/lib/utils"
import type { LucideIcon } from "lucide-react"

interface Aspect {
    id: string
    label: string
}

interface AspectRadioGroupProps {
    label: string
    icon: LucideIcon
    options: Aspect[]
    value: string
    onChange: (value: string) => void
    error?: string
}

export default memo(function AspectRadioGroup({
    label,
    icon: Icon,
    options,
    value,
    onChange,
    error,
}: AspectRadioGroupProps) {
    return (
        <div className="space-y-3">
            <Label className="flex items-center gap-2">
                <Icon className="h-4 w-4" />
                {label}
            </Label>
            <RadioGroup value={value} onValueChange={onChange} className="grid gap-2">
                {options.map((option) => (
                    <Label
                        key={option.id}
                        className={cn(
                            "flex cursor-pointer items-center justify-between rounded-lg border p-3 transition-colors",
                            value === option.id
                                ? "border-primary bg-accent"
                                : "hover:bg-accent/50"
                        )}
                    >
                        <div className="flex items-center gap-3">
                            <RadioGroupItem value={option.id} />
                            <span className="text-sm">{option.label}</span>
                        </div>
                    </Label>
                ))}
            </RadioGroup>
            {error && <p className="text-sm text-destructive">{error}</p>}
        </div>
    )
})
