import { createContext, useEffect, useReducer } from "react";
import { reducer } from "./reducer";
import { data } from "../data";

const getInitialValue = () => {
  
  const storedData = JSON.parse(localStorage.getItem("data"));
  const storedFilter = JSON.parse(localStorage.getItem("filter"));
  const storedFilteredData = JSON.parse(localStorage.getItem("filterData"));
  return {
    data: storedData || data,
    filteredData: storedFilteredData || data,
    selectedFilters: storedFilter || null,
  };
};

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, getInitialValue());

  useEffect(() => {
    
    localStorage.setItem("data", JSON.stringify(state.data));
    localStorage.setItem("filter", JSON.stringify(state.selectedFilters));
    localStorage.setItem("filterData", JSON.stringify(state.filteredData));
  }, [state]);

  return (
    <DataContext.Provider value={{ state, dispatch }}>
      {children}
    </DataContext.Provider>
  );
};