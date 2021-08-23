//The user signs up as a flatee
import React from 'react'
import Button from '@material-ui/core/Button';

const Flatee = (props) => {
    
    return (
        <div>
            <h1>You're a flatee</h1>
            <Button variant="contained" onClick = {() => {
            props.history.push('/');
            }}>
                Back
            </Button>

            <Button variant="contained" color="secondary" onClick = {( )=> {
            {
            props.history.push('/complete')}
            }}>
            Complete
            </Button>
        </div>
    )
}

export default Flatee
