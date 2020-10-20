import React, { useState } from 'react';
import styles from '../../styles/EditSubjects.module.css';

const RemoveSubjectComponent = props => {
    const [subjectName, setSubjectName] = useState('None');
    const filter = ['Add New Subject', 'Remove Subject'];

    const changeSubjectHandler = event => {
        setSubjectName(event.target.value);
        event.preventDefault();
    }

    const submitHandler = event => {
        event.preventDefault();
        if(subjectName !== null) {
            props.handleSubmit(subjectName);
        } else {
            console.log('Subject not selected')
        }
    }

    return (
        <label className={styles.subjectForm}>
            <span className={styles.formHeader}>Subject Name</span>
            <select className={styles.subjectSelector} value={subjectName} onChange={changeSubjectHandler}>
                {props.subjects.filter(value => !filter.includes(value)).map(subject => 
                    <option key={subject} value={subject}>{subject}</option>
                )}
            </select>
            <button className={styles.submitButton} onClick={submitHandler}>Submit</button>

        </label>
    );
}

export default RemoveSubjectComponent;