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
import FinalFlightDetails from "./pages/FinalFlightDetails";
import Bookings from "./pages/Bookings";
import AgentFlights from './pages/AgentFlights';
import PromotionManager from './pages/PromotionManager';
import { toast } from 'react-toastify';

function App() {
  const [showlogin, setShowlogin] = useState(false);
  const [showUserTab, setShowUserTab] = useState(false);
  const [flights, setFlights] = useState(localStorage.getItem('flights') ? JSON.parse(localStorage.getItem('flights')) : []);
  const [user, setUser] = useState(localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null);
  const [bookings, setBookings] = useState(localStorage.getItem('bookings') ? JSON.parse(localStorage.getItem('bookings')) : []);
  const [flightInfo, setFlightInfo] = useState(localStorage.getItem('flightInfo') ? JSON.parse(localStorage.getItem('flightInfo')) : null);
  const [loginAsAgent, setLoginAsAgent] = useState(localStorage.getItem('loginAsAgent') ? JSON.parse(localStorage.getItem('loginAsAgent')) : false);
  const [passengerList, setPassengerList] = useState(localStorage.getItem('passengerList') ? JSON.parse(localStorage.getItem('passengerList')) : []);

  const register = (fname, lname, email, phone, dateOfBirth, address, password, navigate) => {
    try {
      const fetchRegister = async () => {
        const res = await fetch('http://localhost:8080/api/v1/user/register', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            fname: fname,
            lname: lname,
            email: email,
            phone: phone,
            dateOfBirth: dateOfBirth,
            password: password,
            address: address
          })
        });

        if (!res.ok) {
          const response = await res.json();
          toast.error(response.error);
          return
        }

        const data = await res.json();
        setUser(data);
        localStorage.setItem('user', JSON.stringify(data));
        navigate('/');
        return
      }
      fetchRegister();
    } catch (error) {
      console.log(error);
    }
  }

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
          toast.error(response.error);
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

  const login = (email, password, navigate, location) => {
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
          toast.warn(response.error);
          return
        }
        const data = await res.json();
        console.log(data);
        setUser(data);
        localStorage.setItem('user', JSON.stringify(data));
        setShowlogin(false);
        if (location.pathname === '/register'){
          navigate('/');
        }
        return
      }
      fetchLogin();
    }
    catch(error){
      console.log(error);
    }
  }

  const loginAgent = (employeeId, password, navigate, location) => {
    try{
      const fetchLogin = async () => {
        const res = await fetch('http://localhost:8080/api/v1/agent/login', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            employeeId: employeeId,
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
        setLoginAsAgent(true);
        localStorage.setItem('user', JSON.stringify(data));
        localStorage.setItem('loginAsAgent', JSON.stringify(true));
        setShowlogin(false);
        if (location.pathname === '/register'){
          navigate('/');
        }
        return
      }
      fetchLogin();
    }
    catch(error){
      console.log(error);
    }
  }


  const logout = () => {
    const answer = window.confirm('Are you sure you want to log out?');
    setShowUserTab(false);
    if (answer){
      setUser(null);
      localStorage.removeItem('user');
      localStorage.removeItem('loginAsAgent');
      setLoginAsAgent(false);
    }
  }

  const getBookings = (navigate) => {
    localStorage.removeItem('bookings');
    try{
      const fetchBookings = async () => {
        console.log(user.id);
        const res = await fetch(`http://localhost:8080/api/v1/booking/user/${user.id}`, {
          method: 'GET',
          headers: {'Content-Type': 'application/json'},
        });
        if (!res.ok) {
          const response = await res.json();
          toast.error(response.error);
          console.log(response);
          return
        }

        const data = await res.json();
        console.log(data);
        setBookings(data);
        localStorage.setItem('bookings', JSON.stringify(data));
        navigate('/my-bookings');
        return
      }

      fetchBookings();
    }
    catch(error){
      console.log(error);
    }
  }

  const retrieveBooking = (bookingNumber, navigate) => {
    const sending = toast("Retreiving booking...");
    try{
      const fetchRetrieveBooking = async () => {
        const res = await fetch(`http://localhost:8080/api/v1/booking/${bookingNumber}`, {
          method: 'GET',
          headers: {'Content-Type': 'application/json'},
        });

        if (!res.ok) {
          const response = await res.json();
          toast.dismiss(sending);
          toast.error(response.error);
          console.log(response);
          return
        }

        const data = await res.json();
        console.log(data);
        setBookings(data);
        toast.dismiss(sending);
        navigate('/my-bookings');
        return
      }
      fetchRetrieveBooking();
    }
    catch(error){
      console.log(error);
    }
  }

  const cancelBooking = (bookingNumber) => {
    const sending = toast("Cancelling...");
    try{
      const fetchCancelBooking = async () => {
        const res = await fetch(`http://localhost:8080/api/v1/booking/cancel/${bookingNumber}`, {
          method: 'DELETE',
          headers: {'Content-Type': 'application/json'},
        });

        if (!res.ok) {
          const response = await res.json();
          toast.dismiss(sending);
          toast.error(response.error);
          console.log(response);
          return
        }

        
        const updatedBookings = bookings.filter(booking => booking.bookingNumber !== bookingNumber);
        setBookings(updatedBookings);
        console.log(updatedBookings);

        localStorage.setItem('bookings', JSON.stringify(updatedBookings));

        const data = await res.json();
        console.log(data);
        toast.dismiss(sending);
        toast.success("Booking cancelled successfully!");
        return
      }
      fetchCancelBooking();
    } catch(error){
      console.log(error);
    }
  }

  const getAllFlights = (navigate) => {
    try{
      const fetchAllFlights = async () => {
        const res = await fetch(`http://localhost:8080/api/v1/flight/all`, {
          method: 'GET',
          headers: {'Content-Type': 'application/json'},
        });

        if (!res.ok) {
          const response = await res.json();
          console.log(response);
          return
        }

        const data = await res.json();
        console.log(data);
        navigate('/agent/flights', {state: {flights: data}});
        return
      }
      fetchAllFlights();
    } catch(error){
      console.log(error);
    }
  }

  const getPassengerList = (flightNumber) => {
    try {
      const fetchPassengerList = async () => {
        const res = await fetch(`http://localhost:8080/api/v1/agent/${flightNumber}/passengers`, {
          method: 'GET',
          headers: {'Content-Type': 'application/json'},
        });

        if (!res.ok) {
          const response = await res.json();
          toast.error(response.error);
          console.log(response);
          return
        }

        const data = await res.json();
        console.log(data);
        setPassengerList(data);
        localStorage.setItem('passengerList', JSON.stringify(data));
        return
      }
      fetchPassengerList();
    } catch (error) {
      console.log(error);
    }
  }

  const sendPromotion = (subject, message) => {
    const sending = toast("Sending...");
    try{
      const fetchSendPromotion = async () => {
        const res = await fetch(`http://localhost:8080/api/v1/agent/promotion/send`, {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            subject: subject,
            message: message
          })
        });

        if (!res.ok) {
          toast.dismiss(sending);
          toast.success("Emails sent successfully!");
          const response = await res.json();
          console.log(response);
          return
        }

        const data = await res.json();
        console.log(data);
        toast.dismiss(sending);
        return
      }
      fetchSendPromotion();
    } catch (error) {
      console.log(error);
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
        <Route path="/" element={<Layout setShowlogin={setShowlogin} user={user} setShowUserTab={setShowUserTab} showUserTab={showUserTab} logout={logout} getBookings={getBookings} showlogin={showlogin} login={login} loginAsAgent={loginAsAgent} setLoginAsAgent={setLoginAsAgent} loginAgent={loginAgent} getAllFlights={getAllFlights}/>}>
          <Route index element={<Main getFlights={getFlights} flights={flights} setFlights={setFlights} retrieveBooking={retrieveBooking} bookings={bookings}/>}/>
          <Route path="register" element={<Register setShowlogin={setShowlogin} register={register}/>}/>
          <Route path="flights" element={<Flights flights={flights} flightInfo={flightInfo} setFlightInfo={setFlightInfo} formatDate={formatDate}/>}/>
          {/* Change to flights/:flightId */}
          <Route path="flight-overview" element={<FlightOverview formatDate={formatDate} user={user} setShowlogin={setShowlogin}/>}/> 
          <Route path="flight-seats" element={<FlightSeats formatDate={formatDate} user={user}/>}/>
          <Route path="flight-payment" element={<FlightPayment formatDate={formatDate} user={user}/>}/>
          <Route path="checkout" element={<FinalFlightDetails formatDate={formatDate} user={user}/>}/>
          <Route path="my-bookings" element={<Bookings formatDate={formatDate} user={user} cancelBooking={cancelBooking} bookings={bookings}/>}/>
          <Route path="member-info" element={<MemberInfo setShowUserTab={setShowUserTab} user={user} logout={logout} getBookings={getBookings}/>}/>
          <Route path="agent/flights" element={<AgentFlights formatDate={formatDate} user={user} passengerList={passengerList} getPassengerList={getPassengerList} setPassengerList={setPassengerList}/>}/>
          <Route path="agent/promotions" element={<PromotionManager formatDate={formatDate} user={user} sendPromotion={sendPromotion}/>} />
        </Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
