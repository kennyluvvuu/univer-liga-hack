import { cn } from "@/lib/utils"
import { User } from "lucide-react"

interface AvatarProps {
    src?: string
    alt?: string
    size?: "sm" | "md" | "lg"
    className?: string
}

const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-12 w-12",
}

export default function Avatar({ src, alt = "Avatar", size = "md", className }: AvatarProps) {
    if (src) {
        return (
            <div
                className={cn(
                    "relative flex shrink-0 overflow-hidden rounded-full",
                    sizeClasses[size],
                    className
                )}
            >
                <img
                    src={src}
                    alt={alt}
                    className="aspect-square h-full w-full object-cover"
                />
            </div>
        )
    }

    return (
        <div
            className={cn(
                "relative flex shrink-0 overflow-hidden rounded-full bg-muted",
                sizeClasses[size],
                className
            )}
        >
            <div className="flex h-full w-full items-center justify-center text-muted-foreground">
                <User className="h-1/2 w-1/2" />
            </div>
        </div>
    )
}
