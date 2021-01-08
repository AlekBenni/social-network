import {ActionsTypes, PostType, AddPostActionType, ChangeNewPostTextActionType, SetUsersProfileType, SetStatusType} from "./redux-store";
import {Dispatch} from "redux";
import {usersAPI} from "../api/Api";
import {profileAPI} from "../api/Api";

const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET-USER-PROFILE';
const SET_STATUS = 'SET-STATUS'

let initialState = {
    posts: [
        {id: 1, post: 'Hello its test message one!', likeCount: 12},
        {id: 2, post: 'Hello its test message two!', likeCount: 38},
        {id: 3, post: 'Hello its test message three!', likeCount: 21},
        {id: 4, post: 'Victor', likeCount: 42},
        {id: 5, post: 'Rafael', likeCount: 3}
    ],

    profile: null,
    status: " "
}

export const profileReducer = (state = initialState, action: ActionsTypes) => {

    switch (action.type){

        case SET_STATUS: {
            let stateCopy = {...state}
            stateCopy.status = action.status
            return stateCopy
        }
        case "ADD-POST": {
            let newPost: PostType = {
                id: 1,
                post: action.newPostText,
                likeCount: 12
            }
            let stateCopy = {...state}
            stateCopy.posts = [...state.posts]
            stateCopy.posts.push(newPost)
            return stateCopy
        }
        case SET_USER_PROFILE:{
            return {...state, profile: action.profile}
        }

        default: return state
    }
}

export const addPostActionCreator = (newPostText:any):AddPostActionType => 
({type: ADD_POST, newPostText:newPostText})

export const setSatusAC = (status: string):SetStatusType =>
    ({type: SET_STATUS,status: status})

export const setUsersProfile = (profile: any):SetUsersProfileType => ({type: SET_USER_PROFILE, profile: profile})

export const getUserProfile = (userId: number) => (dispatch: Dispatch) => {
    usersAPI.getProfile(userId)
        .then(response => {
            dispatch(setUsersProfile(response.data))
        })
}

export const getStatus = (userId: number) => (dispatch: Dispatch) => {
    profileAPI.getStatus(userId)
        .then(response => {
            dispatch(setSatusAC(response.data))
        })
}

export const updateStatus = (status: any) => (dispatch: Dispatch) => {
    profileAPI.updateStatus(status)
        .then(response => {
            if(response.data.resultCode === 0){
               dispatch(setSatusAC(status)) 
            }
            
        })
}

export default profileReducer