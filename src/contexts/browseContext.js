import { useEffect, useReducer, createContext } from "react";

export const BrowseContext = createContext();

const initialState = { searchQuery: "", filteredProducts: [] };

function reducer(state, { type, value }) {
  switch (type) {
    case "FILTER": {
      const [catalog] = useContext(CatalogContext);
      const filteredProducts =
        state.searchQuery.length > 0
          ? catalog.filter((_catalogItem) =>
              _catalogItem.title.includes(search)
            )
          : [];

      return { ...state, filteredProducts: filteredProducts };
    }

    case "SEARCH_QUERY": {
      return { ...state, searchQuery: value };
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

export default function BrowseProvider({ children }) {
  const [browseState, browseDispatch] = useReducer(reducer, initialState);

  return (
    <BrowseContext.Provider value={[browseState, browseDispatch]}>
      {children}
    </BrowseContext.Provider>
  );
}
