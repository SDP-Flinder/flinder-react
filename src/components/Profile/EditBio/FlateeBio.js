import React, { useEffect } from 'react'
import { Alert, Button, Grid, InputLabel, Paper, TextField, Typography } from '@mui/material';
import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: "left",
        color: theme.palette.text.secondary,
    },
    wordLimitDisplay: {
        textAlign: "right",
    },
}));

const FlateeBio = (props) => {
    const classes = useStyles();
    const {error} = props;
    const [word, setWord] = React.useState(0);

    useEffect(() => {
        if(props.newUser.bio){
            setWord(countWords(props.newUser.bio));
        } else {
            setWord(0);
        }
    }, [])


    const countWords = (text) => {
        return text.split(' ')
        .filter(function(n) { return n != '' })
        .length;
    }

    const resetBio = () => {
            //Empty field
        props.setUser((prevUser) => ({ 
            ...prevUser, 
             ...{bio: ""} }
        ))

        setWord(0);
    }
    
    return (
        <Paper className = {classes.paper} variant="outlined">
            <Grid container spacing = {2} xs = {12}>

                <Grid item xs = {12}>
                    <Alert severity = "info">
                        Adding a short blurb can increase your chance of getting a match!
                    </Alert>
                </Grid>

                <Grid item xs = {12}>
                    <TextField 
                     id="outlined-basic" label="Your Bio" variant="outlined" 
                     type = "text"
                     value = {props.newUser.bio}
                     inputProps={{ maxLength: 500 }}
                     onChange = {e => {
                            props.setUser((prevUser) => ({ 
                                ...prevUser, 
                                ...{bio: e.target.value} }
                                ));
                            setWord(countWords(e.target.value));
                     }}
                     autoComplete="off"
                     multiline
                     rows={4}
                    fullWidth
                    required
                    error = {error.description ? true : false}
                    helperText = {error.description ? error.description : null}
                    />
                </Grid>

                <Grid  item xs = {12}>
                    <Typography className = {classes.wordLimitDisplay} variant = "body2">
                            {word}/250
                    </Typography>
                </Grid>

                <Grid item xs = {12}>
                <Button variant = "outlined" 
                onClick = {resetBio}
                >
                    Use an empty bio
                </Button>
                </Grid>
                
            </Grid>

        </Paper>
    )
}

export default FlateeBio