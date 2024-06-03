import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "../slice/LoginSlice";
import registerReducer from "../slice/RegisterSlice";
const store = configureStore({
    reducer: {
      login : loginReducer,
      register : registerReducer
    },
  });
  
export default store;
  