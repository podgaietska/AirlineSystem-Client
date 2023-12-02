import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

function Layout({setShowlogin, user, setShowUserTab}){
    return (
        <div className="layout">
            <Header setShowlogin={setShowlogin} user={user} setShowUserTab={setShowUserTab}/>
            <Outlet />
            <Footer />
        </div>
    )
}

export default Layout;