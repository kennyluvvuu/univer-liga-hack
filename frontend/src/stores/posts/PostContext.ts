import {createContext, type Dispatch, type SetStateAction} from "react";
import type {PostI} from "../../types/types.ts";

export interface PostContextI {
    posts: PostI[]
    setPosts: Dispatch<SetStateAction<PostI[]>>
}

export const PostListContext = createContext<PostContextI | null>(null)