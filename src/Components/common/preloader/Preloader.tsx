import React from 'react'
import preloader from "../../../assets/images/preloader.gif";

type PropsType = {

}

let Preloader = (props: PropsType) => {
    return (
        <img src={preloader} />
    )
}

export default Preloader