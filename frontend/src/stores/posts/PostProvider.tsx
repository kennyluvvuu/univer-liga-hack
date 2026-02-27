import { PostListContext } from './PostContext.ts'
import { type PropsWithChildren, useState, useMemo, memo } from "react";
import type { PostI } from "../../types/types.ts";

export default memo(function PostProvider({ children }: PropsWithChildren) {
    const [posts, setPosts] = useState<PostI[]>([
        {
            id: "1",
            title: "First",
            content: "Super duper content"
        },
        {
            id: "2",
            title: "Second",
            content: "Useless content!"
        },
    ])

    const contextValue = useMemo(() => ({ posts, setPosts }), [posts])

    return (
        <PostListContext value={contextValue}>
            {children}
        </PostListContext>
    )
})