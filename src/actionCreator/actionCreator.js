import { ActionType } from "../actionTypes/actionType.js";
import axios from "axios";

export const fetchProducts=()=>{
   
    return async function(dispatch){
        dispatch({type:ActionType.FETCH_PENDING})
        const {data}=await axios.get('https://dummyjson.com/products').catch((err)=>{
            dispatch({type:ActionType.FETCH_ERROR,payload:err})
        })
        const {products}=data;
        let changedData=products.map((item)=>{
            let addingKey={
                ...item,
                quantity:0,
                totalproductprice:0
            }
            return addingKey;
        })
        dispatch({type:ActionType.FETCH_USER_DATA_SUCCESS, payload:changedData})
        
    };
};