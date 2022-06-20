import { useReducer, createContext } from "react";
import productList from "../db/products";

export const CatalogContext = createContext();

const initialState = [];

function reducer(state, action) {
  switch (action.type) {
    case "get":
      return action.payload;
    default:
      throw new Error();
  }
}

export function catalogGet(dispatch, productId) {
  const products = productId.map((id) =>
    productList.find((product) => product.id === id)
  );

  return dispatch({
    type: "get",
    payload: products,
  });
}

export default function CatalogProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <CatalogContext.Provider value={[state, dispatch]}>
      {children}
    </CatalogContext.Provider>
  );
}
