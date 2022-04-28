import axios from "axios";
import {
  PRODUCT_LIST_FAIL, 
  PRODUCT_LIST_REQUEST, 
  PRODUCT_LIST_SUCCESS
} from "../constants";

export const getProductList = () => async (dispatch) => {
  try {
      dispatch({ type: PRODUCT_LIST_REQUEST })

      const { data } = await axios.get(`/api/product/products/instock`)

      dispatch({
          type: PRODUCT_LIST_SUCCESS,
          payload: data
      })

  } catch (error) {
      dispatch({
          type: PRODUCT_LIST_FAIL,
          payload: error.response && error.response.data.detail
              ? error.response.data.detail
              : error.message,
      })
  }
}