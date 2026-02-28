import { memo, useState, useMemo } from "react"
import EmployeeSearch from "@/components/EmployeeSearch"
import EmployeeListComponent from "@/components/EmployeeListComponent"
import useEmployeeContext from "@/hooks/context/useEmployeeContext"
import { Users } from "lucide-react"

export default memo(function MainScreen() {
    const { employees } = useEmployeeContext()
    const [searchQuery, setSearchQuery] = useState("")

    const filteredEmployees = useMemo(() => {
        if (!searchQuery.trim()) return employees

        const query = searchQuery.toLowerCase()
        return employees.filter(
            (employee) =>
                employee.name.toLowerCase().includes(query) ||
                employee.postition.toLowerCase().includes(query)
        )
    }, [employees, searchQuery])

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Сотрудники</h1>
                    <p className="text-sm text-muted-foreground md:text-base">
                        Список всех сотрудников компании
                    </p>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Users className="h-4 w-4" />
                    <span>{filteredEmployees.length} из {employees.length}</span>
                </div>
            </div>

            <EmployeeSearch
                value={searchQuery}
                onChange={setSearchQuery}
                placeholder="Поиск по имени или должности..."
            />

            {filteredEmployees.length > 0 ? (
                <EmployeeListComponent employees={filteredEmployees} />
            ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                    <Users className="mb-4 h-12 w-12 text-muted-foreground" />
                    <h3 className="text-lg font-semibold">Ничего не найдено</h3>
                    <p className="text-sm text-muted-foreground">
                        Попробуйте изменить поисковый запрос
                    </p>
                </div>
            )}
        </div>
    )
})
