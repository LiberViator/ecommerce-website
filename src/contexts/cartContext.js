import { useState, useEffect, createContext } from "react";

// const { userData } = useUserData(0);
// const userData = useContext(UserContext);
// const [cartData, setCartData] = useState(null);

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

// useEffect(() => {
//   userData &&
//     fetch("./data/users.json")
//       .then((res) => res.json())
//       .then((json) => {
//         setCartData(json.find((element) => element.id === userData.id).cart);
//       });
// }, [userData]);

export const CartContext = createContext();

export default function CartProvider({ children }) {
  return <CartContext.Provider value="">{children}</CartContext.Provider>;
}
