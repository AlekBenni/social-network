import { AuthReducer } from './auth-reducer';
import {ActionsTypes, initializedSuccessType, PostType, UsersType} from "./redux-store";
import {authAPI} from "../api/Api";
import {Dispatch} from "redux";
import {getAuthUserData} from './auth-reducer'

const INITIALIZED_SUCCESS = 'INITIALIZED-SUCCESS'

let initialState = {
    initialized: false
}

type InitialStateType = typeof initialState

export const AppReducer = (state: InitialStateType = initialState, action: ActionsTypes) => {

    switch (action.type) {
        case INITIALIZED_SUCCESS:
        return {
            ...state,
                initialized: true
        }
        default:
            return state

    }
}

export const initializedSuccess = ():initializedSuccessType => ({type: INITIALIZED_SUCCESS})

export const initializeApp = () => (dispatch: Dispatch) => {
// @ts-ignore    
    let promise = dispatch(getAuthUserData())
    dispatch(initializedSuccess())
    Promise.all([promise])
    .then(() => {
        dispatch(initializedSuccess())
    })
}

export default AppReducer