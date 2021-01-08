import React from 'react'
import MyPosts from './MyPosts/MyPosts'
import s from './Profile.module.css'
import ProfileInfo from './ProfileInfo/ProfileInfo'
import {ActionsTypes, ProfilePageType} from '../../Redux/redux-store'
import MyPostsConteiner from "./MyPosts/MyPostsConteiner";


type PropsType = {
    profile: any
    isAuth: boolean
    status: any
    updateStatus: any
}

const Profile = (props: PropsType) => {
    
    return (
        <div>
            <div className={s.header}>
                <ProfileInfo profile={props.profile} status={props.status} updateStatus={props.updateStatus} />
                <MyPostsConteiner />
            </div>
        </div>
    )
}

export default Profile