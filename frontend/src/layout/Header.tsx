import { Link } from "react-router-dom";
import LogoutComponent from "../components/LogoutComponent.tsx";

export default function Header() {
    return (
        <header className="flex justify-between border-b-2 mb-5">
            <div className="flex gap-x-1">
                <Link to="/">Home</Link>
                <Link to="/auth">Auth</Link>
            </div>
            <LogoutComponent />
            <Link to="/secure">Secure</Link>
        </header>
    )
}