import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

function Layout({setShowlogin}){
    return (
        <div className="layout">
            <Header setShowlogin={setShowlogin}/>
            <Outlet />
            <Footer />
        </div>
    )
}

export default Layout;