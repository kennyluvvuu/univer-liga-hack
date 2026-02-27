// import {type PropsWithChildren, useState} from "react";
// import {NotificationContext, type NotificationType} from "./NotificationContext.ts";
//
// export default function NotificationProvider({children}: PropsWithChildren) {
//     const [message, setMessage] = useState<string>("");
//     const [type, setType] = useState<NotificationType | null>(null)
//
//     return (
//         <NotificationContext value={{message, type}}>
//             { children }
//         </NotificationContext>
//     )
// }