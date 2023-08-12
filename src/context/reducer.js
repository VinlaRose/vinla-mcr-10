
export const reducer = (state, action) => {
    switch (action.type) {
      case "FETCH_DATA": 
        return {
          ...state,
          data: action.payload,
          filteredData: action.payload,
        };
        case "FILTER_DEPARTMENT":
            return{
                ...state,
                filteredData: action.payload,
            }
      case "SORTING":
        return {
          ...state,
          filteredData: action.payload,
        };
        case "SELECTED_FILTER":
        return {
          ...state,
          selectedFilters: action.payload,
          filteredData:  action.payload === 'all' 
          ? state.data 
          : state.data.filter((product) => product.department === action.payload)
        };
        case "LOW_STOCK_FILTER":
          return {
            ...state,
            filteredData: action.payload,

          };
          case "UPDATE":
          return {
            ...state,
            filteredData: action.payload,

          };
        
      default:
        return state;
    }
  };
  
  