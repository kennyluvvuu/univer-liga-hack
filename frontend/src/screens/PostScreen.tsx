import {useParams} from "react-router-dom";
import usePostContext from "../hooks/context/usePostContext.ts";

export default function PostScreen() {
    const { id } = useParams()
    const { posts } = usePostContext()

    const post = posts.find((p) => p.id === id)

    if (!post) return <h1>Пост не найден</h1>

    return (
        <>
            <h1>{ post.title }</h1>
            <p>{ post.content }</p>
        </>
    )
}