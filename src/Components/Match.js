import React from 'react';

export default class Match extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: props.name,
            age: props.age,
            key: props.key
        };
    }

    render() {
        return (
            <container>
                <h3>{this.state.name}</h3>
                <h3>{this.state.age}</h3>
                <p>{this.state.key}</p>
            </container>
        );
    }
}