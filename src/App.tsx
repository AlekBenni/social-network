import React, { Component } from 'react';
import './App.css';
import Footer from './Components/Footer/Footer';
import Nav from './Components/Nav/Nav';
import {BrowserRouter, Route, withRouter} from 'react-router-dom'
import News from './Components/News/News';
import DialogsConteiner from "./Components/Dialogs/DialogsConteiner";
import UsersConteiner from "./Components/Users/UsersConteiner";
import ProfileConteiner from "./Components/Profile/ProfileConteiner";
import HeaderConteiner from "./Components/Header/HeaderConteiner";
import Login from "./Components/Login/Login";
import {connect} from "react-redux";
import {getAuthUserData} from './Redux/auth-reducer'
import { compose } from 'redux';
import {initializeApp} from './Redux/app-reducer'
import Preloader from './Components/common/preloader/Preloader';


type PropsType = {
  initializeApp: () => void
  initialized: boolean
}

class App extends Component <PropsType> {

  componentDidMount() {
    this.props.initializeApp()
  }

  render (){

    if(!this.props.initialized){
      return <Preloader />
    }

  return (
    <BrowserRouter>
    <div className="App">
        <HeaderConteiner />
        <div className="wrapper">
          <Nav />
          <div className='right_wrapper'>
          <Route path="/dialogs" render = {() => 
          <DialogsConteiner />} />
          <Route path="/profile/:userId?" render = {() => <ProfileConteiner />} />
          <Route path="/news" render = {() => <News />} />
          <Route path="/users" render = {() => <UsersConteiner />} />
              <Route path="/login" render = {() => <Login />} />
          </div>
        </div>
        <Footer />
    </div>
    </BrowserRouter>
  )}
}

// Не работает этот компос!
// export default compose(
//   withRouter,
//   connect (null, {initializeApp }))(App)
const mapStateToProps = (state:any) => ({
  initialized: state.app.initialized
}) 

   export default connect (mapStateToProps, {initializeApp })(App)