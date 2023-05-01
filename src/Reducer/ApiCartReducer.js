import { ActionType } from "../actionTypes/actionType"

const intialState={
    data:[],
    loading:false,
    error:null,
}

export default function ApiReducer(state=intialState ,action){
    
    switch (action.type) {  
        case ActionType.FETCH_USER_DATA_SUCCESS:
            return {
                ...state,
                data:action.payload,
                loading:false,
                error:action.payload,
            }
        case ActionType.FETCH_PENDING:
            return{
                ...state,
                loading:true,
                error:null,
            }

        case ActionType.FETCH_ERROR:
            return{
                ...state,
                data:[],
                loading:false,
                error:action.payload,
            }
            default:
        return state
    }     
}
