import { useReducer, createContext } from "react";
import productList from "../db/products";

export const ProductContext = createContext();

const initialState = {
  product: null,
  quantity: 1,
  color: undefined,
  size: undefined,
};

function reducer(state, action) {
  switch (action.type) {
    case "get":
      return {
        ...state,
        product: action.payload.product,
        color: action.payload.color,
        size: action.payload.size,
      };
    case "color":
      return {
        ...state,
        color: action.payload.color,
      };
    case "size":
      return {
        ...state,
        size: action.payload.size,
      };
    case "quantity":
      return {
        ...state,
        quantity: action.payload.quantity,
      };
    default:
      throw new Error();
  }
}

export function productGet(dispatch, productId) {
  const productData = productList.find((element) => element.id === productId);

  return dispatch({
    type: "get",
    payload: {
      product: productData,
      color: productData.colors[0],
      size: productData.sizes[0],
    },
  });
}

export function productSetColor(dispatch, color) {
  return dispatch({
    type: "color",
    payload: {
      color: color,
    },
  });
}

export function productSetSize(dispatch, size) {
  return dispatch({
    type: "size",
    payload: {
      size: size,
    },
  });
}

export function productSetQuantity(dispatch, quantity) {
  return dispatch({
    type: "quantity",
    payload: {
      quantity: quantity,
    },
  });
}

export default function ProductProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <ProductContext.Provider value={[state, dispatch]}>
      {children}
    </ProductContext.Provider>
  );
}
