import React, { useState, useContext, useEffect } from 'react';
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
                    <li className="nav-list-item"><Link to="/subjects" className="hover-highlight">Edit Subjects</Link></li>
                    <li className="nav-list-item"><Link to="/statistics" className="hover-highlight">View Statistics</Link></li>
                    <li className="nav-list-item last-list-item"><Link style={{textDecoration: 'none', color: 'white'}} to="/dashboard">Grade Tracker</Link></li>
                </ul>
            </div>
        </div>
    );
}

export default Header;