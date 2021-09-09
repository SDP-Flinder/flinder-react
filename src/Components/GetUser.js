import { useState } from 'react';
import axios from 'axios';

//Currently bugged, will look at fixing later

function GetUser() {
    const [user, setUser] = useState({});

    const account = {
        username: 'billymcdowd',
        password: 'Datsyuk13'
    }

    axios.post('http://localhost:4000/users/authenticate', account)
        .then(res => {
            setUser(res.data);
        })

    return(user);
}

export default GetUser;