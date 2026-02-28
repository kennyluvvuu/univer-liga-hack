export type UserRoleI = "employee" | "director"

export type UserAvatarI = string | null

export interface UserI {
    id: string
    name: string
    role: UserRoleI
    department: string
    email: string
    avatar: UserAvatarI
}

export interface CredentialsI {
    email: string
    password: string
}