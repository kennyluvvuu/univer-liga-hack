import useQueryUsers from "../hooks/useQueryUsers.ts";
import UserComponent from "./UserComponent.tsx";

interface UserListComponentProps {
    searchData: string;
}

export default function UserListComponent({ searchData }: UserListComponentProps) {
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

    const filteredData = data.filter(user =>
      !searchData ||
      user.name?.toLowerCase().includes(searchData.toLowerCase
        ()) ||
     user.department?.toLowerCase().includes(searchData.
        toLowerCase())
     )

    return (
        <section className="flex flex-col gap-y-2">
            {filteredData.map(user => (
                <UserComponent key={user.id} searchData={searchData} user={user} />
            ))}
        </section>
    )
}