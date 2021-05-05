import {
  server,
  STOCK_FETCHING,
  STOCK_SUCCESS,
  STOCK_CLEAR,
  STOCK_FAILED,
} from "../../constants";
import { httpClient } from "../../utils/HttpClient";

export const setStateToFetching = () => ({
  type: STOCK_FETCHING,
});

export const setStateToSuccess = (payload) => ({
  type: STOCK_SUCCESS,
  payload,
});

export const setStateToFailed = () => ({
  type: STOCK_FAILED,
});

export const setStateToClear = () => ({
  type: STOCK_CLEAR,
});

const doGetProducts = async (dispatch) => {
  try {
    let result = await httpClient.get(server.PRODUCT_URL);
    dispatch(setStateToSuccess(result.data));
  } catch (err) {
    dispatch(setStateToFailed());
  }
};

export const getProducts = () => {
  return (dispatch) => {
    dispatch(setStateToFetching());
    doGetProducts(dispatch);
  };
};

export const addProduct = (formData, history) => {
  return async (dispatch) => {
    await httpClient.post(server.PRODUCT_URL, formData);
    history.push("/stock");
  };
};
