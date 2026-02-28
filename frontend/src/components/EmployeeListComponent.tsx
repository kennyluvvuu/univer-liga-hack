import { memo } from "react"
import type { EmployeeI } from "@/types/types"
import EmployeeComponent from "./EmployeeComponent"

interface EmployeeListComponentProps {
    employees: EmployeeI[]
}

export default memo(function EmployeeListComponent({ employees }: EmployeeListComponentProps) {
    return (
        <section className="grid gap-3">
            {employees.map((employee) => (
                <EmployeeComponent key={employee.id} employee={employee} />
            ))}
        </section>
    )
})