import { memo } from "react"
import type { EmployeeI } from "../types/types.ts"
import { Link } from "react-router-dom"
import Avatar from "@/components/Avatar"
import { cn } from "@/lib/utils"

interface EmployeeComponentProps {
    employee: EmployeeI
    className?: string
}

export default memo(function EmployeeComponent({ employee, className }: EmployeeComponentProps) {
    return (
        <Link to={"employee/" + employee.id}>
            <article
                className={cn(
                    "flex items-center gap-3 rounded-xl border p-3 transition-colors hover:bg-accent/50",
                    className
                )}
            >
                <Avatar src={employee.avatar} alt={employee.name} size="md" />
                <div className="min-w-0">
                    <h3 className="truncate text-sm font-medium">{employee.name}</h3>
                    <p className="truncate text-xs text-muted-foreground">{employee.postition}</p>
                </div>
            </article>
        </Link>
    )
})