import UserAvatarComponent from "@/components/UserAvatarComponent"
import useQueryUser from "@/hooks/useQueryUser"

export default function ProfileScreen() {
    const { data: user, isLoading } = useQueryUser()

    if (isLoading) return (
        <>
            loading...
        </>
    )

    if (!user) return (
        <>
            no data
        </>
    )

    return (
        <>  
            <UserAvatarComponent path={user.avatar} />
            <h2>{ user.name }</h2>
            <p>{ user.role }</p>
        </>
    )
}