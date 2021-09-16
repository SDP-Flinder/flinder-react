import React, { useState } from 'react';
//Not currently used - got error I don't have time to debug
function Match(props) {
    const [name] = useState(props.name);
    const [age] = useState(props.age);
    const [key] = useState(props.key);

    return (
        <div>
            <h3>{name}</h3>
            <h3>{age}</h3>
            <p>{key}</p>
        </div>
    );
}

export default Match;