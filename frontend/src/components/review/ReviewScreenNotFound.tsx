import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"

interface ReviewScreenNotFoundProps {
    onBack: () => void
}

export default function ReviewScreenNotFound({ onBack }: ReviewScreenNotFoundProps) {
    return (
        <div className="flex min-h-[60vh] items-center justify-center">
            <Card className="w-full max-w-sm md:max-w-md">
                <CardHeader>
                    <CardTitle className="text-lg md:text-xl">Сотрудник не найден</CardTitle>
                    <CardDescription className="text-sm md:text-base">
                        К сожалению, сотрудник с таким идентификатором не существует.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Button onClick={onBack} variant="outline" className="w-full gap-2">
                        <ArrowLeft className="h-4 w-4" />
                        Назад к списку
                    </Button>
                </CardContent>
            </Card>
        </div>
    )
}
