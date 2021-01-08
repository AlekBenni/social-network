import React from "react";
import Profile from "./Profile";
import axios from "axios";
import { connect } from "react-redux";
import {RootStateType} from "../../Redux/redux-store";
import {
    addPostActionCreator,
    getUserProfile, getStatus, updateStatus
} from "../../Redux/profile-reducer";
import { withRouter, RouteComponentProps } from "react-router-dom";
import {compose, Dispatch} from "redux";
import {usersAPI} from "../../api/Api";
import {Redirect} from "react-router-dom";
import {WithAuthRedirect} from '../../hoc/WithAuthRedirectComponent'

type PathParamType = {
    userId: any     // В уроке это было string
}

type MapStatePropsType = {
    profile: any
    isAuth: boolean
    status: any
    autorizerUserId: any
}

type MapDispatcPropsType = {    //  Нигде напрямую не испоьзуется
    getUserProfile: (profile: any) => void
    getStatus: (profile: any) => void
    updateStatus: (status:any) => void
}

type OwnPropsType = MapDispatcPropsType & MapStatePropsType

type PropsType = RouteComponentProps<PathParamType> & OwnPropsType

class ProfileConteiner extends React.Component<PropsType> {

    componentDidMount() {
        let userId = this.props.match.params.userId

        if(!userId){
            userId = this.props.autorizerUserId;    
            if(!userId){
                this.props.history.push("/login")
            }
        }

        this.props.getUserProfile(userId)

        this.props.getStatus(userId)

    }

    render(){

    return (
        <div>
            <Profile {...this.props}
            profile={this.props.profile} isAuth={this.props.isAuth} status={this.props.status}
            updateStatus={this.props.updateStatus}
            />
        </div>
    )
}}

let mapStateToProps = (state: RootStateType):MapStatePropsType => {
    return {
        profile: state.profilePage.profile,
        isAuth: state.auth.isAuth,
        status: state.profilePage.status,
        autorizerUserId: state.auth.userId
    }
}

export default compose<React.ComponentClass>(
    connect(mapStateToProps, {getUserProfile, getStatus, updateStatus}),
    withRouter,
    // WithAuthRedirect
)(ProfileConteiner)
