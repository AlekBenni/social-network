import React, { ChangeEvent } from 'react'

type PropsType = {
    status: string
    updateStatus: any
}

class ProfileStatus extends React.Component <PropsType>{

    state = {
        editMode: false,
        status: this.props.status
    }

    activateEditMode = () => {
        this.setState({
            editMode: true
        })
    }

    deActivateEditMode = () => {
        this.setState({
            editMode: false
        })
        this.props.updateStatus(this.state.status)
    }

    onStatusChange = (e:ChangeEvent<HTMLInputElement>) => {
        this.setState({
            status: e.currentTarget.value
        })
    }

    componentDidUpdate(prevProps:any){
        if(prevProps.status !== this.props.status){
            this.setState({
                status: this.props.status
            })
        }
    }

    render (){
    return (
        <>
        {!this.state.editMode &&  
        <div>
            <span onDoubleClick={this.activateEditMode}>{this.props.status || 'Status no exist'}</span>
        </div>}
        {this.state.editMode &&
        <div>
            <input
            onChange={this.onStatusChange}
            autoFocus={true}
            onBlur={this.deActivateEditMode}
            value={this.state.status}
            />
        </div>}
        </>
    )}
}

export default ProfileStatus