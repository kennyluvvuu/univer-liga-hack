import { memo } from "react"
import Header from "./Header"
import Footer from "./Footer"
import { Outlet } from "react-router-dom"

export default memo(function Layout() {
    return (
        <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1 w-full">
                <div className="container mx-auto w-full px-4 py-6 md:px-6 md:py-8">
                    <Outlet />
                </div>
            </main>
            <Footer />
        </div>
    )
})
