import axios from "axios";

    const instance = axios.create({
        withCredentials: true,
        baseURL: 'https://social-network.samuraijs.com/api/1.0/',
        headers: {
            "API-KEY" : "92cb9125-732f-4ea5-be52-29a7802fd1c2"
        }
    })

    export const usersAPI = {
        getUsers: (currentPage:number, pageSize:number ) => {
            return instance.get(`users?page=${currentPage}&count=${pageSize}`,)
                .then(responce => {
                return responce.data
            })
        },
        follow: (userId: number) => {
                return instance.post(`follow/${userId}`,)
                    .then(responce => {
                        return responce.data
                    })
            },
        unfollow: (userId: number) => {
        return instance.delete(`follow/${userId}`,)
            .then(responce => {
                return responce.data
            })
    },
        getProfile: (userId:number) => {
            console.warn("Please use profileApi")
            return profileAPI.getProfile(userId)
        }
    }

    export const profileAPI = {
        getProfile: (userId:number) => {
            return instance.get(`profile/` + userId)
        },
        getStatus: (userId:number) => {
            return instance.get(`profile/status/` + userId)
        },
        updateStatus: (status:any) => {
            return instance.put(`profile/status`, {
                status: status
            })
        }
    }

    export const authAPI = {
    me() {
             return instance.get(`auth/me`)
    },
    login(email:any, password:any, rememberMe:any = false) { 
        return instance.post(`auth/login`, { email, password, rememberMe })
    },
    logout() {
        return instance.delete(`auth/login`)
}
}



