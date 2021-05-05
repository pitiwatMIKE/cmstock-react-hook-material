import { STOCK_FAILED, STOCK_FETCHING, STOCK_SUCCESS } from "../../constants"

const initialState = {
    result:null,
    isFetching:false,
    isError:false,
}

export default (state = initialState, { type, payload }) => {
    switch (type) {

    case STOCK_FETCHING:
        return { ...state, isFetching:true, isError:false, result:null}
    case STOCK_SUCCESS:
        return { ...state, isFetching:false, isError:false, result:payload}
    case STOCK_FAILED:
        return { ...state, isFetching:false, isError:true, result:null}

    default:
        return state
    }
}
