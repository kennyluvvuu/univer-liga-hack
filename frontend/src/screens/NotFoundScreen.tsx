import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { FileQuestion, ArrowLeft } from "lucide-react"

export default function NotFoundScreen() {
    return (
        <div className="flex min-h-[60vh] items-center justify-center">
            <div className="text-center space-y-4 md:space-y-6">
                <div className="flex justify-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted md:h-24 md:w-24">
                        <FileQuestion className="h-8 w-8 md:h-12 md:w-12 text-muted-foreground" />
                    </div>
                </div>
                <div className="space-y-2">
                    <h1 className="text-4xl font-bold">404</h1>
                    <h2 className="text-lg font-semibold md:text-xl">Страница не найдена</h2>
                    <p className="text-sm text-muted-foreground md:text-base">
                        К сожалению, страница, которую вы ищете, не существует
                    </p>
                </div>
                <Button asChild className="gap-2">
                    <Link to="/">
                        <ArrowLeft className="h-4 w-4" />
                        На главную
                    </Link>
                </Button>
            </div>
        </div>
    )
}
