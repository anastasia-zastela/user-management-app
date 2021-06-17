import axios from 'axios';
import { pathConstant } from '../configPaths/pathConstants';
import { USER_DELETE_FAIL, USER_DELETE_REQUEST, USER_DELETE_SUCCESS, USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT, USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_UPDATE_FAIL, USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS } from "../constants/userConstants"

export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({
            type: USER_LOGIN_REQUEST
        });

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const { data } = await axios.post(
            `${pathConstant}/api/users/login`,
            { email, password },
            config
        );

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        });

        localStorage.setItem('userInfo', JSON.stringify(data));
    }
    catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        });
    }
}

export const logout = () => (dispatch) => {
    localStorage.removeItem('userInfo');
    dispatch({
        type: USER_LOGOUT
    });
}

export const register = (username, email, isAdmin, password) => async (dispatch) => {
    try {
        dispatch({
            type: USER_REGISTER_REQUEST
        });

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const { data } = await axios.post(
            `${pathConstant}/api/users`,
            { username, email, isAdmin, password },
            config
        );

        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: data
        });

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        });

        localStorage.setItem('userInfo', JSON.stringify(data));
    }
    catch (error) {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        });
    }
};

export const userUpdate = ({userId, username, email, isAdmin}) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_UPDATE_REQUEST
        });

        const { userLogin: { userInfo } } = getState();

        if(!userInfo) {
            throw new Error('Not authorized');
        }

        const config = {
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': `${userInfo.token}`
            }
        };

        const { data } = await axios.put(
            `${pathConstant}/api/users/${userId}`,
            { 
                username, 
                email,
                isAdmin
            },
            config
        );

        dispatch({
            type: USER_UPDATE_SUCCESS,
            payload: data
        });
    }
    catch (error) {
        dispatch({
            type: USER_UPDATE_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        });
    }
}

export const deleteUser = (userId) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_DELETE_REQUEST
        });

        const { userLogin: { userInfo } } = getState();

        if(!userInfo) {
            throw new Error('Not authorized');
        }

        const config = {
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': `${userInfo.token}`
            }
        };

        const { data } = await axios.delete(
            `${pathConstant}/api/users/${userId}`,
            config
        );

        dispatch({
            type: USER_DELETE_SUCCESS,
            payload: data
        });
    }
    catch (error) {
        dispatch({
            type: USER_DELETE_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        });
    }
}
