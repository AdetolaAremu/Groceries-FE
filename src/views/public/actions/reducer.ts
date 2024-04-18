import { ErrorResponse } from "../../../types/response/ErrorResponse";
import {
  IAllProductResponse,
  IGetOneProductResponse,
} from "../../../types/response/ProductsResponse";
import {
  GET_ALL_PRODUCTS,
  PRODUCT_LOADING_STARTS,
  PRODUCT_LOADING_ENDS,
  GET_ONE_PRODUCT,
  EDIT_PRODUCT_LOADING_STARTS,
  EDIT_PRODUCT_LOADING_ENDS,
} from "./types";

export interface PublicState {
  loading: boolean;
  productLoading: boolean;
  errors?: ErrorResponse;
  allProducts: IAllProductResponse;
  oneProdctFetch: IGetOneProductResponse;
}

const init: PublicState = {
  loading: false,
  errors: null,
  allProducts: null,
  oneProdctFetch: null,
  productLoading: false,
};

const PublicReducer = (state = init, action: any) => {
  switch (action.type) {
    case PRODUCT_LOADING_STARTS:
      return {
        ...state,
        loading: true,
      };
    case PRODUCT_LOADING_ENDS:
      return {
        ...state,
        loading: false,
      };
    case EDIT_PRODUCT_LOADING_STARTS:
      return {
        ...state,
        productLoading: true,
      };
    case EDIT_PRODUCT_LOADING_ENDS:
      return {
        ...state,
        productLoading: false,
      };
    case GET_ALL_PRODUCTS: {
      return {
        ...state,
        allProducts: action.payload,
      };
    }
    case GET_ONE_PRODUCT: {
      return {
        ...state,
        oneProdctFetch: action.payload,
      };
    }
    default:
      return state;
  }
};

export default PublicReducer;
