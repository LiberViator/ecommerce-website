import { useReducer, createContext } from "react";
import productList from "../db/products";

export const CatalogContext = createContext();

const initialState = [];

function reducer(state, { type, value }) {
  switch (type) {
    case "get":
      return value;
    default:
      return state;
  }
}

export function catalogGet(dispatch, productId) {
  const products = productId.map((id) =>
    productList.find((product) => product.id === id)
  );

  return dispatch({
    type: "get",
    value: products,
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
