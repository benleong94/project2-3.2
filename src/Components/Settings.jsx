import { Link } from "react-router-dom";

function Settings({ isLoggedIn, handleSignOut, user }) {
  return (
    <div>
      <div className="settings-container">
        <div>
          <h1>Email:</h1>
          <input type="text" value={user.email} />
        </div>

        <div>
          <h1>Old Password</h1>
          <input type="password" value={""} />
        </div>

        <div>
          <h1>New Password</h1>
          <input type="password" value={""} />
        </div>

        <Link to={"/profilepage"}>Your Profile</Link>

        <Link onClick={handleSignOut}>Sign Out</Link>
      </div>
    </div>
  );
}

export default Settings;
