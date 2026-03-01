import { memo } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from "./layout/Layout.tsx";
import MainScreen from "./screens/MainScreens.tsx";
import NotFoundScreen from "./screens/NotFoundScreen.tsx";
import PostScreen from "./screens/ReviewScreen.tsx";
import ProtectedRoute from "./ProtectedRoute.tsx";
import ProfileScreen from './screens/ProfileScreen.tsx';
import LoginScreen from './screens/LoginScreen.tsx';
import AnalyticsScreen from './screens/AnalyticsScreen.tsx';
import EmployeesScreen from './screens/EmployeesScreen.tsx';
import EmployeeReviewsScreen from './screens/EmployeeReviewsScreen.tsx';
import DirectorRoute from './DirectorRoute.tsx';

function App() {
  return (
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<Layout />}>
                  <Route path="auth" element={<LoginScreen />} />

                  <Route element={<ProtectedRoute />}>
                    <Route index element={<MainScreen />} />
                    <Route path="user/:id" element={<PostScreen />} />
                    <Route path='profile' element={<ProfileScreen />} />
                  </Route>

                  <Route element={<DirectorRoute />}>
                    <Route path='director' element={<AnalyticsScreen />} />
                    <Route path='employees' element={<EmployeesScreen />} />
                    <Route path='employees/:id' element={<EmployeeReviewsScreen />} />
                  </Route>

                  <Route path="*" element={<NotFoundScreen />} />
              </Route>
          </Routes>
      </BrowserRouter>
  )
}

export default memo(App)
