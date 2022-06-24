import { useReducer, createContext } from "react";
import userList from "../db/users";

export const UserContext = createContext();

const initialState = { user: null, isLogged: false };

function reducer(state, { type, value }) {
  switch (type) {
    case "login":
      return {
        ...state,
        user: value.user,
        isLogged: true,
      };
    case "logout":
      return {
        ...state,
        user: null,
        isLogged: false,
      };
    case "create":
      return {
        ...state,
        user: value.user,
        isLogged: true,
      };
    case "remove":
      return {
        ...state,
        user: null,
        isLogged: false,
      };
    case "update":
      return {
        ...state,
        user: value.user,
      };
    default:
      return state;
  }
}

export function userLogin(dispatch, email, password) {
  let userData = userList.find((element) => element.email === email);

  if (!userData) {
    return alert("Incorrect Email or Password");
  }

  if (userData.password !== password) {
    return alert("Incorrect Email or Password");
  }

  return dispatch({
    type: "login",
    value: { user: userData },
  });
}

export function userLogout(dispatch) {
  return dispatch({
    type: "logout",
  });
}

export function userCreate(dispatch, email, password) {
  if (userList.find((element) => element.email === email)) {
    return alert("Account is already exist");
  }

  let userData = {
    id: 0,
    name: "",
    surname: "",
    email: `${email}`,
    password: `${password}`,
  };

  userList.push(userData);

  return dispatch({
    type: "create",
    value: { user: userData },
  });
}

export function userRemove(dispatch, email, password) {
  return dispatch({
    type: "remove",
  });
}

export function userUpdate(dispatch) {
  return dispatch({
    type: "update",
    value: { user: null },
  });
}

export default function UserProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <UserContext.Provider value={[state, dispatch]}>
      {children}
    </UserContext.Provider>
  );
}
