import { Link } from "react-router-dom";

function ErrorPage() {
  return (
    <div className="login-signup-container">
      <img src={"../../public/sadface.png"} />
      <h1 className="text-2xl">Oops! There was an error.</h1>

      <Link to={"/"} Home />
    </div>
  );
}

export default ErrorPage;
