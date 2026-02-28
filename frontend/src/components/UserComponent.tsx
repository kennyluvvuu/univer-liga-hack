import { memo } from "react";
import type { UserI } from "../types/types.ts";
import { Link } from "react-router-dom";
import UserAvatarComponent from "./UserAvatarComponent.tsx";

interface UserComponentProps {
    user: UserI
}

export default memo(function UserComponent({ user }: UserComponentProps) {
    return (
        <Link to={'user/'+user.id}>
            <article className="flex flex-col pl-2 rounded-2xl border-2 border-black">
                <UserAvatarComponent path={user.avatar} />
                <h3>{ user.name }</h3>
                <p>{ user.department }</p>
            </article>
        </Link>
    )
})