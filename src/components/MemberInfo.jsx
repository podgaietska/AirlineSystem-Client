import {Link, useNavigate} from 'react-router-dom';
function MemberInfo({setShowUserTab, user, logout, getBookings, loginAsAgent, getAllFlights}){
    const navigate = useNavigate();

    const handleViewBookings = () => {
        getBookings(navigate);
        setShowUserTab(false);
    }

    const handleViewFlights = () => {
        setShowUserTab(false);
        navigate("/agent/flights");
    }

    const handleManagePromotions = () => {
        setShowUserTab(false);
        navigate("/agent/promotions");
    }

    const handleLogout = () => {
        logout();
        setShowUserTab(false);
        navigate("/");
    }

    return(
        <div className="member-overlay">
            <div className="member-container">
                <div className="member-container-inner">
                    <div className="name-welcome">
                        <h2>Welcome, {user.fname}!</h2>
                        {loginAsAgent ? <p>Your Employee Id: {user.employeeId}</p> : <p>Your Membership Number: {user.membershipNum}</p>}
                    </div>
                    {!loginAsAgent && (
                    <div className="other-user-info">
                        <h3>Your Personal Information:</h3>
                        <div className="user-details">
                            <p>{user.fname} {user.lname}</p>
                            <p>Email: {user.email}</p>
                            <p>Phone Number: {user.phone}</p>
                            <h4>Address:</h4>
                            <p>{user.address.apartment} {user.address.street}</p>
                            <p>{user.address.city}, {user.address.province}</p>
                            <p>{user.address.country}</p>
                            <p>{user.address.postalCode}</p>
                        </div>
                    </div>
                    )}
                    <div className="user-actions">
                        {loginAsAgent ? (
                            <>
                            <button onClick={handleViewFlights}>Browse Passengers</button>
                            <button onClick={handleManagePromotions}>Manage Promotions</button>
                            </>
                        )
                         : <Link><button onClick={handleViewBookings}>View Bookings</button></Link>}
                        <button onClick={handleLogout}>Sign Out</button>
                    </div>
                </div>
                <button className="user-tab-close-btn" onClick={() => setShowUserTab(false)}>x</button>
            </div>
        </div>
    )
}

export default MemberInfo;