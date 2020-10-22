import React, { useState, useContext, useEffect } from 'react';
import Header from './Header';
import { db } from '../firebase';
import { RadarChart, PolarAngleAxis, PolarRadiusAxis, PolarGrid, Legend, Tooltip, Radar, Customized } from 'recharts';
import '../styles/Dashboard.css';
import { UserContext } from '../Providers/UserProvider';

function Dashboard(props){
    const [data, setData] = useState([]);
    const user = useContext(UserContext);

    useEffect(() => {
        db.collection('users').doc(user.uid)
    })

    return (
        <div>
            <Header />
            <div>
                <h1 className="dash-title">Dashboard</h1>
            </div>
            <div>
                <RadarChart outerRadius={90} width={730} height={250} data={props.data}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="subject" />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} />
                    <Radar name="Distribution" dataKey="score" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                    <Legend />
                </RadarChart>
            </div>
        </div>
    );
}

export default Dashboard;