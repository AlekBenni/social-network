import React from 'react'
import { NavLink } from 'react-router-dom'
import s from './Dialogsitem.module.css'

type PropsType = {
    name: string
    id: number
}

const DialogItem = (props: PropsType) => {
    let path = '/dialogs/' + props.id
    return (
        <NavLink to={path}>
        <div className={s.user}>
            {props.name}
        </div>
        </NavLink>
    )
}

export default DialogItem




