import React, { ChangeEvent } from 'react'
import s from './Dialogs.module.css'
import DialogItem from './DialogsItem/Dialogsitem'
import Message from './Message/Message'
import {ActionsTypes, DialogsPageType, ReduxStoreType} from '../../Redux/redux-store'
import { Redirect } from 'react-router-dom'
import { Field, reduxForm } from 'redux-form'

export type DialogType = {
    name: string
    id: number  
}
export type MessageType = {
    message: string
}

type PropsType = {
    dialogsPage: DialogsPageType
    updateNewMessageBody: any
    sendMessage: any
    isAuth: any
}

const Dialogs = (props: PropsType) => {

                //UsersAPIcomponent list
    let dialogsElements = props.dialogsPage.dialogData.map(item => (<DialogItem name={item.name} id={item.id} />))
                //UsersAPIcomponent message
    let messagesElements = props.dialogsPage.messagesData.map(item => (<Message message={item.message} />))

    let newBody = props.dialogsPage.newMessageBody // Value для textarea

    let addMessage = (values:any) => {
        props.sendMessage(values.newMessageBody)
    }

    if(!props.isAuth) return <Redirect to={'/Login'} />

    return (
        <div className={s.wrapper}>
            <div className={s.users}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                <div>{messagesElements}</div>
                    <AddMessageFormRedux onSubmit={addMessage} />
            </div>
        </div>
    )
}

const AddMessageForm = (props:any) => {
    return (
        <form onSubmit={props.handleSubmit}>
        <div>
            <Field component="textarea"           
            name="newMessageBody" 
            placeholder="Enter your message" 
            />
        </div>
        <div><button>Send message</button></div>
        </form>
    )
}

const AddMessageFormRedux = reduxForm({form: "dialogAddMessageForm"})(AddMessageForm)

export default Dialogs




