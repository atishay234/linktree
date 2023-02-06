import axios from "axios";
import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { Oval } from "react-loader-spinner";
// import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import useHandleChange from "./hooks/useHandleChange";
import { LogginContext } from "./Linktree";

function Login() {
  const context = useContext(LogginContext);
  const history = useHistory();
  const [username, handleChangeUsername, handleResetUsername] =
    useHandleChange("");
  const [password, handleChangePassword, handleResetPassword] =
    useHandleChange("");

  const [isLoading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    console.log(isLoading);
    setLoading(true);
    e.preventDefault();
    if (!username.length || !password.length) {
      console.log(isLoading);
      setLoading(false);
      return alert("Fill all the entries.");
    }
    const res = await axios.post("http://localhost:8080/account/login", {
      username,
      password,
    });
    if (
      res.data === "incorrect password" ||
      res.data === "user dose not exist"
    ) {
      handleResetUsername();
      handleResetPassword();
      setLoading(false);
      return alert("Incorrect Credential. Try again");
    } else {
      window.sessionStorage.setItem("userdata", JSON.stringify(res.data));

      const linktree = await axios.post(
        `http://localhost:8080/linktree/${res.data._id}`
      );
      window.sessionStorage.setItem("linktree", JSON.stringify(linktree.data));
      context.setLoggedIn(true);
      setLoading(false);
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
          onChange={handleChangePassword}
        />
      </div>
      <br />
      <button
        type="submit"
        className={
          `btn btn-large shadow-none submit-button w-100 ` +
          (isLoading && "disable")
        }
      >
        {isLoading ? (
          <div className="spinner">
            <Oval
              height={20}
              width={20}
              color="#808080"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
              ariaLabel="oval-loading"
              secondaryColor="white"
              strokeWidth={5}
              strokeWidthSecondary={5}
            />
          </div>
        ) : (
          <span>Login</span>
        )}
      </button>
    </form>
  );
}

export default Login;
