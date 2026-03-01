import useAuthContext from "@/hooks/context/useAuthContext"
import { Navigate } from "react-router-dom"

export default function AnalyticsScreen() {
    const { user } = useAuthContext()

    if (!user || user.role !== "director") return <Navigate to="/" />

    return (
        <>
            <h1>Analytics Screen</h1>
        </>
    )
}