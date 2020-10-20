import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../Providers/UserProvider';
import styles from '../styles/statistics.module.css'
import Cards from './Cards';
import Header from './Header';
import { db } from '../firebase';

import { BarChart, ComposedChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar, Line, ReferenceLine } from 'recharts';

const Visualize = props => {
    const [data, setData] = useState([])
    const [averagePercentage, setAveragePercentage] = useState(null)
    
    useEffect(() => {
        let temp = []
        let documentCounter = 0;
        let percentageAccumulator = 0;

        setData([])
        setAveragePercentage(null)

        const processData = async () => {
            await db.collection('users').doc(props.user.uid).collection(props.subjectName).get()
                .then(querySnapshot => {
                    querySnapshot.forEach(doc => {
                        if(doc.id !== 'information'){
                            let data = doc.data();
                            temp.push({name : doc.id, percentage: parseInt(data.percentage), grade: doc.grade})
                            documentCounter++;
                            percentageAccumulator += parseInt(data.percentage);
                        }
                    })
                })

            setData(temp);
            setAveragePercentage((percentageAccumulator/documentCounter).toFixed(1));
        }

        processData();

    }, [props.user, props.subjectName])

    return (
        <div className={styles.visualWrapper}>
            <div className={styles.visualInfo}>
                <h1 className={styles.visualTitle}>Subject: {props.subjectName}</h1> 
                <h4 className={styles.visualSubtitle}>Average percentage: {averagePercentage}%</h4>
                <BarChart width={700} height={500} data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="percentage" fill="#2F2D67" />
                    <ReferenceLine y={averagePercentage} stroke="red"/>
                </BarChart>
            </div>
        </div>
    );
}

const Statistics = () => {
    const user = useContext(UserContext);
    const [subjectList, setSubjectList] = useState([]);
    const [selectedSubject, setSelectedSubject] = useState('None')
    
    const handleSelect = (subjectName) => {
        setSelectedSubject(subjectName)
    }

    useEffect(() => {
        if(user) {
            db.collection('users').doc(user.uid).get()
                .then(doc => {
                    let data = doc.data()
                    let temp = []
                    data.subjectNames.forEach(subjectName => {
                        temp = [...temp, {title: subjectName, hl: true}];
                    })
                    setSubjectList(temp);
                })
        }
    }, [user])

    return (
        <div>
            <Header />
            {(subjectList)? <Cards renderList={subjectList} handleSelect={handleSelect} /> : <></>} 
            {(selectedSubject === 'None')? <></> : <Visualize user={user} subjectName={selectedSubject} />}
        </div>
    );
}

export default Statistics;