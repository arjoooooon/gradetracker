import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../Providers/UserProvider';
import { db, FIRESTORE_REFERENCE } from '../firebase';
import Header from './Header.js';
import styles from '../styles/EditSubjects.module.css';

import AddAssignmentComponent from './FormSubcomponents/AddAssignmentComponent';
import AddSubjectComponent from './FormSubcomponents/AddSubjectComponent';
import RemoveSubjectComponent from './FormSubcomponents/RemoveSubjectComponent';
import RemoveAssignmentComponent from './FormSubcomponents/RemoveAssignmentComponent';

const EditAssignmentComponent = props => {
    const [previousAssignmentName, setPreviousAssignmentName] = useState(props.assignmentName);
    const [previousPercentage, setPreviousPercentage] = useState(null);
    const [previousGrade, setPreviousGrade] = useState('None');
    
    const [assignmentName, setAssignmentName] = useState(props.assignmentName);
    const [percentage, setPercentage] = useState(null);
    const [grade, setGrade] = useState('None');

    const gradeList = ['None', '1', '1+', '2-', '2', '2+', '3-', '3', '3+', '4-', '4', '4+', '5-', '5', '5+', '6-', '6', '6+', '7-', '7', '7+'];
    
    useEffect(() => {
        db.collection('users').doc(props.user.uid).collection(props.subjectName).doc(props.assignmentName).get()
            .then(doc => {
                var data = doc.data();
                setPercentage(parseInt(data.percentage))
                var grade_t = (data.grade)? data.grade : 'None'
                setGrade(grade_t)
            })
    }, [props.user])

    const changeAssignmentName = event => {
        setAssignmentName(event.target.value);
        event.preventDefault();
    }

    const changePercentage = event => {
        setPercentage(event.target.value);
        event.preventDefault();
    }

    const changeGrade = event => {
        setGrade(event.target.value);
        event.preventDefault();
    }

    const submitHandler = event => {
        event.preventDefault();
        if(grade !== 'None' || percentage !== null){
            props.handleSubmit(assignmentName, percentage, grade, previousAssignmentName, previousPercentage, previousGrade);
        }
    }

    return (
        <label className={styles.subjectForm}>
            <span className={styles.formHeader}>Assignment Name</span>
            <input className={styles.formInput} value={assignmentName} onChange = {changeAssignmentName} />
            
            <div style={{display: 'flex', flexDirection: 'column'}}>
                <span style={{marginBottom: 5}}>Percentage</span>
                <span>
                    <input className={styles.percentageInput} value={percentage} onChange={changePercentage} />
                    <span>  %</span>
                </span>

                <span style={{color: 'gray', fontSize: '0.9em', marginBottom: 10}}>- or -</span>

                <span style={{marginBottom: 5}}>Grade</span>
                <select className={styles.subjectSelector} value={grade} onChange={changeGrade}>
                    {gradeList.map(grade => 
                        <option key={grade} value={grade}>{grade}</option>
                    )}
                </select>
            </div>

            <hr />
            
            <button className={styles.submitButton} onClick={submitHandler}>Submit</button>
        </label>
    );
}

