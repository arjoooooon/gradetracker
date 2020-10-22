import React, { useState } from 'react';
import styles from '../../styles/EditSubjects.module.css';

const AddAssignmentComponent = props => {
    const [assignmentName, setAssignmentName] = useState('')
    const [percentage, setPercentage] = useState(null);
    const [grade, setGrade] = useState('None');
    
    const submitHandler = event => {
        event.preventDefault();
        if(assignmentName === '') return;
        if(percentage === null && grade === 'None') return;
        
        props.handleSubmit(assignmentName, percentage, grade);
    }

    const changePercentage = event => {
        setPercentage(event.target.value);
        event.preventDefault();
    }

    const changeGrade = event => {
        setGrade(event.target.value);
        event.preventDefault();
    }

    const percentageInputValidation = event => {
        const input = event.target.value;
        console.log(percentage);
    }

    const gradeList = ['None', '1', '1+', '2-', '2', '2+', '3-', '3', '3+', '4-', '4', '4+', '5-', '5', '5+', '6-', '6', '6+', '7-', '7', '7+'];

    return (
        <label className={styles.subjectForm}>
            <span className={styles.formHeader}>Assignment Name</span>
            <input className={styles.formInput} placeholder="eg. Internal Assessment" onChange = {e => setAssignmentName(e.target.value)} />
            
            <div style={{display: 'flex', flexDirection: 'column'}}>
                <span style={{marginBottom: 5}}>Percentage</span>
                <span>
                    <input className={styles.percentageInput} placeholder="78" onChange={changePercentage} onKeyPress={percentageInputValidation}/>
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

export default AddAssignmentComponent;