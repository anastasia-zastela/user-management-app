import { USERS_LIST_FAIL, USERS_LIST_REQUEST, USERS_LIST_SUCCESS } from "../constants/usersListConstants";

export const usersListReducer = (state = { users: [] }, action) => {
    switch (action.type) {
        case USERS_LIST_REQUEST:
            return {
                loading: true,
                users: []
            }
        case USERS_LIST_SUCCESS:
            return {
                loading: false,
                users: action.payload
            }
        case USERS_LIST_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
};
