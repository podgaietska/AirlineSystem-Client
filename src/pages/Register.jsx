function Register({setShowlogin}){
    return(
        <div className="reg-pg">
            <div className="reg-page-container">
                <div className="reg-text">
                    <h1>Sign up and take off</h1>
                    <p>Creting an account saves you time when booking a flight. And if you become a Registered Customer, you will also be able to enjoy exclusive perks and priveledges. It only takes a minute!</p>
                    <p>Already a registered member? <span className="link" onClick={() => setShowlogin(true)}>Login</span> Here</p>
                </div>
                <form className="registartion-form">
                    <div className="signup-info">
                        <h3>Fill in your information</h3>
                        <p>Please complete all the fields marked with *</p>
                        <div className="row registration">
                            <div className="name-reg">
                                <label for="first-name">First / Given name (as in passport)*</label>
                                <input type="text" name="first-name" />
                            </div>
                            <div className="name-reg">
                                <label for="last-name">Last / Family name (as in passport)*</label>
                                <input type="text" name="last-name" />
                            </div>
                        </div>
                        <div className="row registration">
                            <div className="bd-reg">
                                <label for="birthday">Date of birth (as in passport)*</label>
                                <input type="date" name="birthday" />
                            </div>
                            <div className="residency-reg">
                                <label for="residency">Country of Residency*</label>
                                <input type="text" name="residency" />
                            </div>
                        </div>
                        <div className="row registration">
                            <div className="contact-reg">
                                <label for="email">Email address*</label>
                                <input type="text" name="email" />
                            </div>
                            <div className="phone-reg">
                                <label for="phone">Mobile Number*</label>
                                <input type="text" name="phone" />
                            </div>
                        </div>
                        <div className="row registration">
                            <div className="password-reg">
                                <label for="password">Create Password*</label>
                                <input type="password" name="password" />
                            </div>
                        </div>
                        <p id="password-note"><em>Your password must contain 8 to 16 alphanumeric characters and should be a combination of a number (0-9), lowercase letter (a-z), uppercase letter (A-Z) and special character (!@#$%^&*()).</em></p>
                    </div>
                    <div className="registration-optns">
                        <h3>Communication preferences</h3>
                        <div className="promotional-eml-opts">
                            <input type="checkbox" name="promotional-emails" />
                            <label for="promotional-emails">I would like to receive promotional emails from Airline, including exclusive deals and offers</label>
                        </div>
                        <div className="terms-ack">
                            <input type="checkbox" name="privacy-policy" id="policy-ack-box"/>
                            <label for="privacy-policy">By submiting my information, I acknowledge and accept the terms of Airlines' Privacy Policy and terms and conditions of the Registered customer account.</label>
                        </div>
                    </div>
                    <div className="reg-button">
                        <button type="submit" className="reg-btn">Register</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Register;