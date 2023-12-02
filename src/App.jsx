import './App.css';
import Layout from "./components/Layout";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./pages/Main";
import Register from "./pages/Register";
import { useState } from "react";
import LoginOverlay from "./components/LoginOverlay";
import Flights from "./pages/Flights";
import FlightOverview from "./pages/FlightOverview";
import MemberInfo from "./components/MemberInfo";
import FlightSeats from "./pages/FlightSeats";
import FlightPayment from "./pages/FlightPayment";

function App() {
  const [showlogin, setShowlogin] = useState(false);
  const [showUserTab, setShowUserTab] = useState(false);
  const [flights, setFlights] = useState(localStorage.getItem('flights') ? JSON.parse(localStorage.getItem('flights')) : []);
  const [user, setUser] = useState(localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null);
  const [flightInfo, setFlightInfo] = useState(localStorage.getItem('flightInfo') ? JSON.parse(localStorage.getItem('flightInfo')) : null);

  const getFlights = (departureAirport, arrivalAirport, date, navigate) => {
    localStorage.removeItem('flights');
    try {
      const url = new URL('http://localhost:8080/api/v1/flight/search');
      const params = {
        departureAirport: departureAirport,
        arrivalAirport: arrivalAirport,
        date:date
      };
      url.search = new URLSearchParams(params).toString();

      const fetchFlights = async () => {
        const res = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
        });

        if (!res.ok) {
          const response = await res.json();
          console.log(response);
          return false
        }

        const data = await res.json();

        setFlights(data);
        var flightInfo = {
          departureAirport: departureAirport,
          arrivalAirport: arrivalAirport,
          date: date
        }
        setFlightInfo(flightInfo);
        localStorage.setItem('flightInfo', JSON.stringify(flightInfo));
        localStorage.setItem('flights', JSON.stringify(data));
        navigate('/flights');
        return true;
      }
      fetchFlights();
    } catch (error) {
      console.log(error);
    }
  }

  const login = (email, password, navigate) => {
    try{
      const fetchLogin = async () => {
        const res = await fetch('http://localhost:8080/api/v1/user/login', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            email: email,
            password: password
          })
        });
        if (!res.ok) {
          const response = await res.json();
          console.log(response);
          return
        }
        const data = await res.json();
        console.log(data);
        setUser(data);
        localStorage.setItem('user', JSON.stringify(data));
        setShowlogin(false);
        return
      }
      fetchLogin();
    }
    catch(error){
      console.log(error);
    }
  }

  const fetchSeats = async (flightId) => {

  }

  const logout = () => {
    const answer = window.confirm('Are you sure you want to log out?');
    setShowUserTab(false);
    if (answer){
      setUser(null);
      localStorage.removeItem('user');
    }
  }

  const formatDate = (dateString) => {
    const [year, month, day] = dateString.split('-').map(num => parseInt(num));
    const date = new Date(year, month - 1, day); // months are 0-indexed in JavaScript
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout setShowlogin={setShowlogin} user={user} setShowUserTab={setShowUserTab}/>}>
          <Route index element={<Main getFlights={getFlights} flights={flights} setFlights={setFlights} />}/>
          <Route path="register" element={<Register setShowlogin={setShowlogin}/>}/>
          <Route path="flights" element={<Flights flights={flights} flightInfo={flightInfo} setFlightInfo={setFlightInfo} formatDate={formatDate}/>}/>
          {/* Change to flights/:flightId */}
          <Route path="flight-overview" element={<FlightOverview formatDate={formatDate} user={user} setShowlogin={setShowlogin}/>}/> 
          <Route path="flight-seats" element={<FlightSeats formatDate={formatDate} user={user}/>}/>
          <Route path="flight-payment" element={<FlightPayment formatDate={formatDate} user={user}/>}/>
        </Route>
      </Routes>
      </BrowserRouter>
    {showlogin && <LoginOverlay setShowlogin={setShowlogin} login={login}/>}
    {showUserTab && <MemberInfo setShowUserTab={setShowUserTab} user={user} logout={logout}/>}
    </div>
  );
}

export default App;
