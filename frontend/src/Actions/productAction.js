import {
   ALL_PRODUCT_FAIL,
   ALL_PRODUCT_REQUEST,
   ALL_PRODUCT_SUCCESS,
   CLEAR_ERRORS,
   PRODUCT_DETAILS_FAIL,
   PRODUCT_DETAILS_REQUEST,
   PRODUCT_DETAILS_SUCCESS,
   NEW_REVIEW_FAIL,
   NEW_REVIEW_REQUEST,
   NEW_REVIEW_SUCCESS,
   ADMIN_PRODUCT_FAIL,
   ADMIN_PRODUCT_REQUEST,
   ADMIN_PRODUCT_SUCCESS,
   NEW_PRODUCT_FAIL,
   NEW_PRODUCT_SUCCESS,
   NEW_PRODUCT_REQUEST,
   DELETE_PRODUCT_FAIL,
   DELETE_PRODUCT_REQUEST,
   DELETE_PRODUCT_SUCCESS,
   UPDATE_PRODUCT_FAIL,
   UPDATE_PRODUCT_SUCCESS,
   UPDATE_PRODUCT_REQUEST,
   ALL_REVIEWS_FAIL,
   ALL_REVIEWS_REQUEST,
   ALL_REVIEWS_SUCCESS,
   DELETE_REVIEW_FAIL,
   DELETE_REVIEW_REQUEST,
   DELETE_REVIEW_SUCCESS,
} from "../Constants/productConstants";
import axios from "axios";
import {BASE_URL} from "../url";

export const getProduct = (keyword = "", currentPage = 1, price = [0, 100000], category, ratings = 0) => async (dispatch) => {
   try {

      dispatch({ type: ALL_PRODUCT_REQUEST });
      let link = `${BASE_URL}/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;

      if (category) {
         link = `${BASE_URL}/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`;
      }

      const { data } = await axios.get(link);
      
      dispatch({
         type: ALL_PRODUCT_SUCCESS,
         payload: data,
      });

   } catch (error) {

      dispatch({
         type: ALL_PRODUCT_FAIL,
         payload: error.response.data.message,
      });
   }
};

//get Admin products
export const getAdminProducts = () => async (dispatch) => {
   try {
      dispatch({ type: ADMIN_PRODUCT_REQUEST });

      const { data } = await axios.get(`${BASE_URL}/api/v1/admin/products`);

      dispatch({
         type: ADMIN_PRODUCT_SUCCESS,
         payload: data.products,
      })
   } catch (error) {

      dispatch({
         type: ADMIN_PRODUCT_FAIL,
         payload: error.response.data.message,
      });
   }
};

//Create new product
export const createProduct = (productData) => async (dispatch) => {
   try {
      dispatch({ type: NEW_PRODUCT_REQUEST });
      const config = {
         headers: {
            "Content-Type": "application/json",
         },
         withCredentials: true,
      }
      const { data } = await axios.post(`${BASE_URL}/api/v1/admin/products/new`, productData, config);
       
      dispatch({
         type: NEW_PRODUCT_SUCCESS,
         payload: data,
      })
   } catch (error) {
      dispatch({
         type: NEW_PRODUCT_FAIL,
         payload: error,
      });
   }
};

//update product
export const updateProduct = (id,productData) => async (dispatch) => {
   try {
      dispatch({ type: UPDATE_PRODUCT_REQUEST });
      const config = {
         headers: {
            "Content-Type": "application/json",
         }
      }
      const { data } = await axios.put(`${BASE_URL}/api/v1/admin/products/${id}`, productData, config);
      dispatch({
         type: UPDATE_PRODUCT_SUCCESS,
         payload: data.success,
      })
   } catch (error) {
      dispatch({
         type: UPDATE_PRODUCT_FAIL,
         payload: error.response.data.message,
      });
   }
};

export const getProductDetails = (id) => async (dispatch) => {
   try {
      dispatch({ type: PRODUCT_DETAILS_REQUEST });
      const { data } = await axios.get(`${BASE_URL}/api/v1/products/${id}`);

      dispatch({
         type: PRODUCT_DETAILS_SUCCESS,
         payload: data.product,
      })
   } catch (error) {
      dispatch({
         type: PRODUCT_DETAILS_FAIL,
         payload: error.response.data.message,
      });
   }
};

//Delete product
export const deleteProduct = (id) => async (dispatch) => {
   try {
      dispatch({ type: DELETE_PRODUCT_REQUEST });
      const { data } = await axios.delete(`${BASE_URL}/api/v1//admin/products/${id}`);

      dispatch({
         type: DELETE_PRODUCT_SUCCESS,
         payload: data.success,
      })
   } catch (error) {
      dispatch({
         type: DELETE_PRODUCT_FAIL,
         payload: error.response.data.message,
      });
   }
};

//new review
export const newReview = (reviewData) => async (dispatch) => {
   try {
      dispatch({ type: NEW_REVIEW_REQUEST });
      const config = {
         headers: {
            "Content-Type": "application/json"
         }
      }
      const { data } = await axios.put(`${BASE_URL}/api/v1/review`, reviewData, config);

      dispatch({
         type: NEW_REVIEW_SUCCESS,
         payload: data.success,
      })
   } catch (error) {
      dispatch({
         type: NEW_REVIEW_FAIL,
         payload: error.response.data.message,
      });
   }
};

//get reviews - (admin)

export const getAllReviews = (id) => async (dispatch) => {
   try {
      dispatch({ type: ALL_REVIEWS_REQUEST });
     
      const { data } = await axios.get(`${BASE_URL}/api/v1/reviews?id=${id}`);

      dispatch({
         type: ALL_REVIEWS_SUCCESS,
         payload: data.reviews,
      })
   } catch (error) {
      dispatch({
         type: ALL_REVIEWS_FAIL,
         payload: error.response.data.message,
      });
   }
};

//Delete reviews - (admin)

export const deleteReviews = (reviewId,productId) => async (dispatch) => {
   try {
      dispatch({ type: DELETE_REVIEW_REQUEST });
     
      const { data } = await axios.delete(`${BASE_URL}/api/v1/reviews?id=${reviewId}&productId=${productId}`);

      dispatch({
         type: DELETE_REVIEW_SUCCESS,
         payload: data.success,
      })
   } catch (error) {
      dispatch({
         type: DELETE_REVIEW_FAIL,
         payload: error.response.data.message,
      });
   }
};

//clearing errors
export const clearErrors = () => async (dispatch) => {
   dispatch({
      type: CLEAR_ERRORS,
   });
};