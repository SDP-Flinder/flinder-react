import { useState } from 'react';
import Button from '@mui/material/Button';
import React from 'react';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import { Grid } from '@material-ui/core';
import { GetUser } from './AxiosHelpers';

function Login(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const onSubmit = (e) => {
        e.preventDefault();

        GetUser({username: username, password: password, updateListings: props.updateListings, updateUser: props.updateUser});

        props.history.push('/account')
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <Grid
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                >
                <h2>Login</h2>
                    <div>
                        <FormControl>
                            <TextField className="input"
                                label="Username"
                                variant="outlined"
                                onChange={e => setUsername(e.target.value)}
                            />
                            <br />
                        </FormControl>
                    </div>
                    <br />
                    <FormControl>
                        <TextField className="input"
                            label="Password"
                            variant="outlined"
                            type="password"
                            name="inputUser.password"
                            onChange={e => setPassword(e.target.value)}
                            placeholder="Enter your password"
                        />
                        <br />
                    </FormControl>
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <Button className="button"
                        variant="contained" color="secondary" type="submit">
                        Login
                    </Button>
                </Grid>
            </form>
        </div>
    );
}

export default Login;