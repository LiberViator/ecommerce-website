import { useReducer, createContext } from "react";

import fetchedProductList from "db/products";

export const ProductContext = createContext();

const initialState = {
  product: null,
  quantity: 1,
  color: undefined,
  size: undefined,
};

function reducer(state, { type, value }) {
  switch (type) {
    case "GET": {
      const productData =
        fetchedProductList.find(
          (_product) => _product.id === value.productId
        ) || undefined;

      if (!productData) return { ...state };

      return {
        ...state,
        product: productData,
        color: productData.colors[0],
        size: productData.sizes[0],
      };
    }

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
        quantity: value.quantity < 1 ? 1 : value.quantity,
      };
    default:
      return state;
  }
}

export function productGet(dispatch, productId) {
  return dispatch({
    type: "GET",
    value: {
      productId: productId,
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
