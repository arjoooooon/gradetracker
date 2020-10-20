import React, { useState } from 'react';
import styles from '../../styles/EditSubjects.module.css';

const AddSubjectComponent = props => {
    const [subjectName, setSubjectName] = useState('None')
    const [boundaries, setBoundaries] = useState({
        one: null,
        two: null,
        three: null,
        four: null,
        five: null,
        six: null,
        seven: null,
    })

    const changeBoundaries = (event, index) => {
        boundaries[index] = event.target.value;
        setBoundaries(boundaries);
    }
    
    const submitHandler = event => {
        event.preventDefault();
        props.handleSubmit(subjectName, boundaries);
    }

    return (
        <label className={styles.subjectForm}>
            <span className={styles.formHeader}>Subject Name</span>
            <input className={styles.formInput} placeholder="eg. HL English Literature" onChange = {e => setSubjectName(e.target.value)} />
            <span>Grade Boundaries</span>
            <span className={styles.boundaryInputContainer}><input className={styles.percentageInput} onChange = {e => changeBoundaries(e, 'seven')} /><span style={{marginLeft: 10}}>7</span></span>
            <span className={styles.boundaryInputContainer}><input className={styles.percentageInput} onChange = {e => changeBoundaries(e, 'six')} /><span style={{marginLeft: 10}}>6</span></span>
            <span className={styles.boundaryInputContainer}><input className={styles.percentageInput} onChange = {e => changeBoundaries(e, 'five')} /><span style={{marginLeft: 10}}>5</span></span>
            <span className={styles.boundaryInputContainer}><input className={styles.percentageInput} onChange = {e => changeBoundaries(e, 'four')} /><span style={{marginLeft: 10}}>4</span></span>
            <span className={styles.boundaryInputContainer}><input className={styles.percentageInput} onChange = {e => changeBoundaries(e, 'three')} /><span style={{marginLeft: 10}}>3</span></span>
            <span className={styles.boundaryInputContainer}><input className={styles.percentageInput} onChange = {e => changeBoundaries(e, 'two')} /><span style={{marginLeft: 10}}>2</span></span>
            <span className={styles.boundaryInputContainer}><input className={styles.percentageInput} onChange = {e => changeBoundaries(e, 'one')} /><span style={{marginLeft: 10}}>1</span></span>
            <button className={styles.submitButton} onClick={submitHandler}>Submit</button>
        </label>
    );
}

export default AddSubjectComponent;