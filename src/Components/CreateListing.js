import React from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

class CreateListing extends React.Component {
    constructor(props) {
        super(props);

        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onChangeRent = this.onChangeRent.bind(this);
        this.onChangeRentUnits = this.onChangeRentUnits.bind(this);
        this.onChangeUtilities = this.onChangeUtilities.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            description: '',
            roomAvailable: new Date(),
            rent: undefined,
            rentUnits: '',
            utilities: ''
        };
    }

    componentDidMount() {
        this.setState({
            rentUnits: 'Weekly'
        })
    }

    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        });
    }

    onChangeDate(date) {
        this.setState({
            date: date
        });
    }

    onChangeRent(e) {
        this.setState({
            rent: e.target.value
        });
    }

    onChangeRentUnits(e) {
        this.setState({
            rentUnits: e.target.value
        });
    }

    onChangeUtilities(e) {
        this.setState({
            utilities: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const listing = {
            description: this.state.description,
            roomAvailable: this.state.roomAvailable,
            rent: this.state.rent,
            rentUnits: this.state.rentUnits,
            utilities: this.state.utilities
        };

        console.log(listing);
    }

    render() {
        return (
            <div>
                <h3>Create New Listing</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Description:</label>
                        <textarea 
                            autoFocus 
                            required 
                            className="form-control"
                            placeholder="description of the room/flat" 
                            value={this.state.description} 
                            onChange={this.onChangeDescription} 
                        />
                    </div>
                    <div className="form-group">
                        <label>Room Available:</label>
                        <div>
                            <DatePicker
                                selected={this.state.roomAvailable}
                                onChange={this.onChangeDate}
                            />
                        </div>
                    </div>
                    <div classname="form-group">
                        <label>Rent Amount:</label>
                        <input
                            type="number"
                            required
                            className="form-control"
                            placeholder="eg 200"
                            value={this.state.rent}
                            onChange={this.onChangeRent}
                        />
                    </div>
                    <div className="formGroup">
                        <label>Rent Units:</label>
                        <select ref="userInput"
                            required
                            className="form-control"
                            value={this.state.rentUnits}
                            onChange={this.onChangeRentUnits}>
                                <option value="perWeek">Weekly</option>
                                <option value="perFortnight">Fortnightly</option>
                                <option value="perMonth">Monthly</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Utilities:</label>
                        <textarea
                            className="form-control"
                            placeholder="fiber internet, gas heating, etc."
                            value={this.state.utilities}
                            onChange={this.onChangeUtilities}
                        />
                        <button type="submit" className="myButton">Create</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default CreateListing