import { memo } from "react";
import PostListComponent from "../components/PostListComponent.tsx";
import InfoBannerComponent from "../components/InfoBannerComponent.tsx";

export default memo(function MainScreen() {
    return (
        <>
            <InfoBannerComponent />
            <PostListComponent />
        </>
    )
})