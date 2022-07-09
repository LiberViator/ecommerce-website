import { useEffect, useReducer, createContext } from "react";
import cartList from "../db/carts";

export const CartContext = createContext();

const initialState = { cart: [], doUpload: false };

function reducer(state, { type, value }) {
  switch (type) {
    case "GET": {
      const getItem = JSON.parse(localStorage.getItem("cart"));

      if (!getItem) {
        localStorage.setItem("cart", []);
      } else {
        return { ...state, cart: getItem };
      }
      break;
    }

    case "ADD": {
      const isSame = state.cart.find(
        (object) =>
          object.productId === value.productId &&
          object.color === value.color &&
          object.size === value.size
      );

      const newState = state.cart.map((object) =>
        object === isSame
          ? { ...object, quantity: (object.quantity += value.quantity) }
          : object
      );

      if (isSame) {
        return { ...state, cart: newState, doUpload: true };
      } else {
        return { ...state, cart: [...state.cart, value], doUpload: true };
      }
    }

    case "REMOVE": {
      const isSame = state.cart.find(
        (object) =>
          object.productId === value.productId &&
          object.color === value.color &&
          object.size === value.size
      );

      const newState = state.cart.filter((object) =>
        object !== isSame
          ? object
          : object.quantity > 1
          ? {
              ...object,
              quantity: (object.quantity -= 1),
            }
          : null
      );

      return { ...state, cart: newState, doUpload: true };
    }

    case "SET": {
      const isSame = state.cart.find(
        (object) =>
          object.productId === value.productId &&
          object.color === value.color &&
          object.size === value.size
      );

      const newState = state.cart.map((object) =>
        object === isSame && value.quantity >= 1
          ? { ...object, quantity: value.quantity }
          : object
      );

      return { ...state, cart: newState, doUpload: true };
    }

    case "UPLOAD": {
      if (state.doUpload) {
        localStorage.setItem("cart", JSON.stringify(state.cart));
        return { ...state, cart: state.cart, doUpload: false };
      }
      break;
    }

    default:
      return state;
  }
}

export function cartGet(dispatch) {
  return dispatch({
    type: "GET",
  });
}

export function cartUpload(dispatch) {
  return dispatch({
    type: "UPLOAD",
  });
}

export function cartAdd(dispatch, productId, color, size, quantity) {
  return dispatch({
    type: "ADD",
    value: {
      productId: productId,
      color: color,
      size: size,
      quantity: quantity,
    },
  });
}

export function cartRemove(dispatch, productId, color, size) {
  return dispatch({
    type: "REMOVE",
    value: { productId: productId, color: color, size: size },
  });
}

export function cartSet(dispatch, productId, color, size, quantity) {
  return dispatch({
    type: "SET",
    value: {
      productId: productId,
      color: color,
      size: size,
      quantity: quantity,
    },
  });
}

export function cartCheckout() {
  console.log("Checkout");
}

export default function CartProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  window.addEventListener("beforeunload", () => cartUpload(dispatch));

  useEffect(() => {
    cartGet(dispatch);
  }, []);

  return (
    <CartContext.Provider value={[state, dispatch]}>
      {children}
    </CartContext.Provider>
  );
}
