import React, { PropsWithChildren } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Field, InjectedFormProps, reduxForm } from 'redux-form'
import {login} from './../../Redux/auth-reducer'

type FormDataType = {                                                                   
    email: string
    password: string
    rememberMe: boolean
}

const errorStyle = {
    backgroundColor: "black",
    padding: '10px',
    borderRadius: '10px',
    margin: '10px 0',
    color: 'white'
}

const LoginForm: React.FC<InjectedFormProps<FormDataType>> = (props: PropsWithChildren<any>) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field placeholder={"Login"} name={"email"} component={"input"} />
            </div>
            <div>
                <Field placeholder={"Password"} name={"password"} 
                type={"password"} component={"input"} />
            </div>
            <div>
                <Field type={"checkbox"} name={"rememberMe"} component={"input"} />remember me
            </div>
            {props.error
            ? 
             <div style={errorStyle}>
                YOUR FORM IS WRONG!!! {props.error}
            </div>
            : ""
            }
           
            <div>
                <button>Login</button>
            </div>
        </form>
    )
}

const LoginReduxForm  =  reduxForm<FormDataType>({ form: 'login' })(LoginForm)

const Login = (props:any) => {
    const onSubmit = (formData:FormDataType) => {
        props.login(formData.email, formData.password, formData.rememberMe)
    }

    if(props.isAuth){
        return <Redirect to={'/profile'}/>
    }

    return (
        <div>
        <h1>Login</h1>
           <LoginReduxForm onSubmit={onSubmit} />
        </div>
    )
}

const mapStateToProps = (state:any) => ({ isAuth: state.auth.isAuth })

export default connect(mapStateToProps, {login}) (Login)