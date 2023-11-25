
function FlightOverview(){
    return(
        <div className="flight-overview-pg">
            <div className="flight-book-navbar">
                <ul className="booking-process">
                    <li className="booking-step active">
                        <p>1. Review</p>
                    </li>
                    <li className="booking-step">
                        <p>2. Passengers</p>
                    </li>
                    <li className="booking-step">
                        <p>3. Seats</p>
                    </li>
                    <li className="booking-step">
                        <p>4. Payment</p>
                    </li>
                </ul>
            </div>
            <div className="container">
                <div className="pg-title flight-overview">
                    <h1>Flight Overview</h1>
                </div>
                <div className="inpage-container flight-summary">
                    <h3>Flight Summary</h3>
                    <p><strong>Trip: </strong>Calgary, CA (YYC) - Phuket, TH (HKT) | <strong>Departing Flight: </strong>Saturday, December 30, 2023</p>
                    <div className="flight-summary-container">
                        <div className="flight-route-details">
                            <div className="mini-header">
                                <p>28hr10m - 2 stops</p>
                            </div>
                        </div>
                        <div className="passenger-choice-details">
                            <div className="inline-text">
                                <h3>Economy</h3>
                                <h3>$2300</h3>
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
                                <p>Air transportation charges</p>
                                <p>1 x $2212.00</p>
                            </div>
                            <div className="inline-text price">
                                <p>Taxes, fees and charges</p>
                                <p>$86.00</p>
                            </div>
                            <div className="inline-text price total">
                                <h3>Grand total (CAD)</h3>
                                <h3>$2300</h3>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="continue-btns">
                    <button className="continue-btn guest">Continue as guest</button>
                    <button className="continue-btn member">Continue as member</button>
                </div>
            </div>
        </div>
    )
}

export default FlightOverview;