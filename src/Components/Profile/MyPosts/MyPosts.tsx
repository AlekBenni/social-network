import React, { ChangeEvent } from 'react'
import { Field, reduxForm } from 'redux-form'
import { maxLengthCreator, required } from '../../utilits/validator/validators'
import s from './MyPosts.module.css'
import Post from './Post/Post'

const maxLength10 = maxLengthCreator(10)

export type Postype = {
    id: number
    post: string
    likeCount: number
}

type PropsType = {
    posts: Array<Postype>
    newPostText: string
    addPost: (newPostText:any) => void
}

const MyPosts = (props: PropsType) => {

    let postsElements = props.posts.map(p => <Post message={p.post} likeCount={p.likeCount} />)
    
    const onAddPost = (values:any) => {
            props.addPost(values.newPostText)
         }

    return (
        <div className={s.wrapper}>
            <div className={s.header}>
                <div className={s.textarea}>
                    <h3>My Posts:</h3>

                    <AddNewPostFormRedux onSubmit={onAddPost} />

                </div>
                {postsElements}
            </div>
        </div>
    )
}

const AddNewPostForm = (props:any) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <Field name="newPostText" 
            validate={[required, maxLength10]}
                component="textarea"
                className={s.area}>                      
                </Field>
                <div className={s.btn_wrapper}>
                    <button className={s.btn}>Send message</button>
                </div>   
        </form>
    )
}

const AddNewPostFormRedux = reduxForm({
    form: "ProfileAddNewPostForm"
})(AddNewPostForm)

export default MyPosts