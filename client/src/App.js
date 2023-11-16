import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Login from "./pages/LoginU/Login.jsx";
import Mail from "./pages/Mail/Mail";
import Profile from "./pages/Profile/Profile";
import History from "./pages/History/History";
import Nav from "./pages/Nav/Nav";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);

  const getUser = async () => {
    try {
      const url = `${process.env.REACT_APP_API_URL}/auth/login/success`;
      const { data } = await axios.get(url, { withCredentials: true });
      setUser(data.user._json);
      console.log(user.sub);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="container">
      <Nav />
      <Routes>
        <Route
          exact
          path="/"
          element={user ? <Mail user={user} /> : <Navigate to="/login" />}
        />
        <Route
          path="/history"
          element={user ? <History user={user} /> : <Navigate to="/login" />}
        />
        <Route
          path="/profile"
          element={user ? <Profile user={user} /> : <Navigate to="/login" />}
        />
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
      </Routes>
    </div>
  );
}

export default App;
