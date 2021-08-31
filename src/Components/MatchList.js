import React from 'react';
import Match from './Match';

export default class MatchList extends React.Component {
    constructor(props) {
        super(props);

        // this.selectMatch = this.selectMatch.bind(this);

        this.state = {
            matches: [],
            currentMatch: new Match('', 0, 0)
        };
    }

    componentDidMount() {
        var match1 = new Match('Bob', 25, 0);
        var match2 = new Match('John', 30, 1);
        var match3 = new Match('Jane', 28, 2);
        var match4 = new Match('Alice', 22, 3);

        this.state.matches.push(match1);
        this.state.matches.push(match2);
        this.state.matches.push(match3);
        this.state.matches.push(match4);

        console.log(this.state.matches.length);
        console.log(this.state.matches);
        console.log(this.state.currentMatch);

        this.matchList();
    }

    matchList() {
        var matches = this.state.matches.slice();
        var currentMatch = this.state.currentMatch;

        matches.forEach(match => {
            var button = document.createElement("button");
            button.type = 'button';
            button.appendChild(document.createTextNode(match.state.name));
            button.onclick = function () { selectMatch(match.state.key)};
            document.getElementById("buttons").appendChild(button);
        });

        function selectMatch(key) {
            matches.forEach(match => {
                if (match.state.key === key) {
                    currentMatch = match;
                    console.log(currentMatch);
                    return;
                }
            })
        }
    }

    render() {
        return (
            <div>
                <h3>Pending Matches</h3>
                <div id="buttons"></div>
                <container>
                    <h3>{this.state.currentMatch.name}</h3>
                    <h3>{this.state.currentMatch.age}</h3>
                    <p>{this.state.currentMatch.key}</p>
                </container>
            </div>
        );
    }
}