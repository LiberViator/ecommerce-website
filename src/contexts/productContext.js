import { useState, useEffect, createContext } from "react";

export function productAdd() {}

export function productRemove() {}

export function productUpdate() {}

export function productCommentAdd() {}

export function productCommentRemove() {}

// const [productData, setProductData] = useState(null);

// useEffect(() => {
//   if (productId) {
//     fetch("./data/products.json")
//       .then((res) => res.json())
//       .then((json) => {
//         const array = [];
//         productId.map((element) =>
//           json.find((product) => product.id === element && array.push(product))
//         );
//         setProductData(array);
//       });
//   }
// }, productId);

export const ProductContext = createContext();

export default function ProductProvider({ children }) {
  return <ProductContext.Provider value="">{children}</ProductContext.Provider>;
}