const EditSubjectComponent = props => {

    const [assignmentList, setAssignmentList] = useState(['None', 'Add Assignment', 'Remove Assignment']);
    const [selectedAssignment, setSelectedAssignment] = useState('None');
    const [assignmentUpdateTriggered, setAssignmentUpdateTriggered] = useState(false)

    const addAssignmentHandler = async (assignmentName, percentage, grade) => {
        const map = [null, 'one', 'two', 'three', 'four', 'five', 'six', 'seven'];

        if(percentage === null){
             await db.collection('users').doc(props.user.uid).collection(props.subjectName).doc('information').get()
                .then(doc => {
                    var boundaries = doc.data().boundaries;
                    var intGrade = parseInt(grade[0])
                    var final = parseInt(boundaries[map[intGrade]])
                    
                    if(grade.length === 1) {
                        if(grade[0] === '7'){
                            final += (100 - parseInt(boundaries['seven']))/3
                        } else {
                            final += (parseInt(boundaries[map[intGrade+1]]) - parseInt(boundaries[map[intGrade]]))/3
                        }
                    } else if (grade[1] === '+') {
                        if(grade[0] === '7') {
                            final += 2*(100-parseInt(boundaries['seven']))/3;
                        } else {
                            final += 2*(parseInt(boundaries[map[intGrade+1]]) - parseInt(boundaries[map[intGrade]]))/3
                        }
                    }

                    percentage = final
                })
        }

        db.collection('users').doc(props.user.uid).collection(props.subjectName).doc(assignmentName).set({
            assignmentName: assignmentName,
            percentage: percentage,
            grade: grade,
        })

        const arrayUnion = FIRESTORE_REFERENCE.FieldValue.arrayUnion;
        db.collection('users').doc(props.user.uid).collection(props.subjectName).doc('information').update({
            assignmentList: arrayUnion(assignmentName)
        })

        setSelectedAssignment('None');
        setAssignmentUpdateTriggered(true);
    }

    const removeAssignmentHandler = async (assignmentName) => {
        const arrayRemove = FIRESTORE_REFERENCE.FieldValue.arrayRemove;

        db.collection('users').doc(props.user.uid).collection(props.subjectName).doc('information').update({
            assignmentList: arrayRemove(assignmentName)
        })

        db.collection('users').doc(props.user.uid).collection(props.subjectName).doc(assignmentName).delete()
            .then(() => console.log('Document Deleted'))
            .catch(err => console.log(err))

        setSelectedAssignment('None');
        setAssignmentUpdateTriggered(true);
    }

    const editAssignmentHandler = async (assignmentName, percentage, grade, previousAssignmentName, previousPercentage, previousGrade) => {
        const arrayRemove = FIRESTORE_REFERENCE.FieldValue.arrayRemove;
        const arrayUnion = FIRESTORE_REFERENCE.FieldValue.arrayUnion;
        
        db.collection('users').doc(props.user.uid).collection(props.subjectName).doc('information').update({
            assignmentList: arrayRemove(previousAssignmentName)
        });

        db.collection('users').doc(props.user.uid).collection(props.subjectName).doc(previousAssignmentName).delete();

        if(grade !== previousGrade && percentage === previousPercentage) {
            percentage = null;
        }

        const map = [null, 'one', 'two', 'three', 'four', 'five', 'six', 'seven'];

        if(percentage === null){
             await db.collection('users').doc(props.user.uid).collection(props.subjectName).doc('information').get()
                .then(doc => {
                    var boundaries = doc.data().boundaries;
                    var intGrade = parseInt(grade[0])
                    var final = parseInt(boundaries[map[intGrade]])
                    
                    if(grade.length === 1) {
                        if(grade[0] === '7'){
                            final += (100 - parseInt(boundaries['seven']))/3
                        } else {
                            final += (parseInt(boundaries[map[intGrade+1]]) - parseInt(boundaries[map[intGrade]]))/3
                        }
                    } else if (grade[1] === '+') {
                        if(grade[0] === '7') {
                            final += 2*(100-parseInt(boundaries['seven']))/3;
                        } else {
                            final += 2*(parseInt(boundaries[map[intGrade+1]]) - parseInt(boundaries[map[intGrade]]))/3
                        }
                    }

                    percentage = final
                })
        }

        db.collection('users').doc(props.user.uid).collection(props.subjectName).doc(assignmentName).set({
            assignmentName: assignmentName,
            percentage: percentage,
            grade: grade,
        })

        db.collection('users').doc(props.user.uid).collection(props.subjectName).doc('information').update({
            assignmentList: arrayUnion(assignmentName)
        })

        setSelectedAssignment('None');
        setAssignmentUpdateTriggered(true);
    }

    const changeAssignment = event => {
        setSelectedAssignment(event.target.value);
        event.preventDefault();
    }

    useEffect(() => {
        if(props.user) {
            db.collection('users').doc(props.user.uid).collection(props.subjectName).doc('information').get()
                .then(doc => {
                    if(doc.exists){
                        setAssignmentList(['None', ...doc.data().assignmentList, 'Add Assignment' ,'Remove Assignment'])
                    } else {
                        console.log('Document does not exist!');
                    }
                })
                setAssignmentUpdateTriggered(false)
        }
    }, [assignmentList, props.user]);

    return (
        <div style={{display: 'flex', flexDirection: 'row'}}>
            <label className={styles.subjectForm}>
                <span className={styles.formHeader}>Select assignment</span>
                <select className={styles.subjectSelector} value={selectedAssignment} onChange={changeAssignment}>
                    {assignmentList.map(assignment => 
                        <option key={assignment} value={assignment}>{assignment}</option>
                    )}
                </select>
            </label>
            {(selectedAssignment === 'Add Assignment')? <AddAssignmentComponent handleSubmit={addAssignmentHandler} /> : <></>}
            {(selectedAssignment === 'Remove Assignment')? <RemoveAssignmentComponent handleSubmit={removeAssignmentHandler} assignments={assignmentList} /> : <></>}
            {(['None', 'Add Assignment', 'Remove Assignment'].includes(selectedAssignment))? <></> : 
                <EditAssignmentComponent user={props.user} subjectName={props.subjectName} assignmentName={selectedAssignment} handleSubmit={editAssignmentHandler} />
            }
        </div>
    );
}

