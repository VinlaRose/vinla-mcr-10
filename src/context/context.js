import { createContext, useEffect, useReducer } from "react";
import { reducer } from "./reducer";
import { data } from "../data";

const getInitialValue = () => {
  
  const storedData = JSON.parse(localStorage.getItem("data"));
  return {
    data: storedData || data,
    filteredData: storedData || data,
  };
};

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, getInitialValue());

  useEffect(() => {
    
    localStorage.setItem("data", JSON.stringify(state.data));
  }, [state.data]);

  return (
    <DataContext.Provider value={{ state, dispatch }}>
      {children}
    </DataContext.Provider>
  );
};