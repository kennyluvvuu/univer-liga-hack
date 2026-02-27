import {useContext} from "react";
import {PostListContext} from "../../stores/posts/PostContext.ts";

export default function usePostContext() {
    const context = useContext(PostListContext)
    if (!context) throw new Error('usePostContext must be used within context')
    return context
}