//The user chooses to sign up as a Flat
import React from 'react'
import Button from '@material-ui/core/Button';
import { useForm } from 'react-hook-form';
import { Form } from 'react-bootstrap';

const Flat = (props) => {
    const { handleSubmit } = useForm({});

    const onSubmit = () => {
        props.history.push('/complete')
    }

    return (
        <div>
            <h1>You're a flat ass</h1>
            
            <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group controlId="username">
                <Form.Label>Username</Form.Label>
                <Form.Control 
                type="text" 
                placeholder="Enter your username" 
                />
            </Form.Group>


            <Button variant="contained" onClick = {() => {
            props.history.push('/');
            }}>
                Back
            </Button>

            <Button variant="contained" color="secondary" type = "submit">
            Complete
            </Button>

            </Form>
        </div>
    );
}

export default Flat
