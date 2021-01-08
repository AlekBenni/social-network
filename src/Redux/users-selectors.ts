
export const getUserses = (state:any) => {
    return state.usersPage.users
}

export const getPageSize = (state:any) => {
    return state.usersPage.pageSize
}

export const getTotalUsersCount = (state:any) => {
    return state.usersPage.totalUsersCount
}

export const getCurrentPage = (state:any) => {
    return state.usersPage.currentPage
}

export const getIsFatching = (state:any) => {
    return state.usersPage.isFatching
}

export const getFollowInProgress = (state:any) => {
    return state.usersPage.followingProgress
}