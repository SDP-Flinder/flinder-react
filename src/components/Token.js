import axios from "axios";

let token = async () => {
    const account = {
        username: 'admin',
        password: 'admin'
    }
    
    await axios.post('http://localhost:4000/users/authenticate', account)
    .then(res => {
        return(res.data.token);
    })
    
}


export default token;
