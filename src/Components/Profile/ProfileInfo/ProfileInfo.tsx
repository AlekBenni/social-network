import React from 'react'
import s from './ProfileInfo.module.css'
import Preloader from "../../common/preloader/Preloader";
import ProfileStatus from './ProfileStatus';

type PropsType = {
    profile: any
    status: any
    updateStatus: any
}

const ProfileInfo = (props: PropsType) => {
    if(!props.profile){
        return <Preloader />
    }
    return (
        <div className={s.wrapper}>
                <div className={s.description}>
                    <img className={s.ava} src={props.profile.photos.large} />
                    <div className={s.description_wrapper}>
                        <h4>{props.profile.fullName}</h4>
                        <p>{props.profile.lookingForAJobDescription}</p>
                        <p>{props.profile.lookingForAJob ? 'Ищу работу' : ''}</p>                 
                    </div>            
                </div>
            <ProfileStatus status={props.status}
             updateStatus={props.updateStatus}
            />    
        </div>
    )
}

export default ProfileInfo