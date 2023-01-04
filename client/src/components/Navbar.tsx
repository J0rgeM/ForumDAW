import React from 'react';
import {Link} from "react-router-dom";

function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link to="/" className="navbar-brand"> BlogGIF</Link>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse justify-content-end" id="navbarNavDropdown">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link to="/" className="nav-link active rounded-3" aria-current="page">Home</Link>
                        </li>

                        <li className="nav-item">
                            <Link to="/getPost" className="nav-link active rounded-3" aria-current="page" >List Posts</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;

