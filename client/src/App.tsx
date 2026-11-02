import { createBrowserRouter, Navigate, RouterProvider } from "react-router"
import Layout from "./components/Layout"
import { AuthProvider, useAuth } from "./context/AuthContext"
import Overview from "./pages/Overview"
import RetrieverEssentials from "./pages/RetrieverEssentials"
import AccountPage from "./pages/AccountPage"
import AdminUsers from "./pages/AdminUsers"
import AuthPage from "./pages/AuthPage"

function ProtectedLayout() {
  const { user } = useAuth()
  return user ? <Layout /> : <Navigate to="/" replace />
}

function AdminRoute() {
  const { user } = useAuth()
  return user?.role === "Administrator" ? (
    <AdminUsers />
  ) : (
    <Navigate to="/dashboard" replace />
  )
}

const router = createBrowserRouter([
  { path: "/", element: <AuthPage mode="login" /> },
  { path: "/create-account", element: <AuthPage mode="create" /> },
  {
    Component: ProtectedLayout,
    children: [
      { path: "/dashboard", Component: Overview },
      { path: "/retriever-essentials", Component: RetrieverEssentials },
      { path: "/account/:section", Component: AccountPage },
      { path: "/admin/users", Component: AdminRoute },
    ],
  },
  { path: "*", element: <Navigate to="/" replace /> },
])

export default function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  )
}
