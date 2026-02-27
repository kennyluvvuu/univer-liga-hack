import type {PostI} from "../types/types.ts";
import {Link} from "react-router-dom";

interface PostComponentProps {
    post: PostI
}

export default function PostComponent({ post }: PostComponentProps) {
    return (
        <Link to={'post/'+post.id}>
            <article className="flex flex-col pl-2 rounded-2xl border-2 border-black">
                <h3>{ post.title }</h3>
                <p>{ post.content }</p>
            </article>
        </Link>
    )
}