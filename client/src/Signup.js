import axios from "axios";
import useHandleChange from "./hooks/useHandleChange";

import { useHistory } from "react-router-dom";
import { useContext } from "react";

import { LogginContext } from "./Linktree";

function Signup() {
  const context = useContext(LogginContext);
  const history = useHistory();
  const [username, handleChangeUsername, handleResetUsername] =
    useHandleChange("");
  const [password, handleChangePassword, handleResetPassword] =
    useHandleChange("");
  const [repassword, handleChangeRePassword, handleResetRePassword] =
    useHandleChange("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username.length || !password.length || !repassword.length)
      return alert("Fill all the entries.");
    if (repassword !== password) return alert("Rewrite the same password");
    const user = await axios.post("http://localhost:8080/account/signup", {
      username,
      password,
    });
    if (typeof user.data === "string") {
      return alert(user.data);
    } else {
      // I could have used jwt but didn't bothered with it because it's just a dummy project
      window.sessionStorage.setItem("userdata", JSON.stringify(user.data));

      const linktree = await axios.post(
        `http://localhost:8080/linktree/${user.data._id}`
      );
      console.log(linktree, "linktree from the singup.js");
      window.sessionStorage.setItem("linktree", JSON.stringify(linktree.data));
      context.setLoggedIn(true);
      handleResetUsername();
      handleResetPassword();
      handleResetRePassword();
      history.push("/home");
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-field">
        <span htmlFor="username">
          <i
            className="ri-account-circle-fill ml-2 mr-2"
            style={{ fontSize: "1.5rem" }}
          ></i>
        </span>
        <input
          type="text"
          id="username"
          placeholder="Username..."
          value={username}
          onChange={handleChangeUsername}
        />
      </div>
      <br />
      <div className="form-field">
        <span htmlFor="password">
          <i
            className="ri-key-fill ml-2 mr-2"
            style={{ fontSize: "1.5rem" }}
          ></i>
        </span>
        <input
          type="password"
          id="password"
          placeholder="Password..."
          value={password}
          onChange={handleChangePassword}
        />
      </div>
      <br />
      <div className="form-field">
        <span htmlFor="password">
          <i
            className="ri-key-fill ml-2 mr-2"
            style={{ fontSize: "1.5rem" }}
          ></i>
        </span>
        <input
          type="password"
          id="repassword"
          placeholder="Rewrite Password..."
          value={repassword}
          onChange={handleChangeRePassword}
        />
      </div>
      <br />
      <button type="submit" className="btn btn-large shadow-none submit-button">
        Signup
      </button>
    </form>
  );
}

export default Signup;
