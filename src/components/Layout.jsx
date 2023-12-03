import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import MemberInfo from "./MemberInfo";
import LoginOverlay from "./LoginOverlay";

function Layout({setShowlogin, user, setShowUserTab, showUserTab, logout, getBookings, showlogin, login, loginAsAgent, setLoginAsAgent, loginAgent, getAllFlights}){
    return (
        <div className="layout">
            <Header setShowlogin={setShowlogin} user={user} setShowUserTab={setShowUserTab}/>
            <Outlet />
            {showUserTab && <MemberInfo setShowUserTab={setShowUserTab} user={user} logout={logout} getBookings={getBookings} loginAsAgent={loginAsAgent} getAllFlights={getAllFlights}/>}
            {showlogin && <LoginOverlay setShowlogin={setShowlogin} login={login} loginAsAgent={loginAsAgent} setLoginAsAgent={setLoginAsAgent} loginAgent={loginAgent} />}
            <Footer />
        </div>
    )
}

export default Layout;