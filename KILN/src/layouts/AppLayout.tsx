import Nav from "../components/Nav/Nav.tsx";
import PageLayout from "./PageLayout.tsx";
import {ReactNode} from "react";

interface AppLayoutProps {
  children: ReactNode
}

const AppLayout = ({ children }: AppLayoutProps) => (
  <div className="flex min-h-screen flex-col dark:bg-slate-900 dark:border-slate-100">
    <Nav />
    <main className="flex-1">
      <PageLayout>{children}</PageLayout>
    </main>
  </div>
)

export default AppLayout
