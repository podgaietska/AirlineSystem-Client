function MemberInfo({setShowUserTab, user, logout}){
    return(
        <div className="member-overlay">
            <div className="member-container">
                <div className="member-container-inner">
                    <div className="name-welcome">
                        <h2>Welcome, {user.fname}!</h2>
                        <p>Your Membership Number: {user.membershipNum}</p>
                    </div>
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
                    <div className="user-actions">
                        <button>View Bookings</button>
                        <button onClick={logout}>Sign Out</button>
                    </div>
                </div>
                <button className="user-tab-close-btn" onClick={() => setShowUserTab(false)}>x</button>
            </div>
        </div>
    )
}

export default MemberInfo;