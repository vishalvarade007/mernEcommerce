import {
    LOGIN_FAIL,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    REGISTER_USER_FAIL,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    CLEAR_ERRORS,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,
    LOGOUT_FAIL,
    LOGOUT_SUCCESS,
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_FAIL,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PASSWORD_REQUEST,
    UPDATE_PASSWORD_FAIL,
    UPDATE_PASSWORD_SUCCESS,
    FORGET_PASSWORD_REQUEST,
    FORGET_PASSWORD_SUCCESS,
    FORGET_PASSWORD_FAIL,
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAIL,
    ALL_USERS_FAIL,
    ALL_USERS_REQUEST,
    ALL_USERS_SUCCESS,
    USER_DETAILS_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    UPDATE_USER_FAIL,
    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS,
    DELETE_USER_FAIL,
    DELETE_USER_REQUEST,
    DELETE_USER_SUCCESS,
} from "../Constants/userConstants";
import axios from "axios";
import { BASE_URL } from "../url";



//login
export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: LOGIN_REQUEST });

        const config = { headers: { "Content-Type": "application/json" } };

        const { data } = await axios.post(`${BASE_URL}/api/v1/login`, { email, password }, config);

        if(data.token){
            localStorage.setItem("jwtToken",data.token);
        }

        dispatch({ type: LOGIN_SUCCESS, payload: data.user });
    } catch (error) {
        dispatch({ type: LOGIN_FAIL, payload: error.response.data.message });
    }
};

//load User
export const loadUser = () => async (dispatch) => {
    try {
        dispatch({ type: LOAD_USER_REQUEST });
        const token = localStorage.getItem('jwtToken');
        
        const { data } = await axios.get(`${BASE_URL}/api/v1/me`,{
            headers: {
                Authorization: `Bearer ${token}`
              }
        });
        

        dispatch({ type: LOAD_USER_SUCCESS, payload: data.user });
    } catch (error) {
        dispatch({ type: LOAD_USER_FAIL, payload: error.response.data.message });
    }
};

//register
export const register = (userData) => async (dispatch) => {
    try {
        dispatch({ type: REGISTER_USER_REQUEST });

        const config = { headers: { "Content-Type": "multipart/form-data" } };

        const { data } = await axios.post(`${BASE_URL}/api/v1/register`, userData, config);

        dispatch({ type: REGISTER_USER_SUCCESS, payload: data.user });
    } catch (error) {
        dispatch({ type: REGISTER_USER_FAIL, payload: error.response.data.message });
    }
};

//logout user
export const logout = () => async (dispatch) => {
    try {
        await axios.get(`${BASE_URL}/api/v1/logout`);
         localStorage.removeItem("jwtToken");
        dispatch({ type: LOGOUT_SUCCESS });
    } catch (error) {
        dispatch({ type: LOGOUT_FAIL, payload: error.response.data.message });
    }
};

//All users (admin)
export const getAllUsers = () => async (dispatch) => {
    try {
        dispatch({ type: ALL_USERS_REQUEST });
        const token = localStorage.getItem('jwtToken');

        const { data } = await axios.get(`${BASE_URL}/api/v1/admin/users`,{
            headers: {
                Authorization: `Bearer ${token}`
              }
        });

        dispatch({ type: ALL_USERS_SUCCESS, payload: data.users });
    } catch (error) {
        dispatch({ type: ALL_USERS_FAIL, payload: error.response.data.message });
    }
};

//users details (admin)
export const getUserDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: USER_DETAILS_REQUEST });
        const token = localStorage.getItem('jwtToken');

        const { data } = await axios.get(`${BASE_URL}/api/v1/admin/user/${id}`,{
            headers: {
                Authorization: `Bearer ${token}`
              }
        });

        dispatch({ type: USER_DETAILS_SUCCESS, payload: data.user });
    } catch (error) {
        dispatch({ type: USER_DETAILS_FAIL, payload: error.response.data.message });
    }
};

//Update user (admin)
export const updateUser = (id, userData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_USER_REQUEST });
        const token = localStorage.getItem('jwtToken');

        const config = { headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}`} };

        const { data } = await axios.put(`${BASE_URL}/api/v1/admin/user/${id}`, userData, config);

        dispatch({ type: UPDATE_USER_SUCCESS, payload: data.success });
    } catch (error) {
        dispatch({ type: UPDATE_USER_FAIL, payload: error.response.data.message });
    }
};

//Delete user (admin)
export const deleteUser = (id) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_USER_REQUEST });
        const token = localStorage.getItem('jwtToken');

        const { data } = await axios.delete(`${BASE_URL}/api/v1/admin/user/${id}`,{
            headers: {
                Authorization: `Bearer ${token}`
              }
        });

        dispatch({ type: DELETE_USER_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: DELETE_USER_FAIL, payload: error.response.data.message });
    }
};

//Update profile
export const updateProfile = (userData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_PROFILE_REQUEST });
        const token = localStorage.getItem('jwtToken');

        const config = { headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${token}`} };

        const { data } = await axios.put(`${BASE_URL}/api/v1/me/update`, userData, config);

        dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: data.success });
    } catch (error) {
        dispatch({ type: UPDATE_PROFILE_FAIL, payload: error.response.data.message });
    }
};

//Update password
export const updatePassword = (passwords) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_PASSWORD_REQUEST });
        const token = localStorage.getItem('jwtToken');

        const config = { headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}`} };

        const { data } = await axios.put(`${BASE_URL}/api/v1/password/update`, passwords, config);

        dispatch({ type: UPDATE_PASSWORD_SUCCESS, payload: data.success });
    } catch (error) {
        dispatch({ type: UPDATE_PASSWORD_FAIL, payload: error.response.data.message });
    }
};

//Forget password
export const forgetPassword = (email) => async (dispatch) => {
    try {
        dispatch({ type: FORGET_PASSWORD_REQUEST });

        const config = { headers: { "Content-Type": "application/json"} };

        const { data } = await axios.post(`${BASE_URL}/api/v1/password/forgot`, email, config);

        dispatch({ type: FORGET_PASSWORD_SUCCESS, payload: data.message });
    } catch (error) {
        dispatch({ type: FORGET_PASSWORD_FAIL, payload: error.response.data.message });
    }
};

//Reset password
export const ResetPasswordToken = (token, passwords) => async (dispatch) => {
    try {
        dispatch({ type: RESET_PASSWORD_REQUEST });

        const config = { headers: { "Content-Type": "application/json"} };

        const { data } = await axios.put(`${BASE_URL}/api/v1/password/reset/${token}`, passwords, config);

        dispatch({ type: RESET_PASSWORD_SUCCESS, payload: data.message });
    } catch (error) {
        dispatch({ type: RESET_PASSWORD_FAIL, payload: error.response.data.message });
    }
};



//clearing errors
export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS,
    });
};