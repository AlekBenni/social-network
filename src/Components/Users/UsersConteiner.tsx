import  React from 'react'
import {connect} from "react-redux";
import { compose, Dispatch } from 'redux';
import Users from "./Users";
import {UsersType} from "../../Redux/redux-store";
import Preloader from "../common/preloader/Preloader";
import {
    follow,
    unfollow,
    setUsers,
    setCurrentPage,
    setTotalUsersCount,
    toggleIsFtching,
    toggleFollowingProgress, getUsers
} from '../../Redux/users-reducer';
import { getPageSize, getUserses, getTotalUsersCount, getCurrentPage, getIsFatching, getFollowInProgress } from '../../Redux/users-selectors';

type PropsType = {
    users: Array<UsersType>
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    setUsers: (users: any) => void
    pageSize: number
    totalUsersCount: number
    currentPage: any
    setCurrentPage: (pageNumber: number) => void
    setTotalUsersCount: (count: number) => void
    isFatching: boolean
    toggleIsFtching: (arg0: boolean) => void
    toggleFollowingProgress: (isFatching: boolean, userId: number) => void
    followingProgress: boolean
    getUsers: (currentPage: number, pageSize: number) => void
}

class UsersAPIcomponent extends React.Component<PropsType> {

    componentDidMount() {

    this.props.getUsers(this.props.currentPage, this.props.pageSize)

    }

    onPageChanged = (pageNumber: number) => {
        this.props.getUsers(pageNumber, this.props.pageSize)
    }

    render (){
        return (
            <>
                {this.props.isFatching ? <Preloader/> : null}
            <Users totalUsersCount={this.props.totalUsersCount}
                   pageSize={this.props.pageSize}
                   onPageChanged={this.onPageChanged}
                   users={this.props.users}
                   follow={this.props.follow}
                   unfollow={this.props.unfollow}
                   currentPage={this.props.currentPage}
                   toggleFollowingProgress={this.props.toggleFollowingProgress}
                   followingProgress={this.props.followingProgress}
            />
            </>
        )
    }
}

// let mapStateToProps = (state: any) => {
//     return {
//         users: state.usersPage.users,
//         pageSize: state.usersPage.pageSize,
//         totalUsersCount: state.usersPage.totalUsersCount,
//         currentPage: state.usersPage.currentPage,
//         isFatching: state.usersPage.isFatching,
//         followingProgress: state.usersPage.followingProgress
//     }
// }

let mapStateToProps = (state: any) => {
    return {
        users: getUserses(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFatching: getIsFatching(state),
        followingProgress: getFollowInProgress(state)
    }
}

export default compose (
    //  WithAuthRedirect,  
    connect(mapStateToProps, { follow, unfollow, setUsers, setCurrentPage, setTotalUsersCount, toggleIsFtching, toggleFollowingProgress, getUsers })
)(UsersAPIcomponent)

