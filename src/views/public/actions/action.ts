import { ThunkAction } from "redux-thunk";
import { RootState } from "../../../store/RootReducer";
import {
  GET_ALL_PRODUCTS,
  PRODUCT_LOADING_STARTS,
  PRODUCT_LOADING_ENDS,
  GET_ERRORS,
  GET_ONE_PRODUCT,
} from "./types";
import {
  IAllProductResponse,
  IEditProduct,
  IGetOneProductResponse,
} from "../../../types/response/ProductsResponse";
import axiosInstance from "../../../utils/AxiosInterceptor";

interface GetAllProductsParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: string;
  search?: string;
}

export const getAllProducts = (
  params?: GetAllProductsParams
): ThunkAction<Promise<void>, RootState, unknown, any> => {
  return async (dispatch) => {
    try {
      dispatch({ type: PRODUCT_LOADING_STARTS });

      let url = "/products";

      if (params) {
        const queryParams = new URLSearchParams(
          params as Record<string, string>
        );
        url += `?${queryParams.toString()}`;
      }

      const response = await axiosInstance.get<IAllProductResponse>(url);

      dispatch({ type: GET_ALL_PRODUCTS, payload: response.data });
    } catch (error) {
      if (error.response) {
        if (error.response.status !== 500) {
          dispatch({ type: GET_ERRORS, payload: error });
        } else {
          dispatch({
            type: GET_ERRORS,
            payload: "Sorry, something went wrong!",
          });
        }
      }
    } finally {
      dispatch({ type: PRODUCT_LOADING_ENDS });
    }
  };
};

export const getOneProduct = (
  id: string
): ThunkAction<Promise<void>, RootState, unknown, any> => {
  return async (dispatch) => {
    try {
      dispatch({ type: PRODUCT_LOADING_STARTS });

      const response = await axiosInstance.get<IGetOneProductResponse>(
        `/products/${id}`
      );

      dispatch({ type: GET_ONE_PRODUCT, payload: response.data });
    } catch (error) {
      if (error.response) {
        if (error.response.status !== 500) {
          dispatch({ type: GET_ERRORS, payload: error });
        } else {
          dispatch({
            type: GET_ERRORS,
            payload: "Sorry, something went wrong!",
          });
        }
      }
    } finally {
      dispatch({ type: PRODUCT_LOADING_ENDS });
    }
  };
};

export const editProduct = (
  data: IEditProduct,
  id: string
): ThunkAction<Promise<void>, RootState, unknown, any> => {
  return async (dispatch) => {
    try {
      data;
      id;

      dispatch({ type: PRODUCT_LOADING_STARTS, payload: true });

      await axiosInstance.patch<IEditProduct>(`/products/${id}`, data);
    } catch (error) {
      if (error.response) {
        if (error.response.status !== 500) {
          dispatch({ type: GET_ERRORS, payload: error });
        } else {
          dispatch({
            type: GET_ERRORS,
            payload: "Sorry, something went wrong!",
          });
        }
      }
    } finally {
      dispatch({ type: PRODUCT_LOADING_ENDS });
    }
  };
};
