
function LoginOverlay({setShowlogin}){
    return(
        <div className="login-overlay">
            <div className="login-overlay-window">
                <button className="close-login-overlay" onClick={() => setShowlogin(false)}>X</button>
                <form action="" className="login-form">
                    <h2>Log In</h2>
                    <div className="membid-login">
                        <label for="membid">Membership Number</label>
                        <input type="text" name="membid" placeholder="Nine-character Memebrship Number"/>
                    </div>
                    <div className="password-login">
                        <label for="passworn">Password</label>
                        <input type="password" name="password" placeholder="Your password"/>
                    </div>
                    <button type="submit" className="login-btn">Log In</button>
                </form>
            </div>
        </div>
    )
}

export default LoginOverlay;