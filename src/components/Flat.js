//The user chooses to sign up as a Flat
import React from 'react'
import Button from '@material-ui/core/Button';

const Flat = (props) => {
    return (
        <div>
            <h1>You're a flat ass</h1>

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

export default Flat
