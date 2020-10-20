import React, { useState } from 'react';
import '../styles/Login.css';
import { auth, generateUserDocument } from '../firebase';
import { useHistory } from 'react-router-dom';

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const createUserWithEmailAndPasswordHandler = async (event) => {
        event.preventDefault();
        try{
            const {user} = await auth.createUserWithEmailAndPassword(email, password);
            generateUserDocument(user);
        }
        catch(error){
            console.log(error);
        }
    };

    return (
        <div className="login-wrapper">
            <div className="login-window">
                <h1 className="login-header">GradeTracker</h1>
                <div className="login-label">Email</div>
                <input className="login-detail" placeholder="Your email" onChange={e => setEmail(e.target.value)}/>
                <div className="login-label">Password</div>
                <input type="password" className="login-detail" placeholder="Your password" onChange={e => setPassword(e.target.value)}/>
                <div style={{margin: "5% 0 0.5% 0"}}>
                    <button className="login-submit" onClick={createUserWithEmailAndPasswordHandler}>Sign Up</button>
                </div>
            </div>
        </div>
    );
}

export default SignUp;