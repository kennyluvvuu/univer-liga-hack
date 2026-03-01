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
} 

export interface ReviewI {
    id: string
    recipientId: string
    senderId: string
    taskId: string
    score: number
    tags: ReviewTagI[]
    comment: string
    date: string
}

export interface CreateReviewDto {
    recipientId: string
    senderId: string
    taskId: string
    score: number
    tags: ReviewTagI[]
    comment: string
}

export interface FilterI {
    startPeriod: string
    endPeriod: string
    department: string
    employee: string
}

export interface MyReviewI {
    id: string
    recipientName: string
    comment: string
    score: number
    tags: ReviewTagI[]
    taskTitle: string
    date: string 
}


export interface AnalyticsStatsI {
    total: number
    positive: number
    negative: number
    neutral: number
    index: number
    avgScore: number
}

export interface AnalyticsByMonthI extends AnalyticsStatsI {
    month: string        // "YYYY-MM"
}

export interface AnalyticsByTagI extends AnalyticsStatsI {
    title: string
    type: "positive" | "negative"
}

export interface AnalyticsByEmployeeI extends AnalyticsStatsI {
    id: string
    name: string
    department: string
    avatar: string | null
    topTags: string[]
}

export interface AnalyticsByDepartmentI extends AnalyticsStatsI {
    department: string
}

export interface AnalyticsResponseI {
    summary: AnalyticsStatsI
    byMonth: AnalyticsByMonthI[]
    byTag: AnalyticsByTagI[]
    byEmployee: AnalyticsByEmployeeI[]
    byDepartment: AnalyticsByDepartmentI[]
}