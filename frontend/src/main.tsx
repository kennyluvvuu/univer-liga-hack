import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './main.css'
import App from './App.tsx'
import './api/interceptors.ts'
import AuthProvider from "./stores/auth/AuthProvider.tsx";
import ToastProvider from "./stores/toast/ToastProvider.tsx";
import EmployeesProvider from './stores/users/UsersProvider.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <AuthProvider>
          <ToastProvider>
              <EmployeesProvider>
                  <App />
              </EmployeesProvider>
          </ToastProvider>
      </AuthProvider>
  </StrictMode>,
)
