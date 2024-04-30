import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Main from "./Main/Main.tsx";
import AppLayout from "../layouts/AppLayout.tsx";



export interface RouteConfig {
  path: string
  label: string
  component: React.ComponentType
  nav: boolean
}

export const routes: RouteConfig[] = [
  {
    path: '/',
    label: 'Transfer',
    component: Main,
    nav: true,
  },
]

function AppRoutes() {
  return (
    <Routes>
      {routes.map((route) => {
        const Page = route.component
        return <Route key={route.path} path={route.path} element={<Page />} />
      })}
    </Routes>
  )
}

function Router() {
  return (
    <BrowserRouter>
      <AppLayout>
        <AppRoutes />
      </AppLayout>
    </BrowserRouter>
  )
}

export default Router
