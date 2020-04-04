import React, { useState, useContext } from 'react';
import '../styles/Header.css';
import { RadarChart } from 'recharts';
import { UserContext } from '../Providers/UserProvider'; 
import { Link } from 'react-router-dom';

function Header(){
    const user = useContext(UserContext);
    return (
        <div className="top-banner">
            <div className="nav">
                <ul className="nav-list">
                    <li className="nav-list-item"><Link to="/"className="hover-highlight">Account</Link></li>
                    <li className="nav-list-item"><a className="hover-highlight">Edit Subjects</a></li>
                    <li className="nav-list-item"><a className="hover-highlight">View Statistics</a></li>
                    <li className="nav-list-item last-list-item">Welcome, {(user === null)? 'No-one' : user.displayName}</li>
                </ul>
            </div>
            <div className="title-div">
                <h1 className="title">Grade Tracker</h1>
            </div>
        </div>
    );
}

export default Header;