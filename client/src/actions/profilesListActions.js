import axios from 'axios';
import { pathConstant } from '../config/pathConstants';
import { ALL_PROFILES_LIST_FAIL, ALL_PROFILES_LIST_REQUEST, ALL_PROFILES_LIST_SUCCESS, PROFILES_LIST_FAIL, PROFILES_LIST_REQUEST, PROFILES_LIST_SUCCESS } from '../constants/profilesListConstants';

export const listProfilesByUserId = (userId) => async (dispatch, getState) => {
    try {
        dispatch({
            type: PROFILES_LIST_REQUEST,
        });

        const { userLogin: { userInfo } } = getState();

        if(!userInfo) {
            throw new Error('Not authorized for this page!');
        }

        const config = {
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': `${userInfo.token}`
            }
        };

        const { data } = await axios.get(
            `${pathConstant}/api/profiles/${userId}`,
            config
            );

        dispatch({
            type: PROFILES_LIST_SUCCESS,
            payload: data
        });
    }
    catch (error) {
        dispatch({
            type: PROFILES_LIST_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        });
    }
};

export const allProfilesListReducer = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: ALL_PROFILES_LIST_REQUEST,
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

        const { data } = await axios.get(
            `${pathConstant}/api/profiles`,
            config
            );

        dispatch({
            type: ALL_PROFILES_LIST_SUCCESS,
            payload: data
        });
    }
    catch (error) {
        dispatch({
            type: ALL_PROFILES_LIST_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        });
    }
};
