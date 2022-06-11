import { useState, useEffect, createContext } from "react";

// Server
const productList = [
  {
    id: 0,
    title: "Polarstjärna - Camping Tent for Hiking and Outdoor",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tincidunt pellentesque placerat sed elementum aliquet. Dignissim posuere volutpat nulla ornare facilisi amet.",
    price: "$99,00",
    quantity: 10,
    colors: ["Navy Green", "Blue", "Orange"],
    sizes: ["Small", "Medium", "Large"],
    images: [
      "/assets/first-hammock.jpg",
      "https://images.unsplash.com/photo-1519095614420-850b5671ac7f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80",
      "https://images.unsplash.com/photo-1523297741243-79e695ee9a44?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80",
      "https://images.unsplash.com/photo-1567496662086-7cba3cf0de3a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80",
      "https://images.unsplash.com/photo-1519095614420-850b5671ac7f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80",
      "https://images.unsplash.com/photo-1523297741243-79e695ee9a44?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80",
      "https://images.unsplash.com/photo-1567496662086-7cba3cf0de3a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80",
    ],
    reviews: [
      {
        title: "",
        body: "",
        rate: 4,
      },
      {
        title: "",
        body: "",
        rate: 3,
      },
    ],
  },
  {
    id: 1,
    title: "test",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tincidunt pellentesque placerat sed elementum aliquet. Dignissim posuere volutpat nulla ornare facilisi amet.",
    price: {
      current: "$99,00",
      old: "$119,00",
    },
    quantity: 10,
    colors: ["Navy Green", "Blue", "Orange"],
    sizes: ["Small", "Medium", "Large"],
    images: [
      "/assets/first-hammock.jpg",
      "https://images.unsplash.com/photo-1519095614420-850b5671ac7f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80",
      "https://images.unsplash.com/photo-1523297741243-79e695ee9a44?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80",
      "https://images.unsplash.com/photo-1567496662086-7cba3cf0de3a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80",
      "https://images.unsplash.com/photo-1519095614420-850b5671ac7f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80",
      "https://images.unsplash.com/photo-1523297741243-79e695ee9a44?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80",
      "https://images.unsplash.com/photo-1567496662086-7cba3cf0de3a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80",
    ],
    reviews: [
      {
        title: "",
        body: "",
        rate: 4,
      },
      {
        title: "",
        body: "",
        rate: 3,
      },
    ],
  },
];

// Client
const initialState = {
  product: null,
  quantity: 1,
  color: undefined,
  size: undefined,
};

function reducer(state, action) {
  switch (action.type) {
    case "get":
      return {
        ...state,
        product: action.payload.product,
        color: action.payload.color,
        size: action.payload.size,
      };
    default:
      throw new Error();
  }
}

export function productGet(dispatch, productId) {
  let productData = productList.find((element) => element.id === productId);

  return dispatch({
    type: "get",
    payload: {
      product: productData,
      color: productData.colors[0],
      size: productData.sizes[0],
    },
  });
}

export function productAdd() {}

export function productRemove() {}

export function productUpdate() {}

export const ProductContext = createContext();

export default function ProductProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <ProductContext.Provider value={(state, dispatch)}>
      {children}
    </ProductContext.Provider>
  );
}
