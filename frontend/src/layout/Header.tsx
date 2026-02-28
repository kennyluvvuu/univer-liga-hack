import { memo } from "react"
import NavLinks from "@/components/NavLinks"
import UserMenu from "@/components/UserMenu"
import { Building2 } from "lucide-react"

export default memo(function Header() {
    return (
        <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
                <div className="flex items-center gap-2">
                    <Building2 className="h-5 w-5 md:h-6 md:w-6" />
                    <span className="text-base font-semibold md:text-lg">HR Portal</span>
                </div>
                <div className="flex items-center gap-2 md:gap-4">
                    <NavLinks />
                    <UserMenu />
                </div>
            </div>
        </header>
    )
})
