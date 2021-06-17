import axios from 'axios';
import { pathConstant } from '../config/pathConstants';
import { USERS_LIST_FAIL, USERS_LIST_REQUEST, USERS_LIST_SUCCESS } from '../constants/usersListConstants';

export const listUsers = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: USERS_LIST_REQUEST
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
            `${pathConstant}/api/users`,
            config
            );

        dispatch({
            type: USERS_LIST_SUCCESS,
            payload: data
        });
    }
    catch (error) {
        dispatch({
            type: USERS_LIST_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        });
    }
};
