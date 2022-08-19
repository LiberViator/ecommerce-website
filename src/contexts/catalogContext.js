import { useReducer, createContext } from "react";
import productList from "db/products";

export const CatalogContext = createContext();

const initialState = [];

function reducer(state, { type, value }) {
  switch (type) {
    case "GET": {
      if (!productId) {
        const products = productList.map((_product) => _product);
        return { ...state, products };
      } else {
        const products = productId.map((_id) =>
          productList.find((_product) => _product.id === _id)
        );
        return;
      }
      return { ...state, products };
    }

    default:
      return state;
  }
}

export function catalogGet(dispatch, productId) {
  return dispatch({
    type: "GET",
    value: productId,
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
