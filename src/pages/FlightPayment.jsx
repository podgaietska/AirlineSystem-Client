import { useState, useRef, useEffect } from "react";
import {useLocation, useNavigate} from "react-router-dom";

function FlightPayment({formatDate, user}){
    const {state} = useLocation();
    const [paymentMethod, setPaymentMethod] = useState("credit");
    const [cardNumber, setCardNumber] = useState("");
    const [province, setProvince] = useState("");
    const [expirationMonth, setExpirationMonth] = useState();
    const [expirationYear, setExpirationYear] = useState();
    const [cvv, setCvv] = useState();
    const navigate = useNavigate();
    let paymentDetails = {};
    const topRef = useRef(null);

    useEffect(() => {
        topRef.current?.scrollIntoView({ behavior: "smooth" });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!cardNumber || !province || !expirationMonth || !expirationYear || !cvv) {
            alert("Please fill in all required fields.");
            return;
        }

        paymentDetails = {
            cardNumber: cardNumber,
            province: province,
            expirationMonth: expirationMonth,
            expirationYear: expirationYear,
            cvv: cvv,
            paymentStrategy: paymentMethod
        }

        getTotalCost(state.seat, state.insurance, province);
    }

    const getTotalCost = (seatId, insurance, province) => {
        try {
            const url = new URL('http://localhost:8080/api/v1/booking/total');
            const params = {
                seatId: seatId,
                insurance: insurance,
                province: province
            };
            url.search = new URLSearchParams(params).toString();
    
            const fetchTotal = async () => {
                const res = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                });
    
                if (!res.ok) {
                const response = await res.json();
                console.log(response);
                return 
                }
    
                const data = await res.json();
                console.log(data);

                navigate("/checkout", { state: { seat: state.seat, flight: state.flight, class: state.class, userDetails: state.userDetails, paymentDetails: paymentDetails, totalCost: data, insurance: state.insurance } });
    
            }
            fetchTotal();
        } catch (error) {
            console.log(error);
        }
    }

    console.log(state);

    return(
        <div className="flight-overview-pg">
            <div className="flight-book-navbar" ref={topRef}>
                <ul className="booking-process">
                    <li className="booking-step">
                        <p>1. Overview</p>
                    </li>
                    <li className="booking-step">
                        <p>2. Seats</p>
                    </li>
                    <li className="booking-step active">
                        <p>3. Payment</p>
                    </li>
                    <li className="booking-step">
                        <p>3. Summary and Checkout</p>
                    </li>
                </ul>
            </div>
            <div className="container">
                <div className="pg-title flight-payment">
                    <h1>Payment</h1>
                </div>
                <form onSubmit={handleSubmit}>
                <div className="inpage-container payment-details">
                    <ul className="payment-options">
                        <li className={paymentMethod === "credit" ? "payment-option chosen" : "payment-option"} onClick={() => setPaymentMethod("credit")}>
                            Credit
                        </li>
                        <li className={paymentMethod === "debit" ? "payment-option chosen" : "payment-option"} onClick={() => setPaymentMethod("debit")}>
                            Debit
                        </li>
                    </ul>
                    <div className="payment-container">
                        {paymentMethod === "credit" ? (
                            <h3>Credit Card Information</h3>
                        ) : (
                            <h3>Debit Card Information</h3>
                        )}
                        <div className="payment-inputs-container">
                            <div className="row payment">
                                <div className="passenger-input payment">
                                    <label for="num">Card Number</label>
                                    <input type="text" name="num" placeholder="xxxx-xxxx-xxxx-xxxx" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} required/>
                                </div>
                                <div className="passenger-input payment">
                                    <label for="holder">Card Holder</label>
                                    <input type="text" name="holder" placeholder=" Your Full Name" required/>
                                </div>
                            </div>
                            <div className="row payment">
                                <div className="passenger-input expiration">
                                    <div className="card-expiration">
                                        <label for="month">Expiration Month</label>
                                        <input type="number" name="month" placeholder="MM" value={expirationMonth} onChange={(e) => setExpirationMonth(e.target.value)} required/>
                                    </div>
                                    <p>/</p>
                                    <div className="card-expiration">
                                        <label for="year">Expiration Year</label>
                                        <input type="number" name="year" placeholder="YYYY" value={expirationYear} onChange={(e) => setExpirationYear(e.target.value)} required/>
                                    </div>
                                    <div className="cvv">
                                        <label for="cc-cvv">CVV</label>
                                        <input type="number" name="cc-cvv" placeholder="XXX" value={cvv} onChange={(e) => setCvv(e.target.value)} required/>
                                    </div>
                                </div>
                                <div className="passenger-input payment">
                                        <label for="card-holder">Province</label>
                                        <input type="text" name="card-holder" placeholder="Province" value={province} onChange={(e) => setProvince(e.target.value)} required/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <button type="submit" className="continue-btn">Continue</button>
                </form>
            </div>
        </div>
    )
}

export default FlightPayment;