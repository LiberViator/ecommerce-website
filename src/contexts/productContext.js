import { useReducer, createContext } from "react";
import productList from "../db/products";

export const ProductContext = createContext();

const initialState = {
  product: null,
  quantity: 1,
  color: undefined,
  size: undefined,
};

function reducer(state, { type, value }) {
  switch (type) {
    case "get":
      return {
        ...state,
        product: value.product,
        color: value.color,
        size: value.size,
      };
    case "color":
      return {
        ...state,
        color: value.color,
      };
    case "size":
      return {
        ...state,
        size: value.size,
      };
    case "quantity":
      return {
        ...state,
        quantity: value.quantity,
      };
    default:
      return state;
  }
}

export function productGet(dispatch, productId) {
  const productData = productList.find((element) => element.id === productId);

  return dispatch({
    type: "get",
    value: {
      product: productData,
      color: productData.colors[0],
      size: productData.sizes[0],
    },
  });
}

export function productSetColor(dispatch, color) {
  return dispatch({
    type: "color",
    value: {
      color: color,
    },
  });
}

export function productSetSize(dispatch, size) {
  return dispatch({
    type: "size",
    value: {
      size: size,
    },
  });
}

export function productSetQuantity(dispatch, quantity) {
  return dispatch({
    type: "quantity",
    value: {
      quantity: Number(quantity),
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
