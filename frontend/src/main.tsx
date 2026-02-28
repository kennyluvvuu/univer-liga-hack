import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './main.css'
import App from './App.tsx'
import PostProvider from "./stores/employees/EmployeeProvider.tsx";
import './api/interceptors.ts'
import AuthProvider from "./stores/auth/AuthProvider.tsx";
import ToastProvider from "./stores/toast/ToastProvider.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <AuthProvider>
          <ToastProvider>
              <PostProvider>
                  <App />
              </PostProvider>
          </ToastProvider>
      </AuthProvider>
  </StrictMode>,
)
