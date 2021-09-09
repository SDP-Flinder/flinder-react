import React from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends React.Component {

  render() {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="/" className="navbar-brand">Home Page</Link>
        <div className="collpase navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="navbar-item">
          <Link to="/listings/add" className="nav-link">Create Listing</Link>
          </li>
          <li className="navbar-item">
          <Link to="/listings/update" className="nav-link">Update Listing</Link>
          </li>
        </ul>
        </div>
      </nav>
    );
  }
}