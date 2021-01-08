import {
    PostType,
    ActionsTypes,
    RootStateType,
    SendMessageActionType,
    UpdateNewMessageBodyActionType,
    MessageType
} from './redux-store'

const SEND_MESSAGE = 'SEND-MESSAGE'

let initialState = {
    dialogData: [
        {id: 1, name: 'Alek'},
        {id: 2, name: 'Jessica'},
        {id: 3, name: 'Daniella'},
        {id: 4, name: 'Victor'},
        {id: 5, name: 'Rafael'},
        {id: 6, name: 'Lorena'}
    ],
    messagesData: [
        {id: 1, message: 'Hello'},
        {id: 2, message: 'Yo, glad to see you'},
        {id: 3, message: 'How do you do dude?'},
        {id: 4, message: 'I am fine, like an always'},
        {id: 5, message: 'Very nice, what do you doing now?'},
        {id: 6, message: 'I go to do my job'}
    ],
}

export const dialogsReducer = (state = initialState, action: ActionsTypes) => {

    switch (action.type){
        case "SEND-MESSAGE": {
            let message: MessageType = {
                id: 6,
                message: action.newMessageBody,
            }
            let stateCopy = {...state}
            stateCopy.messagesData = [...state.messagesData]
            stateCopy.messagesData.push(message)
            return stateCopy
        }
        default: return state
    }
}
export const sendMessageActionCreator = (newMessageBody:any):SendMessageActionType => ({type: SEND_MESSAGE, 
    newMessageBody:newMessageBody
})

export default dialogsReducer

