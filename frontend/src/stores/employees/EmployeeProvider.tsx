import { EmployeeListContext } from './EmployeeContext.ts'
import { type PropsWithChildren, useState, useMemo, memo } from "react";
import type { EmployeeI } from "../../types/types.ts";

export default memo(function PostProvider({ children }: PropsWithChildren) {
    const [employees, setEmployees] = useState<EmployeeI[]>([
    {
        id: "emp_001",
        name: "Александр Иванов",
        role: "director",
        postition: "Генеральный директор",
        email: "a.ivanov@company.com",
        id_CRM: "CRM-78945",
        avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
        tasks: ["first", "second"]
    },
    {
        id: "emp_002",
        name: "Мария Петрова",
        role: "employee",
        postition: "Менеджер по продажам",
        email: "m.petrova@company.com",
        id_CRM: "CRM-12356",
        avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
        tasks: ["first"]
    },
    {
        id: "emp_003",
        name: "Дмитрий Сидоров",
        role: "employee",
        postition: "Разработчик",
        email: "d.sidorov@company.com",
        id_CRM: "CRM-99887",
        avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
        tasks: ["third", "second"]
    }
])

    const contextValue = useMemo(() => ({ employees, setEmployees }), [employees])

    return (
        <EmployeeListContext value={contextValue}>
            {children}
        </EmployeeListContext>
    )
})