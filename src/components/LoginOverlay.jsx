import { useState } from "react";
import {useNavigate, useLocation} from "react-router-dom";

function LoginOverlay({setShowlogin, login, loginAsAgent, setLoginAsAgent, loginAgent}){
    const [email, setEmail] = useState("");
    const [employeeId, setEmployeeId] = useState();
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const location = useLocation();


    const onLogin = (e) => {
        e.preventDefault();
        if (loginAsAgent){
            loginAgent(employeeId, password, navigate, location);
        } else{
            login(email, password, navigate, location);

        }
    }


    return(
        <div className="login-overlay">
            <div className="login-overlay-window">
                <button className="close-login-overlay" onClick={() => setShowlogin(false)}>X</button>
                <form action="" className="login-form" onSubmit={onLogin}>
                    <h2>Log In</h2>
                    {loginAsAgent ? (
                        <div className="membid-login">
                            <label for="employeeid">Employee Id</label>
                            <input type="number" name="employeeid" placeholder="Your Employee Id" value={employeeId} onChange={(e) => setEmployeeId(e.target.value)}/>
                        </div>
                        ):(
                        <div className="membid-login">
                            <label for="email">Email</label>
                            <input type="text" name="email" placeholder="Your Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                        </div>
                        )}
                    <div className="password-login">
                        <label for="passworn">Password</label>
                        <input type="password" name="password" placeholder="Your password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                    <button type="submit" className="login-btn">Log In</button>
                    {loginAsAgent ? (
                        <p className="login-method" onClick={() => setLoginAsAgent(false)}>Login as a user</p>

                    ):(
                        <p className="login-method" onClick={() => setLoginAsAgent(true)}>Login as an Airline Agents</p>
                    )}
                </form>
            </div>
        </div>
    )
}

export default LoginOverlay;