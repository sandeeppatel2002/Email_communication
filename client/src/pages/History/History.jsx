import React, { useState, useEffect } from "react";
import axios from "axios";
import "./history.css";

function History(userDetails) {
  const user = userDetails.user;
  const [sentEmails, setSentEmails] = useState([]);

  useEffect(() => {
    const fetchEmails = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/fetch/email/${user.sub}`
        );
        const data = response.data;
        setSentEmails(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching emails:", error.message);
      }
    };

    fetchEmails();
  }, []);

  return (
    <div className="history-header">
      <h2>Email List</h2>
      <ul>
        {sentEmails.map((email) => (
          <li key={email._id}>
            <strong>From:</strong> {email.from}
            <br />
            <strong>To:</strong> {email.to}
            <br />
            <strong>Subject:</strong> {email.subject}
            <br />
            <strong>Message:</strong> {email.message}
            <br />
            <strong>Timestamp:</strong>{" "}
            {new Date(email.timestamp).toLocaleString()}
            <br />
            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default History;
