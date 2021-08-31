import React from 'react';

// class Match extends React.Component {
//     constructor(props) {
//         super(props);

//         this.state = {
//             name: props.name,
//             age: props.age,
//             key: props.key,
//             press: props.press
//         };
//     }
// }

export default class MatchList extends React.Component {
    constructor(props) {
        super(props);

        // this.selectMatch = this.selectMatch.bind(this);

        this.state = {matches: []};
    }

    componentDidMount() {
        var match1 = {
            name: "Bob",
            age: 25,
            key: 0,
            press: 'console.log("Bob")'
        }

        var match2 = {
            name: "John",
            age: 30,
            key: 1,
            press: 'console.log("John")'
        }

        var match3 = {
            name: "Jane",
            age: 28,
            key: 2,
            press: 'console.log("Jane")'
        }

        var match4 = {
            name: "Alice",
            age: 22,
            key: 3,
            press: 'console.log("Alice")'
        }

        this.state.matches.push(match1);
        this.state.matches.push(match2);
        this.state.matches.push(match3);
        this.state.matches.push(match4);

        this.matchList();
    }

    // selectMatch(e) {
    //     //Code to display selected match here
    // }

    matchList() {
        this.state.matches.forEach( function(v) {
            var button = document.createElement("button");
            button.type = 'button';
            button.appendChild(document.createTextNode(v.name));
            button.setAttribute('onClick',v.press);
            document.getElementById("buttons").appendChild(button);
        });
    }

    render() {
        return (
            <div id="buttons"></div>
        );
    }
}