import { Link } from "react-router-dom";

function LoginErrorPage() {
  return (
    <div className="login-signup-container">
      <img src={"../../public/sadface.png"} />
      <h1 className="text-2xl">
        Oops! There was an error with your email and password.
      </h1>

      <Link to={"/loginerror"} Home />
    </div>
  );
}

export default LoginErrorPage;
