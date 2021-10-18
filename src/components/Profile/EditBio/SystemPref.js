import React, { useEffect } from 'react'
import { Grid, Paper } from '@mui/material';
import { makeStyles } from "@material-ui/core/styles";
import TextField from '@material-ui/core/TextField';
import { InputLabel, Typography } from '@material-ui/core';
import DatePicker from 'react-date-picker';
import moment from 'moment';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: "left",
        color: theme.palette.text.secondary,
    }
}));

const SystemPreferences = (props) => {
    const classes = useStyles();
    const { error } = props;

    useEffect(() => {
        if (props.newUser.receiveNotifications === undefined) {
            props.setUser((prevUser) => ({
                ...prevUser,
                receiveNotifications: true,
            }
            ));
        }
    }, [])

    return (
        <Paper className={classes.paper} variant="outlined">
            <Grid container spacing={2} xs={12}>
                

                <Grid item container>
                    <Grid item xs={12}>
                        <Typography variant="body2">
                            System Preferences
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <FormGroup component="fieldset">
                            <FormControlLabel
                                control={<Checkbox
                                    id="receiveNotifications"
                                    name="receiveNotifications"
                                    color="primary"
                                    checked={props.newUser.receiveNotifications === undefined ? false : props.newUser.receiveNotifications}
                                    onChange={() => {
                                        props.setUser((prevUser) => ({
                                            ...prevUser,
                                            receiveNotifications: !prevUser.receiveNotifications
                                        }
                                        ));
                                    }}
                                />}
                                label="Receive Notifications"
                                labelPlacement="end"
                            />
                        </FormGroup>
                    </Grid>
                </Grid>

            </Grid>

        </Paper>
    )
}

export default SystemPreferences