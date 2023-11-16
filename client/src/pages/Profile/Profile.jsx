import "./profile.css";

function Home(userDetails) {
  const user = userDetails.user;
  const logout = () => {
    window.open(`${process.env.REACT_APP_API_URL}/auth/logout`, "_self");
  };
  return (
    <div className="container">
      <h1 className="heading">Profile</h1>
      <div className="form_container">
        <div className="right">
          <h2 className="from_heading">User</h2>
          <img src={user.picture} alt="profile" className="profile_img" />
          <input
            type="text"
            defaultValue={user.name}
            className="input"
            placeholder="UserName"
          />
          <input
            type="text"
            defaultValue={user.email}
            className="input"
            placeholder="Email"
          />
          <button className="btn" onClick={logout}>
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
