import PostListComponent from "../components/PostListComponent.tsx";
import InfoBannerComponent from "../components/InfoBannerComponent.tsx";

export default function MainScreen() {
    return (
        <>
            <InfoBannerComponent />
            <PostListComponent />
        </>
    )
}