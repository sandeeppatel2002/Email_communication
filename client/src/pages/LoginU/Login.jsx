import "./login.css";

function Login() {
  const googleAuth = () => {
    window.open(
      `${process.env.REACT_APP_API_URL}/auth/google/callback`,
      "_self"
    );
  };
  return (
    <div className="container">
      <h1 className="heading">Log In</h1>
      <button className="google_btn" onClick={googleAuth}>
        <img src="./images/google.png" alt="google icon" />
        <span>Log in with Google</span>
      </button>
    </div>
  );
}

export default Login;
