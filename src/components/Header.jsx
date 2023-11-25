import { Link } from "react-router-dom";
import { CiUser } from "react-icons/ci";

function Header({setShowlogin}){
    return (
        <div className="header">
            <div className="header-inside">
                <div className="branding">
                    <Link to="/"><h1 className="comp-name">Airline</h1></Link>
                </div>
                <div className="navigation">
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
                </div>
            </div>
        </div>
    )
}

export default Header;