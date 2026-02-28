import { memo } from "react";
import PostListComponent from "../components/UserListComponent.tsx";

export default memo(function MainScreen() {
    return (
        <>
            <PostListComponent />
        </>
    )
})