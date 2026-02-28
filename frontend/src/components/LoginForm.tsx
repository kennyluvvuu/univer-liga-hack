import { memo } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LogIn, Loader2 } from "lucide-react"

interface LoginFormProps {
    isSubmitting: boolean
    formData: { email: string; password: string }
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    onSubmit: (e: React.FormEvent) => void
}

export default memo(function LoginForm({
    isSubmitting,
    formData,
    onChange,
    onSubmit,
}: LoginFormProps) {
    return (
        <Card>
            <CardHeader>
                <div className="flex items-center gap-2">
                    <LogIn className="h-5 w-5" />
                    <CardTitle>Вход</CardTitle>
                </div>
                <CardDescription>
                    Введите свои данные для входа в систему
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={onSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="name@example.com"
                            value={formData.email}
                            onChange={onChange}
                            disabled={isSubmitting}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password">Пароль</Label>
                        <Input
                            id="password"
                            name="password"
                            type="password"
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={onChange}
                            disabled={isSubmitting}
                            required
                        />
                    </div>
                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                        {isSubmitting ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Вход...
                            </>
                        ) : (
                            "Войти"
                        )}
                    </Button>
                </form>
            </CardContent>
        </Card>
    )
})
