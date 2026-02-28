import { memo } from "react"
import { useNavigate } from "react-router-dom"
import useAuthContext from "@/hooks/context/useAuthContext"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, LogOut } from "lucide-react"
import ProfileHeader from "../components/profile/ProfileHeader"
import ProfileInfo from "../components/profile/ProfileInfo"
import ProfileActions from "../components/profile/ProfileActions"

export default memo(function ProfileScreen() {
    const navigate = useNavigate()
    const { user, logout } = useAuthContext()

    const handleLogout = async () => {
        try {
            await logout()
            navigate("/")
        } catch (error) {
            console.log(error)
        }
    }

    if (!user) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center">
                <Card className="w-full max-w-sm md:max-w-md">
                    <CardHeader>
                        <CardTitle className="text-lg md:text-xl">Требуется авторизация</CardTitle>
                        <CardDescription className="text-sm md:text-base">
                            Пожалуйста, войдите в систему для просмотра профиля
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button asChild className="w-full gap-2">
                            <a href="/auth">
                                <LogOut className="h-4 w-4" />
                                Войти
                            </a>
                        </Button>
                    </CardContent>
                </Card>
            </div>
        )
    }

    return (
        <div className="w-full">
            <div className="mb-4 md:mb-6">
                <Button variant="ghost" onClick={() => navigate(-1)} className="gap-2">
                    <ArrowLeft className="h-4 w-4" />
                    Назад
                </Button>
            </div>

            <div className="mx-auto w-full max-w-2xl space-y-6">
                <ProfileHeader user={user} />
                <Card>
                    <CardContent className="space-y-6">
                        <ProfileInfo user={user} />
                        <ProfileActions onLogout={handleLogout} />
                    </CardContent>
                </Card>
            </div>
        </div>
    )
})
