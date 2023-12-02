import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { Link } from "react-router-dom";

function Flights({flights, flightInfo, setFlightInfo, formatDate}){

    const sortFlightsByTime = (flights) => {
        return flights.sort((a, b) => {
            const timeA = a.departureTime.split(':').map(Number); // Convert time to array of numbers [hour, minute]
            const timeB = b.departureTime.split(':').map(Number);
            
            const dateA = new Date(); // Create a new Date object for comparison
            dateA.setHours(timeA[0], timeA[1]); // Set hours and minutes for the first flight
    
            const dateB = new Date();
            dateB.setHours(timeB[0], timeB[1]); // Set hours and minutes for the second flight
    
            return dateA - dateB; // Compare the two dates
        });
    };

    return(
        <div className="flights-pg">
            <div className="container">
                <div className="pg-title">
                    <h1>Departing Flights</h1>
                    <h3>{flightInfo.departureAirport} - {flightInfo.arrivalAirport} | {formatDate(flightInfo.date)}</h3>
                    <p>Fares displayed are per person, one way, and <strong>are estimates of the prices</strong>. The fares displayed <strong>do not</strong> account for taxes and additional fees.</p>
                </div>
                {/* <div className="dates-container">
                    <div className="dates-list">
                        {dates.map((date, index) => {
                            return(
                                <div className={date === selectedDate ? "date active" : "date"} key={index}>
                                    <p>{date}</p>
                                    <h3>$2300</h3>
                                </div>
                            )
                        })
                        }
                    </div>
                </div> */}
                <div className="classes-container">
                    <div className="class-list">
                        <div className="class econ">
                            <h3>Economy</h3>
                        </div>
                        <div className="class comfort">
                            <h3>Comfort</h3>
                        </div>
                        <div className="class business">
                            <h3>Business</h3>
                        </div>
                    </div>  
                </div>
                <div className="flight-list">
                    {sortFlightsByTime(flights).map((flight, index) => {
                        return(
                            <div className="flight" key={index}>
                                <div className="class-prices">
                                    <Link to={"/flight-overview"} state={{flight: flight, class:"Economy"}}>
                                    <div className="class-price">
                                        <h2>${flight.baseSeatPrice}</h2>
                                    </div>
                                    </Link>

                                    <Link to={"/flight-overview"} state={{flight: flight, class:"Comfort"}}>
                                    <div className="class-price">
                                        <h2>${flight.baseSeatPrice * 1.4}</h2>
                                    </div>
                                    </Link>

                                    <Link to={"/flight-overview"} state={{flight: flight, class:"Business"}}>
                                    <div className="class-price">
                                        <h2>${flight.baseSeatPrice * 2.5}</h2>
                                    </div>
                                    </Link>
                                </div>
                                <div className="flight-info">
                                    <div className="flight-details-overall">
                                        <p>{flight.flightNumber}</p>
                                    </div>
                                    <div className="flight-other-details">
                                        <div className="flight-city">
                                            <p>{flight.departureAirport}</p>
                                            <p>{flight.departureTime}</p>
                                        </div>
                                        <div className="flight-route">
                                            <div className="route"></div>
                                            <p>{flight.flightDuration}</p>
                                        </div>
                                        <div className="flight-city">
                                            <p>{flight.arrivalAirport}</p>
                                            <p>{flight.arrivalTime}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                    }
                </div>
            </div>
        </div>
    )
}

export default Flights;