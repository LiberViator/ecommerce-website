import { useState, useEffect, useReducer, createContext } from "react";

// Server
const userList = [
  {
    id: 0,
    name: "",
    surname: "",
    email: "asd",
    password: "",
  },
];

// Client
const initialState = { userData: null, isLogged: false };

function reducer(state, action) {
  switch (action.type) {
    case "login":
      return {
        ...state,
        userData: action.payload.userData,
        isLogged: true,
      };
    case "logout":
      return {
        ...state,
        userData: null,
        isLogged: false,
      };
    case "create":
      return {
        ...state,
        userData: action.payload.userData,
        isLogged: true,
      };
    case "remove":
      return {
        ...state,
        userData: null,
        isLogged: false,
      };
    case "update":
      return {
        ...state,
        userData: action.payload.userData,
      };
    default:
      throw new Error();
  }
}

export function userLogin(dispatch, email, password) {
  let user = userList.find((element) => element.email === email);

  if (!user) {
    return alert("Incorrect Email or Password");
  }

  if (user.password !== password) {
    return alert("Incorrect Email or Password");
  }

  return dispatch({
    type: "login",
    payload: { userData: user },
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

  let user = {
    id: 0,
    name: "",
    surname: "",
    email: `${email}`,
    password: `${password}`,
  };

  userList.push(user);

  return dispatch({
    type: "create",
    payload: { userData: user },
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
    payload: { userData: null },
  });
}

export const UserContext = createContext();

export default function UserProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <UserContext.Provider value={(state, dispatch)}>
      {children}
    </UserContext.Provider>
  );
}
