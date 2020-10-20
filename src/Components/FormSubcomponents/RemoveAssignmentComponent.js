import React, { useState } from 'react';
import styles from '../../styles/EditSubjects.module.css';

const RemoveAssignmentComponent = props => {
    const [assignmentName, setAssignmentName] = useState('None');
    const filter = ['Add Assignment', 'Remove Assignment'];

    const changeAssignmentHandler = event => {
        setAssignmentName(event.target.value);
        event.preventDefault();
    }

    const submitHandler = event => {
        event.preventDefault();
        if(assignmentName !== 'None'){
            props.handleSubmit(assignmentName);
        }
    }
    
    return (
        <label className={styles.subjectForm}>
            <span className={styles.formHeader}>Assignment Name</span>
            <select className={styles.subjectSelector} value={assignmentName} onChange={changeAssignmentHandler}>
                {props.assignments.filter(value => !filter.includes(value)).map(assignment => 
                    <option key={assignment} value={assignment}>{assignment}</option>
                )}
            </select>
            <button className={styles.submitButton} onClick={submitHandler}>Submit</button>
        </label>
    );
}

export default RemoveAssignmentComponent;