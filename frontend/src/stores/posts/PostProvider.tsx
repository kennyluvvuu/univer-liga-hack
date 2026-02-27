import {PostListContext} from './PostContext.ts'
import {type PropsWithChildren, useState} from "react";
import type {PostI} from "../../types/types.ts";

export default function PostProvider({ children }: PropsWithChildren) {
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

    return (
        <PostListContext value={{ posts, setPosts }}>
            { children }
        </PostListContext>
    )
}