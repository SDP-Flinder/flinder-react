import React from 'react';

export default class Match extends React.Component {
    constructor(name, age, key) {
        super(name, age, key);

        this.state = {
            name: name,
            age: age,
            key: key
        };
    }

    render() {
        return (
            <div>
                <h3>{this.state.name}</h3>
                <h3>{this.state.age}</h3>
                <p>{this.state.key}</p>
            </div>
        );
    }
}