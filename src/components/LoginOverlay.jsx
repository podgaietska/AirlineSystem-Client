import { useState } from "react";

function LoginOverlay({setShowlogin, login}){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const onLogin = (e) => {
        e.preventDefault();
        console.log("Logging in");
        console.log(email, password);
        login(email, password);
    }


    return(
        <div className="login-overlay">
            <div className="login-overlay-window">
                <button className="close-login-overlay" onClick={() => setShowlogin(false)}>X</button>
                <form action="" className="login-form" onSubmit={onLogin}>
                    <h2>Log In</h2>
                    <div className="membid-login">
                        <label for="email">Email</label>
                        <input type="text" name="email" placeholder="Your Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                    <div className="password-login">
                        <label for="passworn">Password</label>
                        <input type="password" name="password" placeholder="Your password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                    <button type="submit" className="login-btn">Log In</button>
                </form>
            </div>
        </div>
    )
}

export default LoginOverlay;