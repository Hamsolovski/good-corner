import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";


export default function Layout() {
    return (
        <main className="main-content">
            <Header />
            <Outlet />
        </main>
    )
}