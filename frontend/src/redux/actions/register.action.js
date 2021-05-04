import {
  REGISTER_FETCHING,
  REGISTER_SUCCESS,
  REGISTER_FAILED,
  INIT,
} from "../../constants";

export const setStateToFetching = () => ({
  type: REGISTER_FETCHING,
});

export const setStateToSuccess = (payload) => ({
  type: REGISTER_SUCCESS,
  payload,
});

export const setStateToFailed = (payload) => ({
  type: REGISTER_FAILED,
  payload,
});

export const setStateToInit = () => ({
  type: INIT,
});

export const register = (payload,history) => {
  return async (dispatch) => {
    dispatch(setStateToFetching());
    if (payload === "ok") {
      await dispatch(setStateToSuccess(payload));
    //   history.push("/login")
    } else {
      dispatch(setStateToFailed(payload));
    }
  };
};

export const init = () => {
  return (dispatch) => {
    dispatch(setStateToInit());
  };
};
