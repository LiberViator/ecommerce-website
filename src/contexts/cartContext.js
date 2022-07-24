import { useEffect, useReducer, createContext } from "react";
import cartList from "db/carts";

export const CartContext = createContext();

const initialState = { cart: [], doUpload: false };

function reducer(state, { type, value }) {
  switch (type) {
    case "GET": {
      const getItem = JSON.parse(localStorage.getItem("cart"));

      if (!getItem) {
        localStorage.setItem("cart", JSON.stringify([]));
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

      const newState = state.cart.map((_object) =>
        _object === isSame
          ? { ..._object, quantity: (_object.quantity += value.quantity) }
          : _object
      );

      if (isSame) {
        return { ...state, cart: newState, doUpload: true };
      } else {
        return { ...state, cart: [...state.cart, value], doUpload: true };
      }
    }

    case "REMOVE": {
      const isSame = state.cart.find(
        (_object) =>
          _object.productId === value.productId &&
          _object.color === value.color &&
          _object.size === value.size
      );

      const newState = state.cart.filter((_object) =>
        _object !== isSame
          ? _object
          : _object.quantity > 1
          ? {
              ..._object,
              quantity: (_object.quantity -= 1),
            }
          : null
      );

      return { ...state, cart: newState, doUpload: true };
    }

    case "SET": {
      const isSame = state.cart.find(
        (_object) =>
          _object.productId === value.productId &&
          _object.color === value.color &&
          _object.size === value.size
      );

      const newState = state.cart.map((_object) =>
        _object === isSame && value.quantity >= 1
          ? { ..._object, quantity: value.quantity }
          : _object
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

    case "CLEAR": {
      const getSession = sessionStorage.getItem("isFitstVisit");

      if (!getSession) {
        sessionStorage.setItem("isFitstVisit", JSON.stringify(true));
        localStorage.clear();
      } else {
        sessionStorage.setItem("isFitstVisit", JSON.stringify(false));
        return;
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

export function cartClear(dispatch) {
  return dispatch({
    type: "CLEAR",
  });
}

export function cartCheckout() {
  console.log("Checkout");
}

export default function CartProvider({ children }) {
  const [cartState, cartDispatch] = useReducer(reducer, initialState);

  window.addEventListener("beforeunload", () => cartUpload(cartDispatch));

  useEffect(() => {
    cartClear(cartDispatch);
    cartGet(cartDispatch);
  }, []);

  return (
    <CartContext.Provider value={[cartState, cartDispatch]}>
      {children}
    </CartContext.Provider>
  );
}
