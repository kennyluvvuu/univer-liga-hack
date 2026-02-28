export interface EmployeeI {
    id: string
    name: string
    role: "employee" | "director"
    postition: string
    email: string
    id_CRM: string
    avatar: string
    tasks: string[]
}

export interface CredentialsI {
    email: string
    password: string
}

export interface TaskI {
    title: string
    description: string
    
}