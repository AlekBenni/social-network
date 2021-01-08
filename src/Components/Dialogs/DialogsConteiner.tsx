import React, {ChangeEvent} from 'react'
import { sendMessageActionCreator} from '../../Redux/dialogs-reducer'
import {ActionsTypes, DialogsPageType, ReduxStoreType, RootStateType} from '../../Redux/redux-store'
import Dialogs from "./Dialogs";
import { connect } from 'react-redux';
import { compose, Dispatch } from 'redux';
import { Redirect } from 'react-router-dom'
import {WithAuthRedirect} from '../../hoc/WithAuthRedirectComponent'

let mapStateToProps = (state: RootStateType) => {
    return {
        dialogsPage: state.dialogsPage,
        isAuth: state.auth.isAuth
    }
}

let mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        sendMessage: (newMessageBody:any) => {
            dispatch(sendMessageActionCreator(newMessageBody))
        }
    }
}

export default compose<React.FC>(
    connect(mapStateToProps, mapDispatchToProps),
    WithAuthRedirect
    )(Dialogs)





