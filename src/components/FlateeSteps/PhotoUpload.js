import React from 'react'
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import Fab from '@material-ui/core/fab';
import SettingsBackupRestoreIcon from '@material-ui/icons/SettingsBackupRestore';
import { useState, useEffect } from 'react';

const PhotoUpload = (props) => {
    //const [photo, setPhoto] = useState({});
    const {photo, setPhoto} = props;
    const [photoDisplay, setPhotoDisplay] = useState('');

    const handleChange = e => {
        setPhotoDisplay(URL.createObjectURL(e.target.files[0]));
        console.log(e.target.files[0])
        setPhoto(e.target.files[0]);
    }

    useEffect(() => {
        console.log('photo name is...', photo)
        setPhoto(photo);
    }, [photo])

    return (
        <div>
                {props.user.role == 'flatee'? <h6>Choose a profile photo</h6> :
                <h6>What does your flat looks like?</h6>}
                
                {photo != '' &&  <img alt="Avatar"
                className = {props.user.role == 'flatee' ? "avatar" : "display-flat"}
                onClick = {console.log('click')}
                src={photoDisplay} />}

                <br/>
                <input
                id="contained-button-file"
                multiple
                type="file"
                accept="image/png, image/jpg, image/jpeg"
                onChange={handleChange}
                hidden
                />
                {photo == ''? 
                <label htmlFor="contained-button-file">
                    <Fab component="span" 
                    color = "secondary"
                    variant="extended"
                    size ="medium">
                    <AddPhotoAlternateIcon />
                    ADD
                    </Fab>
                </label>
                : <label htmlFor="contained-button-file">
                <Fab component="span" 
                variant="extended"
                size ="small">
                <SettingsBackupRestoreIcon />
                REPLACE
                </Fab>
                </label>
                }

        </div>
    )
}

export default PhotoUpload
