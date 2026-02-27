import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './main.css'
import App from './App.tsx'
import PostProvider from "./stores/posts/PostProvider.tsx";
import './api/interceptors.ts'
import AuthProvider from "./stores/auth/AuthProvider.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <AuthProvider>
          <PostProvider>
              <App />
          </PostProvider>
      </AuthProvider>
  </StrictMode>,
)
