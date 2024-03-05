import React, { createContext, useContext, useReducer } from "react";

const ShowContext = createContext();

const initialState = {
  isShowForm: false,
  isShowList: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SHOW_FORM":
      return { ...state, isShowForm: !state.isShowForm };
    case "SHOW_LIST":
      return { ...state, isShowList: !state.isShowList };
    default:
      return state;
  }
};

function ShowContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <ShowContext.Provider value={[state, dispatch]}>
      {children}
    </ShowContext.Provider>
  );
}

export const useShowContext = () => {
  const [state, dispatch] = useContext(ShowContext);
  return { state, dispatch };
};

export default ShowContextProvider;
