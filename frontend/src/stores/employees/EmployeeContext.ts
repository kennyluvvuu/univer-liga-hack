import {createContext, type Dispatch, type SetStateAction} from "react";
import type {EmployeeI} from "../../types/types.ts";

export interface EmployeeContextI {
    employees: EmployeeI[]
    setEmployees: Dispatch<SetStateAction<EmployeeI[]>>
}

export const EmployeeListContext = createContext<EmployeeContextI | null>(null)