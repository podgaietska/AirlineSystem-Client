import {useLocation, Link, useNavigate} from "react-router-dom";
import { useState, useEffect, useRef } from "react";

function FlightOverview({formatDate, user, setShowlogin}){
    const {state} = useLocation();
    const flight = state.flight;
    const flightClass = state.class;
    const multiplier = flightClass === "Comfort" ? 1.4 : flightClass === "Business" ? 2.5 : 1;
    const [fname, setFname] = useState(user && user.fname);
    const [lname, setLname] = useState(user && user.lname);
    const [email, setEmail] = useState(user && user.email);
    const [phone, setPhone] = useState(user && user.phone);
    const [dateOfBirth, setDateOfBirth] = useState(user && user.dateOfBirth);
    const [insurance, setInsurance] = useState(false);
    var userBookingDetails;
    const navigate = useNavigate();
    const topRef = useRef(null);

    useEffect(() => {
        topRef.current?.scrollIntoView({ behavior: "smooth" });
    }, []);


    console.log(state);
    console.log(insurance);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!fname || !lname || !email || !phone || !dateOfBirth) {
            alert("Please fill in all required fields.");
            return;
        }

        navigate("/flight-seats", { state: { flight, class: flightClass, userDetails: { fname, lname, email, phone, dateOfBirth }, insurance: insurance} });
    }

    return(
        <div className="flight-overview-pg">
            <div className="flight-book-navbar" ref={topRef}>
                <ul className="booking-process">
                    <li className="booking-step active">
                        <p>1. Overview</p>
                    </li>
                    <li className="booking-step">
                        <p>2. Seats</p>
                    </li>
                    <li className="booking-step">
                        <p>3. Payment</p>
                    </li>
                    <li className="booking-step">
                        <p>3. Overview and Checkout</p>
                    </li>
                </ul>
            </div>
            <div className="container">
                <div className="pg-title flight-overview">
                    <h1>Flight Overview</h1>
                </div>
                <div className="inpage-container flight-summary">
                    <h3>Flight Summary</h3>
                    <p><strong>Trip: </strong> {flight.departureAirport} - {flight.arrivalAirport} | <strong>Departing Flight: </strong>{formatDate(flight.flightDate)}</p>
                    <div className="flight-summary-container">
                        <div className="flight-route-details">
                            <div className="mini-header">
                                <p>{flight.flightNumber}</p>
                            </div>
                            <div className="flight-other-details">
                                <div className="flight-city overview-pg">
                                    <p>{flight.departureAirport}</p>
                                    <p>{flight.departureTime}</p>
                                </div>
                                <div className="flight-route">
                                    <div className="route"></div>
                                    <p>{flight.flightDuration}</p>
                                </div>
                                <div className="flight-city overview-pg">
                                    <p>{flight.arrivalAirport}</p>
                                    <p>{flight.arrivalTime}</p>
                                </div>
                            </div>
                        </div>
                        <div className="passenger-choice-details">
                            <div className="inline-text">
                                <h3>{flightClass}</h3>
                                <h3>${flight.baseSeatPrice * multiplier}</h3>
                            </div>
                            <div className="small-text">
                                <p>1 Adult</p>
                                <p>In flight meals are complementary. Enjoy our fantastic western cusine throughout your journey</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="insurance-container">
                    <div className="terms-ack">
                            <input type="checkbox" name="privacy-policy" id="policy-ack-box" value={insurance} onChange={(e) => setInsurance(e.target.checked)}/>
                            <label for="privacy-policy">I want to purchase Flight Cancellation Insurance.</label>
                        </div>
                </div>
                <div className="pg-title passenger-overview">
                    <h1>Passenger Overview</h1>
                </div>
                <form onSubmit={handleSubmit}>
                <div className="inpage-container passenger-info">
                    <h3>Passenger Details</h3>
                    {!user && <span style={{fontWeight: 400, fontSize: "0.9rem"}}>* <span style={{color: "#165689", textDecoration: "underline", cursor: "pointer"}} onClick={() => setShowlogin(true)}>Login </span>to retrieve  your information</span>}
                    <div className="passenger-inputs-container">
                        <div className="row passenger">
                            <div className="passenger-input">
                                <label for="passenger-fn">First Name</label>
                                <input type="text" name="passenger-fn" placeholder="First Name" value={user ? user.fname : fname} onChange={(e) => setFname(e.target.value)} required/>
                            </div>
                            <div className="passenger-input">
                                <label for="passenger-ln">Last Name</label>
                                <input type="text" name="passenger-ln" placeholder="Last Name" value={user ? user.lname : lname} onChange={(e) => setLname(e.target.value)} required/>
                            </div>
                        </div>
                        <div className="row passenger">
                            <div className="passenger-input">
                                <label for="passenger-email">Email</label>
                                <input type="text" name="passenger-email" placeholder="Email" value={user ? user.email : email} onChange={(e) => setEmail(e.target.value)} required/>
                            </div>
                            <div className="passenger-input">
                                <label for="passenger-phone">Phone Number</label>
                                <input type="text" name="passenger-phone" placeholder="Phone Number" value={user ? user.phone : phone} onChange={(e) => setPhone(e.target.value)} required/>
                            </div>
                        </div>
                        <div className="row passenger">
                            <div className="passenger-input">
                                <label for="passenger-dob">Date of birth</label>
                                <input type="date" name="passenger-dob" value={user ? user.dateOfBirth : dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} required/>
                            </div>
                        </div>
                    </div>
                </div>
                <button type="submit" className="continue-btn">Continue</button>
                </form>
                {/* <Link to={"/flight-seats"} state={{flight: flight, class: flightClass, userDetails: {fname: fname, lname: lname, email: email, phone: phone, dateOfBirth: dateOfBirth} }}><button className="continue-btn">Continue</button></Link> */}
                
            </div>
        </div>
    )
}

export default FlightOverview;