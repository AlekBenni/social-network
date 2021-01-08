import React from 'react'
import s from './Post.module.css'

type PropsType = {
    message: string
    likeCount: number
}

const Post = (props: PropsType) => {
    return (
        <div className={s.post_wrapper}>
            <img className={s.img} src="https://klike.net/uploads/posts/2019-03/1551511784_4.jpg" />
            <div className={s.text_wrapper}>
            <div className={s.message}>{props.message}</div>
            <div className={s.like}>Likes: {props.likeCount}</div>
            </div>
        </div>       
    )
}

export default Post