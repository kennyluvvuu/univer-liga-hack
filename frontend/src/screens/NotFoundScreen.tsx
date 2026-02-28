import { Link } from "react-router-dom";

export default function NotFoundScreen() {
    return (
        <>
            <section className="flex flex-col gap-y-5">
                <h1 className="text-6xl">This page doesnt exist!</h1>
                <Link to="/" className="underline">Back to Home</Link>
            </section>
        </>
    )
}