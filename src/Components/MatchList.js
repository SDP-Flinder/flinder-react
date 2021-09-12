import React, { useState } from 'react';
import { Grid } from '@material-ui/core';
import Button from '@material-ui/core/Button';

function MatchList() {
    var match1 = { name: 'Bob', age: 25, key: 0 };
    var match2 = { name: 'John', age: 30, key: 1 };
    var match3 = { name: 'Jane', age: 28, key: 2 };
    var match4 = { name: 'Alice', age: 22, key: 3 };
    const [matches] = useState([match1, match2, match3, match4]);
    const [currentMatch, setCurrentMatch] = useState({ name: '', age: 0, key: 0 });

    // const getMatches = async () => {
    //     matchList();

    //     const URL = 'http://localhost:4000/matches/getSuccessMatches'
    //     const USER_TOKEN = TOKEN;

    //     axios.get(URL, { headers: { Authorization: `Bearer ${USER_TOKEN}` } })
    //         .then(res => console.log(res.data));
    // }

    const renderButtons = () => {
        return matches.map((match) => (
            <Button
                className="button"
                variant="contained"
                key={match.key}
                onClick={function () { selectMatch(match.key) }}
            >
                {match.name}
            </Button>
        ))
    }

    const selectMatch = (key) => {
        matches.forEach(match => {
            if (match.key === key) {
                setCurrentMatch(match);
                return;
            }
        })
    }

    return (
        <div>
            <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
            >
                <h3>Pending Matches</h3>
                {renderButtons()}
                <br />
                <h3>{currentMatch.name}</h3>
                <h3>{currentMatch.age}</h3>
                <p>{currentMatch.key}</p>
            </Grid>
        </div>
    );
}

export default MatchList;