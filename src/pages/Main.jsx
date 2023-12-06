
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Main({getFlights, flights, setFlights, retrieveBooking, bookings}){
    const [departureAirport, setDepartureAirport] = useState("");
    const [arrivalAirport, setArrivalAirport] = useState("");
    const [date, setDate] = useState("");
    const [tab, setTab] = useState("bookflight");
    const [bookingNumber, setBookingNumber] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        localStorage.removeItem('flights');
        setFlights([]);
    }, []);

    const onFlightSearch = (e) => {
        e.preventDefault();
        getFlights(departureAirport, arrivalAirport, date, navigate);
    }

    const handleRetrieval = (e) => {
        e.preventDefault();
        retrieveBooking(bookingNumber, navigate);
    }

    return(
        <div className="mainpg-container">
            <div className="banner-container">
                <img src="banner.jpg" className="banner-img" alt=""></img>
                <div className="banner-overlay"></div>
            </div>
            <div className="mainpg-inner">
                <div className="mainpg-text">
                    <h1>Book Your Next Flight Today!</h1>
                </div>
                <div className="search-flight-window">
                    <div className="nav-bar">
                        <ul className="nav-bar-items">
                            <li className={tab === "bookflight" ? "nav-tab tab1 active" : "nav-tab tab1"} onClick={() => setTab("bookflight")}>BOOK FLIGHT</li>
                            <li className={tab === "managebooking" ? "nav-tab active" : "nav-tab"} onClick={() => setTab("managebooking")}>MANAGE BOOKING</li>
                        </ul>
                    </div>
                    {tab === "bookflight" ? (
                    <>
                    <div className="search-flight-text">
                        <h3 className="text">Hi, where would you like to go?</h3>
                    </div>
                    <form className="search-flight-form" onSubmit={onFlightSearch}>
                        <div className="flight-details">
                            <div className="row">
                                <div className="route-info">
                                    <input type="text" name="from" placeholder="From" onChange={(e) => setDepartureAirport(e.target.value)} />
                                    <input type="text" name="to" placeholder="To" onChange={(e) => setArrivalAirport(e.target.value)} />
                                </div>
                                <div className="date-info">
                                    <div className="deprature-info">
                                        <label for="departure-date">Departure Date</label>
                                        <input type="date" name="departure-date" onChange={(e) => setDate(e.target.value)}/>
                                    </div>
                                </div>
                                <button type="submit">SEARCH</button>
                            </div>
                        </div>
                    </form>
                    </>)
                    :
                    (
                    <>
                    <div className="search-flight-text">
                        <h3 className="text">Enter your booking details to retrieve your itinerary</h3>
                    </div>
                    <form className="search-booking-form" onSubmit={handleRetrieval}>
                            <div className="row">
                                <div className="booking-num">
                                    <label for="departure-date">Booking Number</label>
                                    <input type="text" name="booking-ref" placeholder="Six-character booking reference" onChange={(e) => setBookingNumber(e.target.value)}/>
                                </div>
                                <div className="passenger-last-name">
                                    <label for="departure-date">Passenger Last Name</label>
                                    <input type="text" name="passengers" placeholder="Last/Family Name"/>
                                </div>
                                <button type="submit">RETRIEVE</button>
                            </div>
                    </form>
                    </>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Main;