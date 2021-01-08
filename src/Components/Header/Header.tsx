import React from 'react'
import s from './Header.module.css'
import { NavLink } from 'react-router-dom'

type PropsType = {
    isAuth: any
    login: any
    logout: any
}

const Header = (props: PropsType) => {
    return(
        <div className={s.wrapper}>
            <img className={s.img} src="https://store.playstation.com/store/api/chihiro/00_09_000/container/UA/ru/999/EP2402-CUSA05624_00-AV00000000000019/1576760046000/image?w=240&h=240&bg_color=000000&opacity=100&_version=00_09_000" />


            <div className={s.authBlock}>
                { props.isAuth 
                ? <div> {props.login} <button onClick={props.logout}>Logout</button> </div>
                : <NavLink to={'/login'}>Login</NavLink>}

            </div>

        </div>
    )
}

export default Header