import { LOGIN_FAILED, LOGIN_FETCHING, LOGIN_SUCCESS, LOGOUT} from "../../constants/Constan";

export const setStateToFetching = (payload) => ({
    type: LOGIN_FETCHING,
})

export const setStateToSuccess = (payload) => ({
    type: LOGIN_SUCCESS,
    payload
})

export const setStateToFailed = (payload) => ({
    type: LOGIN_FAILED,
    payload
})

export const setStateToLogout = () => ({
    type: LOGOUT,
})


export const login=({username, password}, history)=>{
    return dispatch=>{
        dispatch(setStateToFetching())
        setTimeout(()=>{
            dispatch(setStateToSuccess("ok"))
            history.push("/stock")
        },1000)
    }
}

export const logout=(history)=>{
    return dispatch=>{
        dispatch(setStateToLogout())
        history.push("/")
    }
}



