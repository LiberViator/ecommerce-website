import { useState, useContext } from "react";

import {
  UserContext,
  userLogin,
  userLogout,
  userCreate,
} from "contexts/userContext";

export default function Home() {
  // const { id, name } = useContext(UserContext);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPass, setLoginPass] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPass, setRegPass] = useState("");

  const dispatch = useContext(UserContext);

  return (
    <>
      <div>Home</div>
      <form>
        <label>E-Mail</label>
        <input
          type="text"
          value={loginEmail}
          onChange={(e) => setLoginEmail(e.target.value)}
          required
        />
        <label>Password</label>
        <input
          type="text"
          value={loginPass}
          onChange={(e) => setLoginPass(e.target.value)}
          required
        />
        <button
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            userLogin(dispatch, loginEmail, loginPass);
          }}
        >
          Login
        </button>
      </form>
      <form>
        <label>E-Mail</label>
        <input
          type="text"
          value={regEmail}
          onChange={(e) => setRegEmail(e.target.value)}
          required
        />
        <label>Password</label>
        <input
          type="text"
          value={regPass}
          onChange={(e) => setRegPass(e.target.value)}
          required
        />
        <button
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            userCreate(dispatch, regEmail, regPass);
          }}
        >
          Register
        </button>
      </form>
      <button
        type="submit"
        onClick={(e) => {
          e.preventDefault();
          userLogout(dispatch);
        }}
      >
        Logout
      </button>
    </>
  );
}
