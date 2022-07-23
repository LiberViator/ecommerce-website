import { useReducer, createContext } from "react";

import productList from "db/products";

export const ProductContext = createContext();

const initialState = {
  product: null,
  quantity: 1,
  color: undefined,
  size: undefined,
};

function reducer(state, { type, value }) {
  switch (type) {
    case "GET":
      return {
        ...state,
        product: value.product,
        color: value.color,
        size: value.size,
      };
    case "COLOR":
      return {
        ...state,
        color: value.color,
      };
    case "SIZE":
      return {
        ...state,
        size: value.size,
      };
    case "QUANTITY":
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
    type: "GET",
    value: {
      product: productData,
      color: productData.colors ? productData.colors[0] : undefined,
      size: productData.sizes ? productData.sizes[0] : undefined,
    },
  });
}

export function productSetColor(dispatch, color) {
  return dispatch({
    type: "COLOR",
    value: {
      color: color,
    },
  });
}

export function productSetSize(dispatch, size) {
  return dispatch({
    type: "SIZE",
    value: {
      size: size,
    },
  });
}

export function productSetQuantity(dispatch, quantity) {
  return dispatch({
    type: "QUANTITY",
    value: {
      quantity: Number(quantity),
    },
  });
}

export default function ProductProvider({ children }) {
  const [productState, productDispatch] = useReducer(reducer, initialState);

  return (
    <ProductContext.Provider value={[productState, productDispatch]}>
      {children}
    </ProductContext.Provider>
  );
}
