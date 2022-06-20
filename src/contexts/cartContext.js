import { useReducer, createContext } from "react";
import cartList from "../db/carts";

export const CartContext = createContext();

const initialState = [];

function reducer(state, action) {
  switch (action.type) {
    case "get":
      return action.payload;
    default:
      throw new Error();
  }
}

export function cartGet(dispatch) {
  return dispatch({
    type: "get",
    payload: cartList,
  });
}

export function cartAdd(dispatch, productId, quantity) {
  let cartProduct = cartList.find((element) => element.productId === productId);

  if (cartProduct) {
    cartProduct.quantity += quantity;
  } else {
    cartProduct = { productId: productId, quantity: 1 };
    cartList.push(cartProduct);
  }

  console.log(cartProduct.quantity);

  return dispatch({
    type: "get",
    payload: cartList,
  });
}

export function cartRemove() {
  console.log("Remove");
}

export function cartUpdate() {
  console.log("Update");
}

export function cartCheckout() {
  console.log("Checkout");
}

export default function CartProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <CartContext.Provider value={[state, dispatch]}>
      {children}
    </CartContext.Provider>
  );
}
