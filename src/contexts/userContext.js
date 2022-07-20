import { useReducer, createContext } from "react";
import userList from "../db/users";

export const UserContext = createContext();

const initialState = { user: null, isLogged: false };

function reducer(state, { type, value }) {
  switch (type) {
    case "LOGIN":
      return {
        ...state,
        user: value.user,
        isLogged: true,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
        isLogged: false,
      };
    case "CREATE":
      return {
        ...state,
        user: value.user,
        isLogged: true,
      };
    case "REMOVE":
      return {
        ...state,
        user: null,
        isLogged: false,
      };
    case "UPDATE":
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
    type: "LOGIN",
    value: { user: userData },
  });
}

export function userLogout(dispatch) {
  return dispatch({
    type: "LOGOUT",
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
    type: "CREATE",
    value: { user: userData },
  });
}

export function userRemove(dispatch, email, password) {
  return dispatch({
    type: "REMOVE",
  });
}

export function userUpdate(dispatch) {
  return dispatch({
    type: "UPDATE",
    value: { user: null },
  });
}

export default function UserProvider({ children }) {
  const [userState, userDispatch] = useReducer(reducer, initialState);

  return (
    <UserContext.Provider value={[userState, userDispatch]}>
      {children}
    </UserContext.Provider>
  );
}
