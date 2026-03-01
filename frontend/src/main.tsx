import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './main.css'
import App from './App.tsx'
import AuthProvider from "./stores/auth/AuthProvider.tsx";
import ToastProvider from "./stores/toast/ToastProvider.tsx";
import UsersProvider from './stores/users/UsersProvider.tsx';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <UsersProvider>
            <AuthProvider>
                <ToastProvider>
                    <App />
                </ToastProvider>
            </AuthProvider>
        </UsersProvider> 
    </StrictMode>,
)
