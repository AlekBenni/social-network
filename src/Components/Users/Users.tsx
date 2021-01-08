import React from 'react'
import s from "./Users.module.css";
import {UsersType} from "../../Redux/redux-store";
import userPhoto from "../../assets/images/image001.jpg";
import {NavLink} from "react-router-dom";
import { usersAPI } from '../../api/Api';

const spanUserPagination = {
    padding: '5px 10px',
    backgroundColor: '#00D0D9',
    margin: '10px 5px',
    cursor: 'pointer'
}

type PropsType = {
    users: Array<UsersType>
    pageSize: number
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    totalUsersCount: number
    currentPage: any
    onPageChanged: (p: number) => void
    toggleFollowingProgress: (isFatching: boolean, userId: number) => void
    followingProgress: any
}

let Users = (props: PropsType) => {

    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize)

    let pages = []

    for(let i = 1; i <= pagesCount; i++ ){
        pages.push(i)
    }

    return (
        <div>

            <div>
                {pages.map((p) => {
                    //Не работает стиль для pagination
                    return (<span style={spanUserPagination} className={props.currentPage === p ? s.selectsdPage : ''}
                                  onClick={(e) => {props.onPageChanged(p)}}
                    >{p}</span>)
                })}
            </div>

            {
                props.users.map((user:UsersType) => {
                    return <div className={s.mainStyle} key={user.id}>
                        <div className={s.itemStyle}>
                            <div>
                                <NavLink to={'/profile/' + user.id}>
                                <img className={s.imgStyle}
                                     src={user.photosSmall !=null ? user.photosSmall : userPhoto}/>
                                </NavLink>
                            </div>

                            <div>
                                {
                                 user.followed ?
                                    <button disabled={props.followingProgress.some((id:any) => id === user.id)} onClick={() => {
                                        props.unfollow( user.id)      //Progress

                                    }}>unfollow</button>
                                     :
                                    <button disabled={props.followingProgress.some((id:any) => id === user.id)} onClick={() => {
                                        props.follow( user.id)    //Progress


                                    }}>follow</button>
                                }
                            </div>

                            <div>{user.name}</div>
                        </div>
                        <div className={s.itemStyle}>
                            <span>
                                <div>{user.status}</div>
                            </span>
                            <span>
                                <div>{'user.location.country'}</div>
                                <div>{'user.location.city'}</div>
                            </span>
                        </div>
                    </div>
                })
            }
        </div>
    )
}

export default Users
