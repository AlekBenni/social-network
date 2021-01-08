import { createStore, combineReducers, applyMiddleware } from "redux";
import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import UsersReducer from "./users-reducer";
import AuthReducer from "./auth-reducer";
import thunkMiddleware from 'redux-thunk'
import { reducer as formReducer } from 'redux-form'
import { type } from "os";
import AppReducer from "./app-reducer";

type DialogType = {
    id: number
    name: string
}

export type PostType = {
    id: number
    post: string
    likeCount: number
}

export type MessageType = {
    id: number
    message: string
}

export type ProfilePageType = {
    posts: Array<PostType>
    newPostText: string
    profile: any
    status: any
}

export type SetUserDataType = {
    type: 'SET-USER-DATA'
    payload: any
}

export type DialogsPageType = {
    dialogData: Array<DialogType>
    messagesData: Array<MessageType>
    newMessageBody: string
}

export type RootStateType = {
    profilePage: ProfilePageType
    dialogsPage: DialogsPageType
    auth: any
}

export type ReduxStoreType = {
    subscribe: (observer: () => void) => void
    getState: () => RootStateType
    dispatch: (action: AddPostActionType | ChangeNewPostTextActionType | UpdateNewMessageBodyActionType | SendMessageActionType) => void

}

export type StoreType = {
    _state: RootStateType
    _callSubscriber: () => void
    subscribe: (observer: () => void) => void
    getState: () => RootStateType
    dispatch: (action: SetUsersType | AddPostActionType | ChangeNewPostTextActionType | UpdateNewMessageBodyActionType | SendMessageActionType | FollowType | UnFollowType) => void
}

export type SetUsersType = {
    type: 'SET-USERS'
    users: any
}

export type AddPostActionType = {
    type: 'ADD-POST'
    newPostText: any
}

export type ChangeNewPostTextActionType = {
    type: 'CHANGE-NEW-POST-TEXT'
    postMessage: string
}

export type FollowType = {
    type: 'FOLLOW'
    userId: number
}

export type UnFollowType = {
    type: 'UNFOLLOW'
    userId: number
}

export type setCurrentPageType = {
    type: 'SET-CURRENT-PAGE'
    currentPage: number
}

export type setUsersTotalCountType = {
    type: 'SET-USERS-TOTAL-COUNT'
    count: number
}

export type  UpdateNewMessageBodyActionType = {
    type: 'UPDATE-NEW-MESSAGE-BODY'
    body: string
}

export type SendMessageActionType = {
    type: 'SEND-MESSAGE'
    newMessageBody:any
}

type LocationType = {
    city: string
    country: string
}

export type UsersType = {
    id: number
    photosSmall: string
    followed: boolean
    name: string
    status: string
    location: LocationType
}

export type ToggleFetchingType = {
    type: 'TOGGLE-IS-FETCHING'
    isFatching: boolean
}

export type SetUsersProfileType = {
    type: 'SET-USER-PROFILE'
    profile: any
}

export type ToggleFollowingType = {
    type: 'TOGGLE-IS-FOLLOWING-PROGRESS'
    isFatching: boolean
    userId: number
}

export type SetStatusType = {
    type: 'SET-STATUS'
    status: string
}

export type initializedSuccessType = {
    type: 'INITIALIZED-SUCCESS'
}

export type ActionsTypes = initializedSuccessType | SetUserDataType | SetUsersProfileType | ToggleFetchingType | setUsersTotalCountType |
    setCurrentPageType | SetUsersType | FollowType | UnFollowType | AddPostActionType | ChangeNewPostTextActionType |
    UpdateNewMessageBodyActionType | SendMessageActionType | ToggleFollowingType | SetStatusType

let reducers = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    usersPage: UsersReducer,
    auth: AuthReducer,
    form: formReducer,
    app: AppReducer
})

export let store = createStore(reducers, applyMiddleware(thunkMiddleware))

// @ts-ignore
window.store = store

export default store