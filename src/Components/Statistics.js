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
    const [selectedAssignment, setSelectedAssignment] = useState({name: '', score: 0, grade: ''});
    const [assignmentActivated, setAssignmentActivated] = useState(false)

    const assignmentSelectionHandler = (data, index) => {
        setSelectedAssignment(data);
        setAssignmentActivated(true);
    }
    
    useEffect(() => {
        let temp = []

        setData([])
        setAveragePercentage(null)

        const processData = async () => {
            await db.collection('users').doc(props.user.uid).collection(props.subjectName).get()
                .then(querySnapshot => {
                    querySnapshot.forEach(doc => {
                        if(doc.id !== 'information'){
                            let data = doc.data();
                            temp.push({name : doc.id, score: parseInt(data.percentage), grade: data.grade})
                        } else {
                            let data = doc.data();
                            setAveragePercentage(data.average);
                        }
                    })
                })

            setData(temp);
        }

        processData();

    }, [props.user, props.subjectName])

    useEffect(() => {
        setAssignmentActivated(false)
    }, [props.subjectName])

    const assignmentInformation = (
        <div className={styles.assignmentWrapper}>
            <h1 className={styles.assignmentTitle}>{selectedAssignment.name}</h1>
            <div className={styles.underline}></div>
            <div className={styles.scoreContainer}>
                <span className={styles.score}>
                    <span className={styles.scorePreface}>Score:</span>
                    <span className={styles.scoreValue}>{selectedAssignment.score}%</span>
                </span>
                <span className={styles.score}>
                    <span className={styles.scorePreface}>Grade:</span>
                    <span className={styles.scoreValue}>{selectedAssignment.grade}</span>
                </span>
            </div>
        </div>
    );

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
                    <Bar dataKey="score" fill="#2F2D67" unit="%" onClick={assignmentSelectionHandler}/>
                    <ReferenceLine y={averagePercentage} stroke="red"/>
                </BarChart>
            </div>
            <div>
                {(assignmentActivated)? assignmentInformation : <></>}
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
        const processData = async () => {
            db.collection('users').doc(user.uid).get().then(async doc => {
                let temp = [];
                let data = doc.data();
                let subjectNames = data.subjectNames;

                for(const subjectName of subjectNames){
                    await db.collection('users').doc(user.uid).collection(subjectName).doc('information').get().then(info => {
                        temp.push({title: subjectName, hl: true, score: parseInt(info.data().average)});
                    })
                }

                setSubjectList(temp);
            })
        }

        if(user){
            processData();
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