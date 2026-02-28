import { Card, CardContent, CardHeader } from "@/components/ui/card"
import Skeleton from "@/components/ui/Skeleton"

export default function ReviewScreenLoading() {
    return (
        <div className="w-full">
            <div className="mx-auto w-full max-w-2xl">
                <Card>
                    <CardHeader className="space-y-4">
                        <div className="flex items-center gap-4">
                            <Skeleton variant="circular" className="h-10 w-10 md:h-12 md:w-12" />
                            <div className="space-y-2">
                                <Skeleton className="h-5 w-32 md:h-6 md:w-48" />
                                <Skeleton className="h-3 w-24 md:h-4 md:w-32" />
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-3">
                            <Skeleton className="h-4 w-24" />
                            <div className="flex gap-2">
                                {[...Array(5)].map((_, i) => (
                                    <Skeleton key={i} variant="circular" className="h-8 w-8 md:h-10 md:w-10" />
                                ))}
                            </div>
                        </div>
                        <div className="space-y-3">
                            <Skeleton className="h-4 w-32" />
                            <Skeleton className="h-20 w-full md:h-24" />
                        </div>
                        <div className="space-y-3">
                            <Skeleton className="h-4 w-40" />
                            <div className="space-y-2">
                                {[...Array(3)].map((_, i) => (
                                    <Skeleton key={i} className="h-9 w-full md:h-10" />
                                ))}
                            </div>
                        </div>
                        <Skeleton className="h-9 w-full md:h-10" />
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
