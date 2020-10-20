import React, { useState, useContext } from 'react';
import '../styles/Login.css';
import { signInWithGoogle, db } from '../firebase';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../Providers/UserProvider';
import { Link } from 'react-router-dom';
import { auth } from '../firebase';

function Login(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    let history = useHistory();
    let user = useContext(UserContext);

    const handleUserInit = () => {
        let docRef = db.collection("Users").doc(user.uid);
        console.log(docRef)
    }
    
    const handleLogin = () => {
        signInWithGoogle();

        let path = `/Dashboard`;
        if(user !== null){
            handleUserInit();            
            history.push(path);
        }
    }

    const signInWithEmailAndPasswordHandler = (event) => {
        event.preventDefault();
        auth.signInWithEmailAndPassword(email, password).catch(error => {
            console.error("Error signing in with password and email", error);
        });
    };

    return (
        <div className="login-wrapper">
            <div className="login-window">
                <h1 className="login-header">GradeTracker</h1>
                <div className="login-label">Email</div>
                <input className="login-detail" placeholder="Your email" onChange={e => setEmail(e.target.value)}/>
                <div className="login-label">Password</div>
                <input type="password" className="login-detail" placeholder="Your password" setPassword={e => setPassword(e.target.value)}/>
                <div style={{margin: "5% 0 0.5% 0"}}>
                    <button className="login-submit" onClick={signInWithEmailAndPasswordHandler}>Login</button>
                </div>
                <div style={{margin: "5% 0 0.5% 0"}}>
                    <button className="google-login-button" onClick={handleLogin}>Sign in with Google</button>
                </div>

                <div className="login-redirect-container">
                    <Link className="login-redirect" to="Signup">First time? <strong>Sign Up!</strong></Link>
                </div>

            </div>
        </div>
    );
}

export default Login;