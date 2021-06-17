import { ALL_PROFILES_LIST_FAIL, ALL_PROFILES_LIST_REQUEST, ALL_PROFILES_LIST_SUCCESS, PROFILES_LIST_FAIL, PROFILES_LIST_REQUEST, PROFILES_LIST_SUCCESS } from "../constants/profilesListConstants";

export const profilesListReducer = (state = { profiles: [] }, action) => {
    switch (action.type) {
        case PROFILES_LIST_REQUEST:
            return {
                loading: true,
                profiles: []
            }
        case PROFILES_LIST_SUCCESS:
            return {
                loading: false,
                profiles: action.payload
            }
        case PROFILES_LIST_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
};

export const allProfilesListReducer = (state = { profiles: [] }, action) => {
    switch (action.type) {
        case ALL_PROFILES_LIST_REQUEST:
            return {
                loading: true,
                profiles: []
            }
        case ALL_PROFILES_LIST_SUCCESS:
            return {
                loading: false,
                profiles: action.payload
            }
        case ALL_PROFILES_LIST_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
};
