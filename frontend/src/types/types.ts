export interface PostI {
    title: string
    content: string
    id: string
}

export interface UserI {
    id?: string
    email: string
}

export interface UserCredentials {
    email: string
    password: string
}