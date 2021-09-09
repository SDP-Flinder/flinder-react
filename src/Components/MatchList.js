import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import Match from './Match';
// import TOKEN from '../token';

function MatchList() {
    var match1 = {name: 'Bob', age: 25, key: 0};
    var match2 = {name: 'John', age: 30, key: 1};
    var match3 = {name: 'Jane', age: 28, key: 2};
    var match4 = {name: 'Alice', age: 22, key: 3};
    const [matches] = useState([match1, match2, match3, match4]);
    const [currentMatch, setCurrentMatch] = useState({name: '', age: 0, key: 0});

    // const getMatches = async () => {
    //     matchList();

    //     const URL = 'http://localhost:4000/matches/getSuccessMatches'
    //     const USER_TOKEN = TOKEN;

    //     axios.get(URL, { headers: { Authorization: `Bearer ${USER_TOKEN}` } })
    //         .then(res => console.log(res.data));
    // }

    useEffect(() => matchList(), []);

    const matchList = () => {
        // var matches = matches.slice();
        // var currentMatch = currentMatch.slice();

        matches.forEach(match => {
            var button = document.createElement("button");
            button.type = 'button';
            button.appendChild(document.createTextNode(match.name));
            button.onclick = function () { selectMatch(match.key) };
            document.getElementById("buttons").appendChild(button);
        });

        function selectMatch(key) {
            matches.forEach(match => {
                if (match.key === key) {
                    setCurrentMatch(match);
                    // console.log(currentMatch);
                    return;
                }
            })
        }
    }

    return (
        <div>
            <h3>Pending Matches</h3>
            <div id="buttons"></div>
            {/* <container> */}
            <h3>{currentMatch.name}</h3>
            <h3>{currentMatch.age}</h3>
            <p>{currentMatch.key}</p>
            {/* </container> */}
        </div>
    );
}

export default MatchList;