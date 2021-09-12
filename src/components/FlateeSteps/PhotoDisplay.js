import React from 'react'

const PhotoDisplay = (props) => {
    return (
        <div>
            <img alt="Avatar"
                className = "display-avatar"
                onClick = {() => console.log('clicked')}
            src={props.photo} />
        </div>
    )
}

export default PhotoDisplay
