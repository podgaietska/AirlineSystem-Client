import { useState } from "react";
import {useNavigate} from "react-router-dom";

function Register({setShowlogin, register}){
    const [fname, setFname] = useState();
    const [lname, setLname] = useState();
    const [email, setEmail] = useState();
    const [phone, setPhone] = useState();
    const [dateOfBirth, setDateOfBirth] = useState();
    const [password, setPassword] = useState();
    const [apartment, setApartment] = useState();
    const [street, setStreet] = useState();
    const [city, setCity] = useState();
    const [province, setProvince] = useState();
    const [country, setCountry] = useState();
    const [postalCode, setPostalCode] = useState();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!fname || !lname || !email || !phone || !dateOfBirth || !password || !apartment || !street || !city || !province || !country || !postalCode) {
            alert("Please fill in all required fields.");
            return;
        }

        let address = {
            apartment: apartment,
            street: street,
            city: city,
            province: province,
            country: country,
            postalCode: postalCode
        }

        register(fname, lname, email, phone, dateOfBirth, address, password, navigate);
    }

    return(
        <div className="reg-pg">
            <div className="reg-page-container">
                <div className="reg-text">
                    <h1>Sign up and take off</h1>
                    <p>Creting an account saves you time when booking a flight. And if you become a Registered Customer, you will also be able to enjoy exclusive perks and priveledges. It only takes a minute!</p>
                    <p>Already a registered member? <span className="link" onClick={() => setShowlogin(true)}>Login</span> Here</p>
                </div>
                <form className="registartion-form" onSubmit={handleSubmit}>
                    <div className="signup-info">
                        <h3>Fill in your information</h3>
                        <p>Please complete all the fields marked with *</p>
                        <div className="row registration">
                            <div className="name-reg">
                                <label for="first-name">First / Given name (as in passport)*</label>
                                <input type="text" name="first-name" onChange={(e) => setFname(e.target.value)} required/>
                            </div>
                            <div className="name-reg">
                                <label for="last-name">Last / Family name (as in passport)*</label>
                                <input type="text" name="last-name" onChange={(e) => setLname(e.target.value)} required/>
                            </div>
                        </div>
                        <div className="row registration">
                            <div className="bd-reg">
                                <label for="birthday">Date of birth (as in passport)*</label>
                                <input type="date" name="birthday" onChange={(e) => setDateOfBirth(e.target.value)} required/>
                            </div>
                            <div className="contact-reg">
                                <label for="email">Email address*</label>
                                <input type="text" name="email" onChange={(e) => setEmail(e.target.value)} required/>
                            </div>
                        </div>
                        <div className="row registration">
                            <div className="phone-reg">
                                <label for="phone">Mobile Number*</label>
                                <input type="text" name="phone" onChange={(e) => setPhone(e.target.value)} required/>
                            </div>
                            <div className="password-reg">
                                <label for="password">Create Password*</label>
                                <input type="password" name="password" onChange={(e) => setPassword(e.target.value)} required/>
                            </div>
                        </div>
                        <p id="password-note"><em>Your password must contain 8 to 16 alphanumeric characters and should be a combination of a number (0-9), lowercase letter (a-z), uppercase letter (A-Z) and special character (!@#$%^&*()).</em></p>
                        <h3>Address</h3>
                        <p>Please complete all the fields marked with *</p>
                        <div className="row registration">
                            <div className="name-reg">
                                <label for="first-name">Apartment*</label>
                                <input type="text" name="first-name" onChange={(e) => setApartment(e.target.value)} required/>
                            </div>
                            <div className="name-reg">
                                <label for="last-name">Street*</label>
                                <input type="text" name="last-name" onChange={(e) => setStreet(e.target.value)} required/>
                            </div>
                        </div>
                        <div className="row registration">
                            <div className="bd-reg">
                                <label for="birthday">City*</label>
                                <input type="text" name="birthday" onChange={(e) => setCity(e.target.value)} required/>
                            </div>
                            <div className="residency-reg">
                                <label for="residency">Province*</label>
                                <input type="text" name="residency" onChange={(e) => setProvince(e.target.value)} required/>
                            </div>
                        </div>
                        <div className="row registration">
                            <div className="contact-reg">
                                <label for="email">Country*</label>
                                <input type="text" name="email" onChange={(e) => setCountry(e.target.value)} required/>
                            </div>
                            <div className="phone-reg">
                                <label for="phone">Postal Code*</label>
                                <input type="text" name="phone" onChange={(e) => setPostalCode(e.target.value)} required/>
                            </div>
                        </div>
                    </div>
                    <div className="registration-optns">
                        <h3>Communication preferences</h3>
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