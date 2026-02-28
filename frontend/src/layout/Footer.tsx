import { memo } from "react"
import { Building2 } from "lucide-react"

export default memo(function Footer() {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="w-full border-t bg-muted/40">
            <div className="container mx-auto px-4 py-6 md:px-6 md:py-8">
                <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                    <div className="flex items-center gap-2">
                        <Building2 className="h-4 w-4 md:h-5 md:w-5" />
                        <span className="text-sm font-semibold md:text-base">HR Portal</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                        © {currentYear} HR Portal. Все права защищены.
                    </p>
                </div>
            </div>
        </footer>
    )
})
