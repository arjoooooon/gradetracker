import React, { useContext } from 'react';
import Header from './Header';
import Dashboard from './Dashboard';
import { Redirect } from 'react-router-dom';
import { UserContext } from '../Providers/UserProvider';


const data = [{
        "subject": "Math",
        "A": 70,
        "fullMark": 100
    },
    {
        "subject": "Chinese",
        "A": 98,
        "fullMark": 100
    },
    {
        "subject": "English",
        "A": 86,
        "fullMark": 100
    },
    {
        "subject": "Geography",
        "A": 99,
        "fullMark": 100
    },
    {
        "subject": "Physics",
        "A": 85,
        "fullMark": 100
    },
    {
        "subject": "History",
        "A": 65,
        "fullMark": 100
    }
]

function Home(){
    const user = useContext(UserContext);
    return (
        <div>
            <div>
                <Header />
            </div>
            <div>
                <Dashboard data={data}/>
            </div>
        </div>   
    );
}

export default Home;