import { INIT, REGISTER_FAILED, REGISTER_FETCHING, REGISTER_SUCCESS } from "../../constants"

const initialState = {
    result: null,
    isFetching: false,
    error: false,
}

export default (state = initialState, { type, payload }) => {
    switch (type) {
    
    case REGISTER_FETCHING:
        return {...state, result:null, isFetching:true, error:false}
    case REGISTER_SUCCESS:
        return {...state, result:payload, isFetching:false, error:false}
    case REGISTER_FAILED:
        return { ...state, result: payload, isFetching:false, error:true }
    case INIT:
        return initialState
    default:
        return state
    }
}
