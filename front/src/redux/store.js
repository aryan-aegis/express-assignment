import {legacy_createStore, applyMiddleware } from "redux";
import { userReducer } from "./user/user.reducer";
import thunk from "redux-thunk";

export let store = legacy_createStore(userReducer,applyMiddleware(thunk)) 