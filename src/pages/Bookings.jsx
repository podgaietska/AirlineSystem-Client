import {useLocation} from "react-router-dom";
import { useState } from "react";

function Bookings({cancelBooking, bookings}){
    const [bookingNumber, setBookingNumber] = useState();

    console.log(bookings);

    const handleCancelBooking = (e) => {
        e.preventDefault();
        cancelBooking(bookingNumber);
    }

    return(
        <div className="bookings-page">
            <div className="page-container">
                <div className="reg-text">
                    <h1>Your Trips</h1>
                </div>
                <div className="bookings-container">
                    {bookings.length === 0 && <p>You have no current bookings.</p>}
                    {bookings.map((booking) => {
                        return(
                        <div className="flight-summary-container booking">
                        <div className="flight-route-details">
                            <div className="mini-header booking">
                                <p>{booking.flight.flightNumber}</p>
                            </div>
                            <div className="flight-other-details">
                                <div className="flight-city overview-pg">
                                    <p>{booking.flight.departureAirport}</p>
                                    <p>{booking.flight.departureTime}</p>
                                </div>
                                <div className="flight-route">
                                    <div className="route"></div>
                                    <p>{booking.flight.flightDuration}</p>
                                </div>
                                <div className="flight-city overview-pg">
                                    <p>{booking.flight.arrivalAirport}</p>
                                    <p>{booking.flight.arrivalTime}</p>
                                </div>
                            </div>
                        </div>
                        <div className="passenger-choice-details booking">
                            <div className="inline-text">
                                <h3>{booking.bookingNumber}</h3>
                            </div>
                            <div className="small-text booking">
                                <p>1 person</p>
                                <p>Seat: {booking.seat.seatNumber}</p>
                                <p>Class: {booking.seat.seatClass}</p>
                            </div>
                            <form onSubmit={handleCancelBooking}>
                                <button type="submit" className="cancel-booking" onClick={() => setBookingNumber(booking.bookingNumber)}>Cancel Booking</button>
                            </form>
                        </div>
                    </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default Bookings;