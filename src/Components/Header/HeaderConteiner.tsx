import React from 'react'
import s from './Header.module.css'
import Header from "./Header";
import axios from "axios";
import {connect} from "react-redux";
import {RootStateType} from "../../Redux/redux-store";
import {getAuthUserData, setAuthUserData, logout} from "../../Redux/auth-reducer";
import {authAPI} from "../../api/Api";

type Propstype = {
    setAuthUserData: (id: any, email: any, login: any, isAuth:boolean) => void
    isAuth: any
    login: any
    getAuthUserData: () => void
    logout: any
}

class HeaderConteiner extends React.Component<Propstype> {

    render() {
        return(
            <Header {...this.props}
            />
        )
    }
}

let MapStateToProps = (state: RootStateType) => {
    return {
        isAuth: state.auth.isAuth,
        login: state.auth.login
    }

}

export default connect (MapStateToProps, {setAuthUserData, getAuthUserData,
logout
}) (HeaderConteiner)