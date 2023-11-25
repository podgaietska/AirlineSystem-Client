import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

function Flights(){
    const dates = ["Wed Dec 27", "Thu Dec 28", "Fri Dec 29", "Sat Dec 30", "Sun Dec 31", "Mon Jan 1", "Tue Jan 2"]
    const selectedDate = "Sat Dec 30"
    const flights = [{"price-econ":"$2300", "price-comfort":"$2800", "price-business":"$3200", "departure":"12:00", "arrival":"7:00", "arival-date":"1 Jan", "duration":"12h 30m", "stops":"1"}, {"price-econ":"$2300", "price-comfort":"$2800", "price-business":"$3200", "departure":"12:00", "arrival":"7:00", "arival-date":"1 Jan", "duration":"12h 30m", "stops":"1"}, {"price-econ":"$2300", "price-comfort":"$2800", "price-business":"$3200", "departure":"12:00", "arrival":"7:00", "arival-date":"1 Jan", "duration":"12h 30m", "stops":"1"}, {"price-econ":"$2300", "price-comfort":"$2800", "price-business":"$3200", "departure":"12:00", "arrival":"7:00", "arival-date":"1 Jan", "duration":"12h 30m", "stops":"1"}, {"price-econ":"$2300", "price-comfort":"$2800", "price-business":"$3200", "departure":"12:00", "arrival":"7:00", "arival-date":"1 Jan", "duration":"12h 30m", "stops":"1"}]

    return(
        <div className="flights-pg">
            <div className="container">
                <div className="pg-title">
                    <h1>Departing Flights</h1>
                    <h3>Calgary (YYC) - Phuket (HKT) | Saturday, December 30, 2023</h3>
                    <p>Fares displayed are per person, one way, and <strong>include all taxes, fees and charges</strong>. Fare features listed apply to flights operated by Airline.</p>
                </div>
                <div className="dates-container">
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
                </div>
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
                    {flights.map((flight, index) => {
                        return(
                            <div className="flight" key={index}>
                                <div className="class-prices">
                                    <div className="class-price">
                                        <h2>{flight["price-econ"]}</h2>
                                    </div>
                                    <div className="class-price">
                                        <h2>{flight["price-comfort"]}</h2>
                                    </div>
                                    <div className="class-price">
                                        <h2>{flight["price-business"]}</h2>
                                    </div>
                                </div>
                                <div className="flight-info">
                                    <div className="flight-details-overall">
                                        <p>{flight["duration"]} - {flight["stops"]} stop(s)</p>
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