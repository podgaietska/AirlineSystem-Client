import { useState, useEffect } from 'react';
function AgentFlights({passengerList, getPassengerList, setPassengerList}) {
    const [flightNumber, setFlightNumber] = useState();

    useEffect(() => {
        setPassengerList([]);
        localStorage.removeItem('passengerList');
        setFlightNumber("");
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        getPassengerList(flightNumber);
    }
    
    return (
        <div className="bookings-page">
            <div className="page-container">
                <div className="reg-text agent-search">
                    <h1>Search Passengers on a Flight</h1>
                </div>
                <form className="search-bar" onSubmit={handleSubmit}>
                    <div className="search-inputs">
                        <input type="text" placeholder="Flight Number" value={flightNumber} onChange={(e) => setFlightNumber(e.target.value)}/>
                        <button type="submit">Search</button>
                    </div>
                </form>
                {flightNumber === "" ? (
                    <p className="no-results">Please select a flight to view passengers</p>
                ) :  passengerList.length === 0 ? (
                    <p className="no-results">No passengers found for this flight</p>
                ) : (
                    <div className="passenger-list">
                    {passengerList.map((passenger) => {
                        return(
                            <div className="passenger-info agent">
                                <p>{passenger.fname} {passenger.lname}</p>
                                <p>{passenger.email}</p>
                                <p>{passenger.phone}</p>
                                <p>{passenger.dateOfBirth}</p>
                            </div>
                        )}
                    )}
                    </div>
                )
                }

            </div>
        </div>
    )
}

export default AgentFlights;