function FlightPayment({formatDate, user}){
    return(
        <div className="flight-overview-pg">
            <div className="flight-book-navbar">
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
                </ul>
            </div>
            <div className="container">
                <div className="pg-title flight-payment">
                    <h1>Payment</h1>
                </div>
                
            </div>
        </div>
    )
}

export default FlightPayment;