import axios from "axios";
import { ActionType } from "./actionType";

export const fetchProducts=()=>{
   
    return async function(dispatch){
        dispatch({type:ActionType.FETCH_PENDING})
        const {data}=await axios.get('https://dummyjson.com/products').catch((err)=>{
            dispatch({type:ActionType.FETCH_ERROR,payload:err})
        })
        const {products}=data;
        const changedData=products.map((item)=>{
            const addingKey={
                ...item,
                quantity:0,
                totalproductprice:0
            }
            return addingKey;
        })
        dispatch({type:ActionType.FETCH_USER_DATA_SUCCESS, payload:changedData})
        
    };
};