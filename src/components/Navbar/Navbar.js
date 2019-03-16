import React from 'react'
import 'bootstrap'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-sm bg-primary navbar-dark">
            <div className="container">
                <a className="navbar-brand display-3" href="#">EasyEvent</a>
                <button className="navbar-toggler" data-toggle="collapse" data-target="#collapsibleNavId">
                    <i className="material-icons">menu</i>
                </button>
                <div className="collapse navbar-collapse" id="collapsibleNavId">
                    <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
                        <li className="nav-item">
                            <NavLink className="nav-link" activeClassName="active" to="/auth">Authentication</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" activeClassName="active" to="/event">Events</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" activeClassName="active" to="/booking">Booking</NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
