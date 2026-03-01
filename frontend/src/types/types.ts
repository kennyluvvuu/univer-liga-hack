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

export interface TaskI {
    id: string
    userId: string
    title: string
    desc: string
}

export interface ReviewTagI {
    title: string
    type: "positive" | "negative"
    id: string
} 

export interface ReviewI {
    id: string
    recipientId: string
    senderId: string
    taskId: string
    score: number
    tags: ReviewTagI[]
    comment: string
}

export interface CreateReviewDto {
    recipientId: string
    senderId: string
    taskId: string
    score: number
    tags: ReviewTagI[]
    comment: string
}