import React from 'react'
import s from './Message.module.css'

type PropsType = {
    message: string
}

const Message = (props: PropsType) => {
    return (
        <div>{props.message}</div>
    )
}

export default Message




