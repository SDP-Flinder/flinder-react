import React, { useEffect } from 'react';
import { FormControl } from '@mui/material';
import { InputLabel } from '@mui/material';
import { OutlinedInput } from '@mui/material';
import { InputAdornment } from '@mui/material';
import { IconButton } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Paper } from '@mui/material';
import { Grid } from '@mui/material';
import { makeStyles } from "@material-ui/core/styles";
import FormHelperText from '@mui/material/FormHelperText';
import { Alert } from '@mui/material';


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


const ChangePass = (props) => {
    const { error, oldPass, setOldPass } = props;

    useEffect(() => {
        setOldPass('');
    }, [])

    const classes = useStyles();

    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <div>
            <Paper className = {classes.paper} variant="outlined">
                <Grid container spacing = {2} xs = {12}>
                <Grid item xs = {12}>
                    <FormControl 
                    variant = "outlined"
                    error = {error.oldPass?true:false}
                    fullWidth>
                    <InputLabel 
                    htmlFor="outlined-adornment-password">Old Pass</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        type={showPassword ? 'text' : 'password'}
                        value = {oldPass}
                        onChange = {e => setOldPass(e.target.value)}
                        endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                            >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                        }
                        label="Password"
                    />
                    {error.oldPass && <FormHelperText> {error.oldPass} </FormHelperText>}
                    </FormControl>
                    </Grid>

                <Grid item xs = {12}>
                    <FormControl 
                        variant="outlined"
                        error = {error.password? true: false}
                        fullWidth
                    >
                    <InputLabel htmlFor="outlined-adornment-password">New Pass</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        type={showPassword ? 'text' : 'password'}
                        value = {props.pw}
                        onChange = {e => {
                            props.setPw(e.target.value);
                        }}
                        endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                            >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                        }
                        label="Password"
                    />
                    {error.password && <FormHelperText> {error.password} </FormHelperText>}
                    </FormControl>

                    </Grid>

                    <Grid item>
                    <Alert severity ="warning">Once you save changes, you will be automatically logged out of the system.</Alert>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    )
}

export default ChangePass