import { memo } from "react";
import useQueryUsers from "../hooks/useQueryUsers.ts";
import UserComponent from "./UserComponent.tsx";

export default memo(function UserListComponent() {
    const { data, isError, isLoading } = useQueryUsers()

    if (isLoading) {
        return <div className="text-center">Loading users...</div>
    }

    if (!data || data.length === 0) {
        return <div className="text-center">No users found</div>
    }

    if (isError) {
        return <div className="text-center text-red-500">Error loading users</div>
    }

    return (
        <section className="flex flex-col gap-y-2">
            {data.map(user => (
                <UserComponent key={user.id} user={user} />
            ))}
        </section>
    )
})