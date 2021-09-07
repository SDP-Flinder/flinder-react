
// const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MTJkNTJmN2ZmOGQ4YWM4NzJjMGRjMGEiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzA5ODU2NDMsImV4cCI6MTYzMTU5MDQ0M30.1Ys-eD_4cA-1pomH6f9Osf0rrhnVxlfLbrjVF0Y1600';

// export default TOKEN;

import axios from 'axios';

const TOKEN = async () => {
    let token = '';
    const account = {
        username: 'admin',
        password: 'admin'
    }

    token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MTJkNTJmN2ZmOGQ4YWM4NzJjMGRjMGEiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzA5ODU2NDMsImV4cCI6MTYzMTU5MDQ0M30.1Ys-eD_4cA-1pomH6f9Osf0rrhnVxlfLbrjVF0Y1600';

    await axios.post('http://localhost:4000/authenticate', account)
    .then(res => {
        console.log(res);
    })

    return token;
}

export default TOKEN



