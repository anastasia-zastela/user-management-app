import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { userDeleteReducer, userLoginReducer, userRegisterReducer, userUpdateReducer } from './reducers/userReducers';
import { usersListReducer } from './reducers/usersListReducer';
import { profilesListReducer } from './reducers/profilesListReducer';
import { allProfilesListReducer } from './reducers/profilesListReducer';
import { profileCreateReducer, profileDeleteReducer, profileUpdateReducer } from './reducers/profileReducer';


const reducer = combineReducers({
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userUpdate: userUpdateReducer,
    usersList: usersListReducer,
    profilesList: profilesListReducer,
    allProfilesList: allProfilesListReducer,
    profileUpdate: profileUpdateReducer,
    profileDelete: profileDeleteReducer,
    profileCreate: profileCreateReducer,
    userDelete: userDeleteReducer
});

const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;

const initialState = {
    userLogin: { userInfo: userInfoFromStorage }
};

const middleware = [thunk];

const store = createStore(reducer, initialState, composeWithDevTools
    (applyMiddleware(...middleware)));

export default store;
