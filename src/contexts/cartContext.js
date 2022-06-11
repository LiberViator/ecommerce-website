import { useState, useEffect, createContext } from "react";

// const { userData } = useUserData(0);
// const userData = useContext(UserContext);
// const [cartData, setCartData] = useState(null);
export const CartContext = createContext();

export function cartAdd() {
  console.log("Add");
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
  return <CartContext.Provider value="">{children}</CartContext.Provider>;
}
