import { useReducer, createContext } from "react";
import productList from "../db/products";

export const CatalogContext = createContext();

const initialState = [];

function reducer(state, { type, value }) {
  switch (type) {
    case "GET":
      return value;
    default:
      return state;
  }
}

export function catalogGet(dispatch, productId) {
  const products = productId.map((_id) =>
    productList.find((_product) => _product.id === _id)
  );

  return dispatch({
    type: "GET",
    value: products,
  });
}

export default function CatalogProvider({ children }) {
  const [catalogState, catalogDispatch] = useReducer(reducer, initialState);

  return (
    <CatalogContext.Provider value={[catalogState, catalogDispatch]}>
      {children}
    </CatalogContext.Provider>
  );
}
