import axios from 'axios';
import { pathConstant } from '../configPaths/pathConstants';
import { PROFILE_CREATE_FAIL, PROFILE_CREATE_REQUEST, PROFILE_CREATE_SUCCESS, PROFILE_DELETE_FAIL, PROFILE_DELETE_REQUEST, PROFILE_DELETE_SUCCESS, PROFILE_UPDATE_FAIL, PROFILE_UPDATE_REQUEST, PROFILE_UPDATE_SUCCESS } from "../constants/profileConstants";

export const updateProfile = ({profileId, name, gender, birthdate, city}) => async (dispatch, getState) => {
    try {
        dispatch({
            type: PROFILE_UPDATE_REQUEST
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
            `${pathConstant}/api/profiles/${profileId}`,
            {
                name, 
                gender,
                birthdate,
                city
            },
            config
        );

        dispatch({
            type: PROFILE_UPDATE_SUCCESS,
            payload: data
        });
    }
    catch (error) {
        dispatch({
            type: PROFILE_UPDATE_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        });
    }
}


export const deleteProfile = (profileId) => async (dispatch, getState) => {
    try {
        dispatch({
            type: PROFILE_DELETE_REQUEST
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
            `${pathConstant}/api/profiles/${profileId}`,
            config
        );

        dispatch({
            type: PROFILE_DELETE_SUCCESS,
            payload: data
        });
    }
    catch (error) {
        dispatch({
            type: PROFILE_DELETE_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        });
    }
}

export const createProfile = (name, gender, birthdate, city, userId) => async (dispatch, getState) => {
    try {
        dispatch({
            type: PROFILE_CREATE_REQUEST
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

        const { data } = await axios.post(
            `${pathConstant}/api/profiles`,
            { name, gender, birthdate, city, userId},
            config
        );

        dispatch({
            type: PROFILE_CREATE_REQUEST,
            payload: data
        });

        dispatch({
            type: PROFILE_CREATE_SUCCESS,
            payload: data
        });
    }
    catch (error) {
        dispatch({
            type: PROFILE_CREATE_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        });
    }
};