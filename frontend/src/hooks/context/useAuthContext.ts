import {useContext} from "react";
import {AuthContext} from "../../stores/auth/AuthContext.ts";

export default function useAuthContext() {
    const context = useContext(AuthContext)
    if (!context) throw new Error('useAuthContext must be defined')
    return context
}