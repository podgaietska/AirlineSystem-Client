import { useState } from "react";
import { toast } from "react-toastify";

function PromotionManager({sendPromotion}) {
    const [subject, setSubject] = useState();
    const [message, setMessage] = useState();

    const handleSubmit = (e) => {
        e.preventDefault();

        sendPromotion(subject, message);
        setSubject("");
        setMessage("");
    }


  return (
    <div className="bookings-page">
            <div className="page-container">
                <div className="reg-text agent-search">
                    <h1>Construct Promotional Emails</h1>
                    <p>Choose the subject and message, email it to all registered users with one click!</p>
                </div>
                <form className="email-constructor" onSubmit={handleSubmit}>
                    <div className="subject-inputs">
                        <label htmlFor="subject">Email Subject</label>
                        <input type="text" name="subject" placeholder="Subject" value={subject} onChange={(e) => setSubject(e.target.value)} required/>
                    </div>
                    <div className="message-input">
                        <label htmlFor="message">Email Message</label>
                        <textarea type="text" name="message" placeholder="Your Message Here" value={message} onChange={(e) => setMessage(e.target.value)} required/>
                    </div>
                    <button type="submit" className="send-email-btn">Send</button>
                </form>
            </div>
        </div>
  );
}

export default PromotionManager;