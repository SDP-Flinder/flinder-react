import React from 'react';

//Initial draft - ignore

function ListingForm(props) {
    const description = React.useRef(null);
    const roomAvailable = React.useRef(null);
    const rent = React.useRef(null);
    const rentUnits = React.useRef(null);
    const utilities = React.useRef(null);

    const handleSubmit = e => {
        e.preventDefault();
        const formData = {
            description: description.current.value,
            roomAvailable: roomAvailable.current.value,
            rent: rent.current.value,
            rentUnits: rentUnits.current.value,
            utilities: utilities.current.value,
        }
        console.log(formData);
    };

    return (
        <form onSubmit={handleSubmit}>
        <div className="container">
            <h1>Create Listing</h1>
            <label>Description:</label>
                <textarea autoFocus placeholder="description of the room/flat" ref={description} />
            <label>Room Available:</label>
                <input type="date" ref={roomAvailable} />
            <label>Rent Amount:</label>
                <input type="number" placeholder="150" ref={rent} />
            <label>Rent Units:</label>
                <select type="text" ref={rentUnits}>
                    <option value="perWeek">Weekly</option>
                    <option value="perFortnight">Fortnightly</option>
                    <option value="perMonth">Monthly</option>
                </select>
            <label>Utilities:</label>
                <textarea placeholder="fiber internet, gas heating, etc." ref={utilities} />
                <button type="submit" className="myButton">Create</button>
        </div>
        </form>
    );
}

export default ListingForm;