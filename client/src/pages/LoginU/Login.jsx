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
      <div className="box">
        <h1 className="heading">Log In</h1>
        <button className="google_btn" onClick={googleAuth}>
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="google icon"
          />
          <span>Log in with Google</span>
        </button>
        <div class="down">
          <p class="text-xs">
            By proceeding, you agree to our
            <a href="/privacy-policy/" class="underline">
              Terms of Use
            </a>
            and confirm you have read our
            <a href="/privacy-policy/" class="underline">
              Privacy and Cookie Statement
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
