import { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function FinalFlightDetails({formatDate, user}){
    const {state} = useLocation();
    const flightClass = state.class;
    const multiplier = flightClass === "Comfort" ? 1.4 : flightClass === "Business" ? 2.5 : 1;
    const flight = state.flight;
    const topRef = useRef(null);
    const navigate = useNavigate();

    console.log(state);

    useEffect(() => {
        topRef.current?.scrollIntoView({ behavior: "smooth" });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        const bookingRequest = {
            fname: state.userDetails.fname,
            lname: state.userDetails.lname,
            email: state.userDetails.email,
            phone: state.userDetails.phone,
            dateOfBirth: state.userDetails.dateOfBirth,
            cardNumber: state.paymentDetails.cardNumber,
            province: state.paymentDetails.province,
            expirationMonth: state.paymentDetails.expirationMonth,
            expirationYear: state.paymentDetails.expirationYear,
            cvv: state.paymentDetails.cvv,
            paymentStrategy: state.paymentDetails.paymentStrategy,
    }

    createBooking(bookingRequest, state.flight.id, state.seat, state.insurance);

    console.log(bookingRequest);
    // console.log(state);
    // console.log(state.seat);
    // console.log(state.insurance);
        // createBooking(bookingRequest, state.flight.id, state.seat, state.insurance);
}

    const createBooking = (bookingRequest, flightId, seatId, insurance) => {
        const sending = toast("Creating Booking...");
        try {
            const url = new URL(`http://localhost:8080/api/v1/booking/checkout/${user ? "member" : "guest"}`);
            const params = {
                flightId: flightId,
                seatId: seatId,
                insurance: insurance
            };

            url.search = new URLSearchParams(params).toString();

            const createBooking = async () => {
                const res = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(bookingRequest)
                });

                if (!res.ok) {
                    const response = await res.json();
                    toast.dismiss(sending);
                    toast.error(response.error);
                    console.log(response);
                    return
                }

                toast.dismiss(sending);
                toast.success("Booking created successfully!");
                const data = await res.json();
                console.log(data);
                navigate("/");
            }
            createBooking();

        } catch (error) {
            console.log(error);
        }
    }


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
                    <li className="booking-step">
                        <p>3. Payment</p>
                    </li>
                    <li className="booking-step active">
                        <p>3. Summary and Checkout</p>
                    </li>
                </ul>
            </div>
            <div className="container">
                <div className="pg-title flight-checkout">
                    <h1>Payment</h1>
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
                <div className="inpage-container price-summary">
                    <h3>Price Summary</h3>
                    <div className="price-breakdown-container">
                        <p className="underlined">1 Adult</p>
                        <div className="flight-price">
                            <h3>Flight</h3>
                            <div className="inline-text price">
                                <p>Flight fare, taxes and fees</p>
                                <p>1 x ${state.totalCost}</p>
                            </div>
                            <div className="inline-text price total">
                                <h3>Grand total (CAD)</h3>
                                <h3>${state.totalCost}</h3>
                            </div>
                        </div>
                    </div>
                </div>
                <form onSubmit={handleSubmit}>
                <button type="submit" className="continue-btn">Confirm</button>
                </form>
            </div>
        </div>
    )
}


export default FinalFlightDetails;