import { useReducer, createContext } from "react";
import cartList from "../db/carts";

export const CartContext = createContext();

const initialState = [{ productId: 0, quantity: 1 }];

function reducer(state, { type, value }) {
  switch (type) {
    case "get":
      return JSON.parse(localStorage.getItem("cart"));
    case "add":
      let sameObj = state.find(
        (object) => object.productId === value.productId
      );
      let newAddState = state.filter((object) =>
        object === sameObj
          ? { ...object, quantity: (object.quantity += value.quantity) }
          : object
      );

      if (sameObj) {
        localStorage.setItem("cart", JSON.stringify(newAddState));
        return newAddState;
      } else {
        localStorage.setItem("cart", JSON.stringify([...state, value]));
        return [...state, value];
      }
    case "remove":
      let newRemoveState = state.filter((object) =>
        object.productId !== value.productId
          ? object
          : object.quantity > 1
          ? {
              ...object,
              quantity: (object.quantity -= 1),
            }
          : null
      );

      localStorage.setItem("cart", JSON.stringify(newRemoveState));
      return newRemoveState;
    default:
      return state;
  }
}

export function cartGet(dispatch) {
  return dispatch({
    type: "get",
    payload: cartList,
  });
}

export function cartAdd(dispatch, productId, quantity) {
  localStorage.setItem("cart", "Tom");

  return dispatch({
    type: "add",
    value: { productId: productId, quantity: quantity },
  });
}

export function cartRemove(dispatch, productId) {
  return dispatch({
    type: "remove",
    value: { productId: productId },
  });
}

export function cartUpdate() {
  console.log("Update");
}

export function cartCheckout() {
  console.log("Checkout");
}

export default function CartProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  // useEffect(() => )

  return (
    <CartContext.Provider value={[state, dispatch]}>
      {children}
    </CartContext.Provider>
  );
}
