import React from "react"
import { NavLink } from "react-router-dom";

import "./Header.scss"


const Header = () => {

    return (
        <div className="container">
            <div className="header">
                <nav>
                    <ul className="nav-list">
                        <li><NavLink exact to="/" className="nav-link">Home</NavLink></li>
                        <li><NavLink to="/favorites" className="nav-link">Favorites</NavLink></li>
                        <li><NavLink to="/cart" className="nav-link">Cart</NavLink></li>
                    </ul>
                </nav>
            </div>
        </div>
    )
}

export default Header;