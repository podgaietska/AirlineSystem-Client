import './App.css';
import Layout from "./components/Layout";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./pages/Main";
import Register from "./pages/Register";
import { useState } from "react";
import LoginOverlay from "./components/LoginOverlay";
import Flights from "./pages/Flights";
import FlightOverview from "./pages/FlightOverview";


function App() {
  const [showlogin, setShowlogin] = useState(false);

  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout setShowlogin={setShowlogin}/>}>
          <Route index element={<Main />}/>
          <Route path="register" element={<Register setShowlogin={setShowlogin}/>}/>
          <Route path="flights" element={<Flights />}/>
          {/* Cahnge to flights/:flightId */}
          <Route path="flightOverview" element={<FlightOverview />}/> 
        </Route>
      </Routes>
      </BrowserRouter>
    {showlogin && <LoginOverlay setShowlogin={setShowlogin}/>}
    </div>
  );
}

export default App;
