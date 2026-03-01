import { memo, useState } from "react";
import PostListComponent from "../components/UserListComponent.tsx";
import SearchComponent from "@/components/SearchComponent.tsx";

export default memo(function MainScreen() {
    const [searchData, setSearchData] = useState<string>("")

    return (
        <>
            <SearchComponent setSearchData={setSearchData} />
            <PostListComponent searchData={searchData} />
        </>
    )
})