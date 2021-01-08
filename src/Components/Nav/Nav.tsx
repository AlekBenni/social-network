import React from 'react'
import s from './Nav.module.css'
import {NavLink} from 'react-router-dom'

const Nav = () => {
    return (
        <div className={s.wrapper}>
            <NavLink className={s.link} to="/profile" activeClassName={s.active}>Profile</NavLink>
            <NavLink className={s.link} to="/dialogs" activeClassName={s.active}>Message</NavLink>
            <NavLink className={s.link} to="/news" activeClassName={s.active}>News</NavLink>
            <NavLink className={s.link} to="/users" activeClassName={s.active}>Users</NavLink>
        </div>
    )
}

export default Nav