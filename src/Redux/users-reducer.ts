import {ActionsTypes, PostType, UsersType} from "./redux-store";
import {Dispatch} from "redux";
import {usersAPI} from "../api/Api";

const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UNFOLLOW'
const SET_USERS = 'SET-USERS'
const SET_CURRENT_PAGE = 'SET-CURRENT-PAGE'
const SET_USERS_TOTAL_COUNT = 'SET-USERS-TOTAL-COUNT'
const TOGGLE_IS_FETCHING = 'TOGGLE-IS-FETCHING'
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE-IS-FOLLOWING-PROGRESS'

let initialState = {
    users: [] as Array<UsersType>,
    pageSize: 100,
    totalUsersCount: 0,
    currentPage: 1,
    isFatching: true,
    followingProgress: []
}

type InitialStateType = typeof initialState

export const UsersReducer = (state: InitialStateType = initialState, action: ActionsTypes) => {

    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: state.users.map((u) => {
                    if (u.id === action.userId) {
                        return {...u, followed: true}
                    }
                    return u
                })}
        case UNFOLLOW:
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return {...u, followed: false}
                    }
                    return u
                })}
        case SET_USERS:
            return {...state, users: action.users}
        case SET_CURRENT_PAGE:
            return {...state, currentPage: action.currentPage}
        case SET_USERS_TOTAL_COUNT:
            return {...state, totalUsersCount: action.count}
        case TOGGLE_IS_FETCHING:
            return {...state, isFatching: action.isFatching}
        case TOGGLE_IS_FOLLOWING_PROGRESS:
            return {...state,
                followingProgress: action.isFatching
               ?[...state.followingProgress, action.userId]
               : state.followingProgress.filter(id => id != action.userId)
            }
        default:
            return state
    }
}

export const followSucces = (userId: number) => ({type: FOLLOW, userId: userId})
export const unfollowSucces = (userId: number) => ({type: UNFOLLOW, userId: userId})
export const setUsers = (users: any) => ({type: SET_USERS, users: users})
export const setCurrentPage = (currentPage: number) => ({type: SET_CURRENT_PAGE, currentPage: currentPage})
export const setTotalUsersCount = (count: number) => ({type: SET_USERS_TOTAL_COUNT, count: count})
export const toggleIsFtching = (isFatching: boolean) => ({type: TOGGLE_IS_FETCHING, isFatching: isFatching})
export const toggleFollowingProgress = (isFatching: boolean, userId:number) =>
    ({type: TOGGLE_IS_FOLLOWING_PROGRESS, isFatching: isFatching, userId: userId})

export const getUsers = (currentPage: number, pageSize: number) => {
    return (dispatch: Dispatch) => {
            dispatch(toggleIsFtching(true))
            usersAPI.getUsers(currentPage, pageSize).then(data => {
                dispatch(toggleIsFtching(false))
                dispatch(setUsers(data.items))
                dispatch(setTotalUsersCount(data.totalCount))
                dispatch(setCurrentPage(currentPage))
            })
    }
}

export const follow = (userId:any) => {
    return (dispatch: Dispatch) => {
        dispatch(toggleFollowingProgress(true, userId ))
        usersAPI.follow(userId).then(data => {
            if(data.resultCode === 0){
                dispatch(followSucces(userId))
            }
            dispatch(toggleFollowingProgress(false, userId ))    //Progress
        })
    }
}

export const unfollow = (userId:any) => {
    return (dispatch: Dispatch) => {
        dispatch(toggleFollowingProgress(true, userId ))
        usersAPI.unfollow(userId).then(data => {
            if(data.resultCode === 0){
                dispatch(unfollowSucces(userId))
            }
            dispatch(toggleFollowingProgress(false, userId ))    //Progress
        })
    }
}

export default UsersReducer