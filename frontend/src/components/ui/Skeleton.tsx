import { cn } from "@/lib/utils"

interface SkeletonProps {
    className?: string
    variant?: "circular" | "rounded" | "text"
}

export default function Skeleton({ className, variant = "rounded" }: SkeletonProps) {
    return (
        <div
            className={cn(
                "animate-pulse bg-muted",
                variant === "circular" && "rounded-full",
                variant === "rounded" && "rounded-md",
                variant === "text" && "rounded-md h-4",
                className
            )}
        />
    )
}
