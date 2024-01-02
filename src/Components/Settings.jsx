import { Link } from "react-router-dom";

function Settings({ isLoggedIn, handleSignOut }) {
  return (
    <div>
      <div className="settings-container">
        <Link onClick={handleSignOut}>Your Profile</Link>

        <Link onClick={handleSignOut}>Sign Out</Link>
      </div>
    </div>
  );
}

export default Settings;