const EditSubjects = () => {
    const user = useContext(UserContext);

    const [subjects, setSubjects] = useState(['None', 'Add New Subject', 'Remove Subject']);
    const [selectedSubject, setSelectedSubject] = useState('None')
    const [subjectUpdateTriggered, setSubjectUpdateTriggered] = useState(true);

    useEffect(() => {
        
        if(user){
            db.collection('users').doc(user.uid).get()
                .then(doc => {
                    if (doc.exists) {
                        setSubjects(['None', ...doc.data().subjectNames, 'Add New Subject', 'Remove Subject'])
                    } else {
                        console.log("Document doesn't exist!")
                    }
                })

            setSubjectUpdateTriggered(false);
        }
        else {
            
        }


    }, [subjectUpdateTriggered, user])

    const changeSubject = event => {
        setSelectedSubject(event.target.value);
        event.preventDefault();
    }

    const addSubjectHandler = (subjectName, boundaryMap) => {
        const docRef = db.collection('users').doc(user.uid)
        
        docRef.collection(subjectName).doc('information').set({
            assignmentList: [],
            boundaries: boundaryMap,
        });

        const arrayUnion = FIRESTORE_REFERENCE.FieldValue.arrayUnion;
        docRef.update({
            subjectNames: arrayUnion(subjectName)
        })

        setSubjectUpdateTriggered(true);
        setSelectedSubject('None')
    }

    const removeSubjectHandler = async (subjectName) =>  {
        const deleteQueryBatch = async (ref) => {
            const snapshot = await ref.get();
        
            const batchSize = snapshot.size;
            if (batchSize === 0) {
            // If there are no documents left, we are done
                return;
            }
        
            // Delete documents in a batch
            const batch = db.batch();
            snapshot.docs.forEach((doc) => {
                batch.delete(doc.ref);
            });
            await batch.commit();
        }

        const docRef = db.collection('users').doc(user.uid);
        const collectionRef =  docRef.collection(subjectName);
        await deleteQueryBatch(collectionRef);

        const arrayRemove = FIRESTORE_REFERENCE.FieldValue.arrayRemove;
        docRef.update({
            subjectNames: arrayRemove(subjectName)
        }) 

        setSubjectUpdateTriggered(true);
        setSelectedSubject('None');
    }

    return (
        <div>
            <Header />
            <form className={styles.formWrapper}>
                <label className={styles.subjectForm}>
                    <span className={styles.formHeader}>Select subject option</span>
                    <select className={styles.subjectSelector} value={selectedSubject} onChange={changeSubject}>
                        {subjects.map(subject => 
                            <option key={subject} value={subject}>{subject}</option>
                        )}
                    </select>
                </label>

                {(selectedSubject === 'Add New Subject')? <AddSubjectComponent handleSubmit={addSubjectHandler} /> : <></>}
                {(selectedSubject === 'Remove Subject')? <RemoveSubjectComponent handleSubmit={removeSubjectHandler} subjects={subjects} /> : <></>}
                {(selectedSubject !== 'None' && selectedSubject !== 'Add New Subject' && selectedSubject !== 'Remove Subject')? 
                    <EditSubjectComponent user={user} subjectName={selectedSubject} /> : <></>
                }
            
            </form>
        </div>
    );  
}

export default EditSubjects;