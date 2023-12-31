import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faHouse, faComment, faGear } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";

function Navbar({isLoggedIn}) {

  return (
    <>
    { isLoggedIn? 
      <nav className="max-w-[60vw] fixed bottom-0 left-0 right-0 bg-white flex justify-around items-center mx-auto h-12">
        <div className="custom-flex-center">
          <NavLink to="/find-roomie">
            <FontAwesomeIcon icon={faUser} className="hover:text-sky-700" />
          </NavLink>
        </div>
        <div className="custom-flex-center">
          <NavLink to="/find-property">
            <FontAwesomeIcon icon={faHouse} className="hover:text-sky-700" />
          </NavLink>
        </div>
        <div className="custom-flex-center">
          <NavLink to="/chat">
            <FontAwesomeIcon icon={faComment} className="hover:text-sky-700" />
          </NavLink>
        </div>
        <div className="custom-flex-center">
          <NavLink to="/settings">
            <FontAwesomeIcon icon={faGear} className="hover:text-sky-700" />
          </NavLink>
        </div>
      </nav> : null 
    }
      
    </>
  );
}

export default Navbar;
