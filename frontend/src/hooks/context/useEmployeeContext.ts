import {useContext} from "react";
import {EmployeeListContext} from "../../stores/employees/EmployeeContext.ts";

export default function useEmployeeContext() {
    const context = useContext(EmployeeListContext)
    if (!context) throw new Error('useEmployeeContext must be used within context')
    return context
}