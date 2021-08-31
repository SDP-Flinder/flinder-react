import React from 'react';

class Match extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: props.name,
            age: props.age,
            key: props.key
        };
    }
}

export default class MatchList extends React.Component {
    constructor(props) {
        super(props);

        this.selectMatch = this.selectMatch.bind(this);

        this.state = { matches: [] };
    }

    componentDidMount() {
        this.state.matches.push(new Match({ name: "Bob", age: 25, key: 0 }));
        this.state.matches.push(new Match({ name: "John", age: 30, key: 1 }));
        this.state.matches.push(new Match({ name: "Jane", age: 28, key: 2 }));
        this.state.matches.push(new Match({ name: "Alice", age: 22, key: 3 }));
    }

    selectMatch(e) {
        //Code to display selected match here
    }

    matchList() {
        return this.state.matches.map(currentMatch => {
            return <Match match={currentMatch} key={currentMatch.key} />;
        })
    }

    render() {
        return (
            <div>
                <h3>Current Matches</h3>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.matchList()}
                    </tbody>
                </table>
            </div>
        );
    }
}