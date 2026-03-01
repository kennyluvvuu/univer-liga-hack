import { memo } from "react";
import Header from "./Header.tsx";
import Footer from "./Footer.tsx";
import { Outlet } from "react-router-dom";

export default memo(function Layout() {
    return (
        <>
            <Header />
            <main className="flex-1 w-[60%] mx-auto">
                <Outlet />
            </main>
            <Footer />
        </>
    )
})