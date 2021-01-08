import React, {ChangeEvent} from 'react'
import s from './MyPosts.module.css'
import Post from './Post/Post'
import {ActionsTypes, ReduxStoreType, RootStateType, StoreType} from "../../../Redux/redux-store";
import {addPostActionCreator} from "../../../Redux/profile-reducer";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";
import { Dispatch } from 'redux';

export type Postype = {
    id: number
    post: string
    likeCount: number
}

type PropsType = {
    posts: Array<Postype>
    newPostText: string
    dispatch: (action: ActionsTypes) => void
}

let mapStateToProps = (state: RootStateType) => {
    return {
        posts: state.profilePage.posts,
        newPostText: state.profilePage.newPostText
    }
}

let mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        addPost: (newPostText:any) => {
            dispatch(addPostActionCreator(newPostText))
        }
    }
}



const MyPostsConteiner = connect(mapStateToProps, mapDispatchToProps)(MyPosts)

export default MyPostsConteiner