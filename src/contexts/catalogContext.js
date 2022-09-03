import { useReducer, createContext } from "react";
import fetchedProductList from "db/products";

export const CatalogContext = createContext();

const initialState = { catalog: [], filteredProducts: [] };

function reducer(state, { type, value }) {
  switch (type) {
    case "GET": {
      const getProducts = !value.productIds
        ? fetchedProductList.map((_product) => _product)
        : value.productIds.map((_id) =>
            fetchedProductList.find((_product) => _product.id === _id)
          );

      return { ...state, catalog: getProducts };
    }

    case "FILTER": {
      const searchQuery = value.searchQuery.toLowerCase();

      const filteredProducts = state.catalog.filter((_catalogItem) =>
        _catalogItem.title.toLowerCase().includes(searchQuery)
      );

      return { ...state, filteredProducts: filteredProducts };
    }

    default:
      return state;
  }
}

export function catalogGet(dispatch, productIds) {
  return dispatch({
    type: "GET",
    value: { productIds: productIds },
  });
}

export function catalogFilter(dispatch, searchQuery) {
  return dispatch({
    type: "FILTER",
    value: { searchQuery: searchQuery },
  });
}

export default function CatalogProvider({ children }) {
  const [catalogState, catalogDispatch] = useReducer(reducer, initialState);

  return (
    <CatalogContext.Provider value={[catalogState, catalogDispatch]}>
      {children}
    </CatalogContext.Provider>
  );
}
