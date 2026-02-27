import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from "./layout/Layout.tsx";
import MainScreen from "./screens/MainScreens.tsx";
import SecuredScreen from "./screens/SecuredScreen.tsx";
import NotFoundScreen from "./screens/NotFoundScreen.tsx";
import AuthScreen from "./screens/AuthScreen.tsx";
import PostScreen from "./screens/PostScreen.tsx";
import ProtectedRoute from "./ProtectedRoute.tsx";

function App() {
  return (
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<Layout />}>
                  <Route index element={<MainScreen />} />
                  <Route path="post/:id" element={<PostScreen />} />
                  <Route path="auth" element={<AuthScreen />} />
                  <Route element={<ProtectedRoute />}>
                      <Route path="secure" element={<SecuredScreen />} />
                  </Route>
                  <Route path="*" element={<NotFoundScreen />} />
              </Route>
          </Routes>
      </BrowserRouter>
  )
}

export default App
