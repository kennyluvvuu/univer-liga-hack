import { memo } from "react";
import PostListComponent from "../components/UserListComponent.tsx";

export default memo(function MainScreen() {
    const { employees } = useEmployeeContext()
    const [searchQuery, setSearchQuery] = useState("")

    const filteredEmployees = useMemo(() => {
        if (!searchQuery.trim()) return employees

        const query = searchQuery.toLowerCase()
        return employees.filter(
            (employee) =>
                employee.name.toLowerCase().includes(query) ||
                employee.postition.toLowerCase().includes(query)
        )
    }, [employees, searchQuery])

    return (
        <>
            <PostListComponent />
        </>
    )
})
