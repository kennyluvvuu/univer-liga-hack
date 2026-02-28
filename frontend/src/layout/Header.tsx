import { memo } from "react";
import { Link } from "react-router-dom";
import LogoutComponent from "../components/LogoutComponent.tsx";

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