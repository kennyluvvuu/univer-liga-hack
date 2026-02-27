import { memo } from "react";
import usePostContext from "../hooks/context/usePostContext.ts";
import PostComponent from "./PostComponent.tsx";

export default memo(function PostListComponent() {
    const { posts } = usePostContext()

    return (
        <section className="flex flex-col gap-y-2">
            {posts.map(post => (
                <PostComponent key={post.id} post={post} />
            ))}
        </section>
    )
})