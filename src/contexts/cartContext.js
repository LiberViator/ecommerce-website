import { useState, useEffect, createContext } from "react";


// const { userData } = useUserData(0);
// const userData = useContext(UserContext);
// const [cartData, setCartData] = useState(null);

// Server
const cartList = [{ userId: 0, productId: 0, quantity: 1 }];

// Client
export const CartContext = createContext();

const initialState = {};

export function cartAdd(productId, quantity) {
  let cartData = cartList.find((element) => element.){
    id: 0,
    name: "",
    surname: "",
    email: `${email}`,
    password: `${password}`,
  };

  cartList.push(userData);
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
