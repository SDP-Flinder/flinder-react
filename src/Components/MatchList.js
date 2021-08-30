import React from 'react';

const Match = props => (
    <tr>
        <td>{props.match.name}</td>
        <td>{props.match.age}</td>
    </tr>
)

class MatchList extends React.Component {
    constructor(props) {
        super(props);

        this.selectMatch = this.selectMatch.bind(this);

        //Basic array for testing purposes
        this.state = {matches: ["Bob", "John", "Jane", "Mary"]};
    }

    componentDidMount() {
        //Code to pull matches from server here
    }

    selectMatch(e) {
        //Code to display selected match here
    }

    matchList() {
        return this.state.matches.map(currentMatch => {
            return <Match match={currentMatch} key={currentMatch.key}/>;
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

export default MatchList;