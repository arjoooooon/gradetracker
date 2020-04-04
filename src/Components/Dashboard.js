import React, { useContext } from 'react';
import { RadarChart, PolarAngleAxis, PolarRadiusAxis, PolarGrid, Legend, Tooltip, Radar, Customized } from 'recharts';
import '../styles/Dashboard.css';
import { UserContext } from '../Providers/UserProvider';

function Dashboard(props){

    const user = useContext(UserContext);

    return (
        <div>
            <div>
                <h1 className="dash-title">Dashboard</h1>
            </div>
            <div>
                <RadarChart outerRadius={90} width={730} height={250} data={props.data}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="subject" />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} />
                    <Radar name="Mike" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                    <Legend />
                </RadarChart>
            </div>
        </div>
    );
}

export default Dashboard;