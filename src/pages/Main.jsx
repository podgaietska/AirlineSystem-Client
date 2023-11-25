
import { useState } from "react";

function Main(){
    const [tab, setTab] = useState("bookflight");

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
                    <form className="search-flight-form">
                        <ul className="flight-type">
                            <li className="return">
                                <input type="radio" name="flight-type" value="return" checked />
                                <label for="return">Return</label>
                            </li>
                            <li className="one-way">
                                <input type="radio" name="flight-type" value="one-way" />
                                <label for="one-way">One Way</label>
                            </li>
                        </ul>
                        <div className="flight-details">
                            <div className="row">
                                <div className="route-info">
                                    <input type="text" name="from" placeholder="From" />
                                    <input type="text" name="to" placeholder="To" />
                                </div>
                                <div className="date-info">
                                    <div className="deprature-info">
                                        <label for="departure-date">Departure Date</label>
                                        <input type="date" name="departure-date" />
                                    </div>
                                    <div className="return-info">
                                        <label for="return-date">Return Date</label>
                                        <input type="date" name="return-date" />
                                    </div>
                                </div>
                            </div>
                            <div className="row second">
                                <div className="class-info">
                                    <label for="class">Class</label>
                                    <select name="class">
                                        <option value="economy">Economy</option>
                                        <option value="business">Business</option>
                                        <option value="first">First</option>
                                    </select>
                                </div>
                                <div className="passenger-num-info">
                                    <label for="passengers">Passengers</label>
                                    <input type="number" name="passengers" placeholder="1"/>
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
                    <form className="search-booking-form">
                            <div className="row second booking">
                                <div className="booking-num">
                                    <input type="text" name="booking-ref" placeholder="Six-character booking reference"/>
                                </div>
                                <div className="passenger-last-name">
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