import { Link } from "react-router-dom";
import { CiUser } from "react-icons/ci";
import { IoExitOutline } from "react-icons/io5";

function Header({setShowlogin, user, setShowUserTab}){
    return (
        <div className="header">
            <div className="header-inside">
                <div className="branding">
                    <Link to="/"><h1 className="comp-name">Airline</h1></Link>
                </div>
                <div className="navigation">
                    {user ? (
                        <div className="user-in-tab">
                            <CiUser className="user-icon" />
                            <p className="user-name" onClick={() => setShowUserTab(true)}>{user.fname} {user.lname}</p>
                        </div>
                    ) : (
                        <ul className="user-options">
                            <CiUser className="user-icon" />
                            <li className="user-option">
                                <p onClick={() => setShowlogin(true)}>Login</p>
                            </li>
                                <p>|</p>
                            <li className="user-option">
                            <Link to="/register">Register</Link>
                            </li>
                        </ul>
                    )}
                    
                </div>
            </div>
        </div>
    )
}

export default Header;