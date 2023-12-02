import {useLocation, Link} from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

function FlightSeats(){
    const [chosenSeat, setChosenSeat] = useState(null);
    let ordinarySeats = [];
    let comfortSeats = [];
    let businessSeats = [];
    const {state} = useLocation();
    const topOfPage = useRef(null);
    const navigate = useNavigate();

    useEffect(() => { 
        topOfPage.current?.scrollIntoView({ behavior: "smooth" });
    }, []);

    state.flight.seats.forEach(seat => {
        switch (seat.seatClass) {
            case "Ordinary":
                ordinarySeats.push(seat);
                break;
            case "Comfort":
                comfortSeats.push(seat);
                break;
            case "Business":
                businessSeats.push(seat);
                break;
            default:
                // Handle unexpected seat class, if necessary
                break;
        }
    })

    function parseSeatNumber(seatNumber) {
        const match = seatNumber.match(/(\d+)([A-Z])/);
        return {
            number: parseInt(match[1], 10),
            letter: match[2]
        };
    }

    function compareSeats(seat1, seat2) {
        const parsedSeat1 = parseSeatNumber(seat1.seatNumber);
        const parsedSeat2 = parseSeatNumber(seat2.seatNumber);
    
        if (parsedSeat1.number < parsedSeat2.number) return -1;
        if (parsedSeat1.number > parsedSeat2.number) return 1;
    
        // If the numbers are equal, compare by letter
        if (parsedSeat1.letter < parsedSeat2.letter) return -1;
        if (parsedSeat1.letter > parsedSeat2.letter) return 1;
    
        return 0;
    }

    const splitSeatsIntoGroups = (seats, groupSize) => {
        let result = [];
        for (let i = 0; i < seats.length; i += groupSize) {
            let group = seats.slice(i, i + groupSize);
            result.push(group);
        }
        return result;
    };


    const ordinarySeatsGrouped = splitSeatsIntoGroups(ordinarySeats.sort(compareSeats), 4);
    const comfortSeatsGrouped = splitSeatsIntoGroups(comfortSeats.sort(compareSeats), 4);
    const businessSeatsGrouped = splitSeatsIntoGroups(businessSeats.sort(compareSeats), 2);

    console.log(state);
    // console.log(ordinarySeats.sort(compareSeats));
    // console.log(ordinarySeatsGrouped); // Outputs the array of arrays, each containing 4 seats
    // console.log(comfortSeatsGrouped); // Outputs the array of arrays, each containing 4 seats
    // console.log(businessSeatsGrouped); // Outputs the array of arrays, each containing 4 seats

    console.log(chosenSeat);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!chosenSeat) {
            alert("Please select a seat.");
            return;
        }

    }

    return (
        <div className="flight-overview-pg">
            <div className="flight-book-navbar" ref={topOfPage}>
                <ul className="booking-process">
                    <li className="booking-step">
                        <p>1. Overview</p>
                    </li>
                    <li className="booking-step active">
                        <p>2. Seats</p>
                    </li>
                    <li className="booking-step">
                        <p>3. Payment</p>
                    </li>
                </ul>
            </div>
            <div className="container">
                <div className="pg-title seat-map">
                    <h1>Seat Map</h1>
                    <div className="inner-pg-container">
                        {state.class === "Economy" && (
                            <div className="seat-map-container">
                            {ordinarySeatsGrouped.map((group,index) => {
                                return(
                                    <div className="seat-row">
                                        <div className="seat-pair">
                                            <div className={group[0].isOccupied ? "seat taken" : (group[0].id === chosenSeat ? "seat selected" : "seat")}
                                            onClick={() => setChosenSeat(group[0].id)}
                                            >{group[0].seatNumber}</div>
                                            <div className={group[1].isOccupied ? "seat taken" : (group[1].id === chosenSeat ? "seat selected" : "seat")}
                                            onClick={() => setChosenSeat(group[1].id)}
                                            >{group[1].seatNumber}</div>
                                        </div>
                                        <div className="seat-pair">
                                            <div className={group[2].isOccupied ? "seat taken" : (group[2].id === chosenSeat ? "seat selected" : "seat")}
                                            onClick={() => setChosenSeat(group[2].id)}
                                            >{group[2].seatNumber}</div>
                                            <div className={group[3].isOccupied ? "seat taken" : (group[3].id === chosenSeat ? "seat selected" : "seat")}
                                            onClick={() => setChosenSeat(group[3].id)}
                                            >{group[3].seatNumber}</div>
                                        </div>
                                    </div>
                                    )
                                })}
                            </div>
                        )}
                        {state.class === "Comfort" && (
                            <div className="seat-map-container">
                            {comfortSeatsGrouped.map((group,index) => {
                                return(
                                    <div className="seat-row">
                                        <div className="seat-pair">
                                            <div className={group[0].isOccupied ? "seat taken" : (group[0].id === chosenSeat ? "seat selected" : "seat")} 
                                            onClick={() => setChosenSeat(group[0].id)}
                                            >{group[0].seatNumber}</div>
                                            <div className={group[1].isOccupied ? "seat taken" : (group[1].id === chosenSeat ? "seat selected" : "seat")}
                                            onClick={() => setChosenSeat(group[1].id)}
                                            >{group[1].seatNumber}</div>
                                        </div>
                                        <div className="seat-pair">
                                            <div className={group[2].isOccupied ? "seat taken" : (group[2].id === chosenSeat ? "seat selected" : "seat")}
                                            onClick={() => setChosenSeat(group[2].id)}
                                            >{group[2].seatNumber}</div>
                                            <div className={group[3].isOccupied ? "seat taken" : (group[3].id === chosenSeat ? "seat selected" : "seat")}
                                            onClick={() => setChosenSeat(group[3].id)}
                                            >{group[3].seatNumber}</div>
                                        </div>
                                    </div>
                                    )
                                })}
                            </div>
                        )}
                        {state.class === "Business" && (
                            <div className="seat-map-container">
                            {businessSeatsGrouped.map((group,index) => {
                                return(
                                    <div className="seat-row business">
                                        <div className={group[0].isOccupied ? "seat taken business" : (group[0].id === chosenSeat ? "seat selected business" : "seat business")}
                                        onClick={() => setChosenSeat(group[0].id)}
                                        >{group[0].seatNumber}</div>
                                        <div className={group[1].isOccupied ? "seat taken business" : (group[1].id === chosenSeat ? "seat selected business" : "seat business")}
                                        onClick={() => setChosenSeat(group[1].id)}
                                        >{group[1].seatNumber}</div>
                                    </div>
                                    )
                                })}
                            </div>
                        )}
                        <div className="seat-map-legend-container">
                            <div className="seat-legend">
                                <div className="legend-vacant">
                                    <div className="seat"></div>
                                    <p>Vacant</p>
                                </div>
                                <div className="legend-taken">
                                    <div className="seat taken"></div>
                                    <p>Taken</p>
                                </div>
                                <div className="legend-taken">
                                    <div className="seat selected"></div>
                                    <p>Selected</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <form className="btn-seats-pg" onSubmit={handleSubmit}>
                        <button type="submit" className="continue-btn">Continue</button>
                    </form>
                </div>
            </div>
        </div>

    )
}

export default FlightSeats;