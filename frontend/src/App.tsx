import { memo } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from "./layout/Layout.tsx";
import MainScreen from "./screens/MainScreens.tsx";
import NotFoundScreen from "./screens/NotFoundScreen.tsx";
import AuthScreen from "./screens/AuthScreen.tsx";
import ProfileScreen from "./screens/ProfileScreen.tsx";
import ProtectedRoute from "./ProtectedRoute.tsx";
import ReviewScreen from './screens/ReviewScreen.tsx';

function App() {
  return (
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<Layout />}>
                  <Route index element={<MainScreen />} />
                  <Route path="auth" element={<AuthScreen />} />
                  <Route path="profile" element={<ProfileScreen />} />
                  <Route element={<ProtectedRoute />}>
                      <Route path="employee/:id" element={<ReviewScreen />} />
                  </Route>
                  <Route path="*" element={<NotFoundScreen />} />
              </Route>
          </Routes>
      </BrowserRouter>
  )
}

export default memo(App)
