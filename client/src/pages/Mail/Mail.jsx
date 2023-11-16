import "./mail.css";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Mail(userDetails) {
  const user = userDetails.user;
  const from = user.email;
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const sendEmail = async (e) => {
    e.preventDefault();

    try {
      // Send email
      const emailRes = await fetch(
        `${process.env.REACT_APP_API_URL}/api/emailSend`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from,
            to,
            subject,
            message,
          }),
        }
      );

      const emailData = await emailRes.json();
      console.log(to);

      if (emailData.status === 401 || !emailData) {
        console.log("Email sending error");
        // Handle error, e.g., show an alert
        alert("Error sending email");
      } else {
        // If email sent successfully, proceed to save it
        console.log("Email sent successfully");
        // Show success alert
        alert("Email sent successfully");

        // Clear form or update page as needed
        setTo("");
        setSubject("");
        setMessage("");

        // Save the email to your database
        const saveRes = await fetch(
          `${process.env.REACT_APP_API_URL}/fetch/post/${user.sub}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              from,
              to,
              subject,
              message,
            }),
          }
        );

        // Handle the save response if needed
        const saveData = await saveRes.json();
        console.log("Email saved:", saveData);
      }
    } catch (error) {
      console.error("Error:", error);
      // Handle unexpected errors, e.g., show an alert
      alert("Unexpected error");
    }
  };

  return (
    <div className="App">
      <ToastContainer position="bottom-center" limit={1} />
      <header className="App-header">
        <form onSubmit={sendEmail}>
          <h1>Send Email</h1>
          <div>
            <label htmlFor="email">To</label>
            <input onChange={(e) => setTo(e.target.value)} type="email"></input>
          </div>
          <div>
            <label htmlFor="subject">Subject</label>
            <input
              id="subject"
              type="text"
              onChange={(e) => setSubject(e.target.value)}
            ></input>
          </div>
          <div>
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
          </div>
          <div>
            <label></label>
            <button disabled={loading} type="submit">
              {loading ? "Sending..." : "Submit"}
            </button>
          </div>
        </form>
      </header>
    </div>
  );
}

export default Mail;
