import { PROFILE_CREATE_FAIL, PROFILE_CREATE_REQUEST, PROFILE_CREATE_SUCCESS, PROFILE_DELETE_FAIL, PROFILE_DELETE_REQUEST, PROFILE_DELETE_SUCCESS, PROFILE_UPDATE_FAIL, PROFILE_UPDATE_REQUEST, PROFILE_UPDATE_SUCCESS } from "../constants/profileConstants";

export const profileUpdateReducer = (state = {}, action) => {
    switch (action.type) {
        case PROFILE_UPDATE_REQUEST:
            return {
                loading: true
            }
        case PROFILE_UPDATE_SUCCESS:
            return {
                loading: false,
                success: true,
                profile: action.payload
            }
        case PROFILE_UPDATE_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
};

export const profileDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case PROFILE_DELETE_REQUEST:
            return {
                loading: true
            }
        case PROFILE_DELETE_SUCCESS:
            return {
                loading: false,
                success: true,
                profile: action.payload
            }
        case PROFILE_DELETE_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
};

export const profileCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case PROFILE_CREATE_REQUEST:
            return {
                loading: true
            }
        case PROFILE_CREATE_SUCCESS:
            return {
                loading: false,
                profile: action.payload,
                success: true
            }
        case PROFILE_CREATE_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
};