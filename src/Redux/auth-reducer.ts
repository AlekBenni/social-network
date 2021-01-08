import {ActionsTypes, PostType, UsersType} from "./redux-store";
import {authAPI} from "../api/Api";
import {Dispatch} from "redux";
import {stopSubmit} from 'redux-form'

const SET_USER_DATA = 'SET-USER-DATA'

let initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false
}

type InitialStateType = typeof initialState

export const AuthReducer = (state: InitialStateType = initialState, action: ActionsTypes) => {

    switch (action.type) {
        case SET_USER_DATA:
        return {
            ...state,
                ...action.payload,
        }
        default:
            return state

    }
}

export const setAuthUserData = (userId: any, email: any, login: any, isAuth:boolean) => 
({type: SET_USER_DATA, payload:{userId, email, login, isAuth}})

export const getAuthUserData = () => (dispatch: Dispatch) => {
    return authAPI.me().then(response => {
        if(response.data.resultCode === 0){
            let {id, email, login} = response.data.data
            dispatch(setAuthUserData(id, email, login, true))
        }
    })
    return "hello world"
}

export const login = (email:any, password:any, rememberMe:any) => (dispatch: Dispatch) => { 
    authAPI.login( email, password, rememberMe )
    .then(response => {
        if(response.data.resultCode === 0){
            // @ts-ignore
          dispatch(getAuthUserData())
        }
        else {
        let message = response.data.messages.length > 0 ? response.data.messages[0] : 'some error'
        dispatch(stopSubmit('login', {_error: message}))
        }
    })
}

export const logout = () => (dispatch: Dispatch) => {
    authAPI.logout()
    .then(response => {
        if(response.data.resultCode === 0){
            dispatch(setAuthUserData(null, null, null, true))
        }
    })
}

export default AuthReducer