import "./css/Navbar.css";

import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useContext } from "react";
import { LogginContext } from "./Linktree";

function Navbar() {
  const context = useContext(LogginContext);
  const history = useHistory();
  const logout = () => {
    window.sessionStorage.removeItem("userdata");
    window.sessionStorage.removeItem("linktree");
    context.setLoggedIn(false);
    history.push("/");
  };
  return (
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <a class="navbar-brand" href="#" style={{ fontSize: "30px" }}>
        Linktree
      </a>
      <div style={{ marginLeft: "auto", marginRight: "20px" }}>
        {!context.loggedIn ? (
          <Link to="/">
            <button class="btn btn-outline-light" type="submit">
              Check In
            </button>
          </Link>
        ) : (
          <Link to="/" onClick={logout}>
            <button class="btn btn-outline-light" type="submit">
              Logout
            </button>
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
