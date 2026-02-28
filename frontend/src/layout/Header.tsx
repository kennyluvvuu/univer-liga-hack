import { memo } from "react"
import NavLinks from "@/components/NavLinks"
import UserMenu from "@/components/UserMenu"
import { Building2 } from "lucide-react"

export default memo(function Header() {
    return (
        <header className="flex justify-between border-b-2 mb-5">
            <Link to="/">Home</Link>
            <nav>
                <Link to="/profile">Profile</Link>
                <LogoutComponent />
            </nav>
        </header>
    )
})
