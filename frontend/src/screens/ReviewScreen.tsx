import useQueryUsers from "@/hooks/useQueryUsers";
import { memo, useMemo } from "react";
import { useParams } from "react-router-dom";

export default memo(function ReviewScreen() {
    const { id } = useParams()
    const { data: users = [], isLoading, isError } = useQueryUsers()

    const user = useMemo(() => users.find((user) => user.id === id), [users, id])

    if (isLoading) return <h1>Загрузка...</h1>

    if(isError) return <h1>Ошибка при загрузки данных</h1>

    if (!user) return <h1>Пост не найден</h1>

    return (
        <>
            <h1>{ user.name }</h1>
            <p>{ user.department }</p>
        </>
    )
})
