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
        console.log(e.target.files[0].name)
        setPhoto(e.target.files[0].name);
    }

    useEffect(() => {
        console.log('photo name is...', photo)
    }, [photo])

    return (
        <div>
                <h6>Choose a profile photo</h6>
                {photo != '' &&  <img alt="Avatar"
                className = "avatar"
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
