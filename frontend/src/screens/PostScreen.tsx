import { memo, useMemo } from "react";
import { useParams } from "react-router-dom";
import usePostContext from "../hooks/context/usePostContext.ts";

export default memo(function PostScreen() {
    const { id } = useParams()
    const { posts } = usePostContext()

    const post = useMemo(() => posts.find((p) => p.id === id), [posts, id])

    if (!post) return <h1>Пост не найден</h1>

    return (
        <>
            <h1>{ post.title }</h1>
            <p>{ post.content }</p>
        </>
    )
})