import { configureStore } from "@reduxjs/toolkit";
import ApiReducer from "../reducer/apiCartReducer";
import thunk from "redux-thunk";
import { productQuantity } from "../reducer/addProductsReducer";
import { persistReducer } from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage';

// const persistConfig={
//     key:"root",
//     version:1,
//     storage,
// };
// const reducer=combineReducers({
//     ApiReducer:ApiReducer, productQuantity:productQuantity.reducer

// })
// const persistReducerr=persistReducer(persistConfig,reducer);
export default configureStore({
    // reducer:persistReducerr, 
    reducer:{
        productQuantity:productQuantity.reducer,ApiReducer:ApiReducer
    },
    middleware:[thunk],
})