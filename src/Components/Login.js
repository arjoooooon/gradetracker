import React, { useContext } from 'react';
import '../styles/Login.css';
import { signInWithGoogle, db } from '../firebase';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../Providers/UserProvider';

function Login(){

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
    return (
        <div className="login-wrapper">
            <div className="login-window">
                <div className="login-label">Email</div>
                <input className="login-detail" placeholder="Your email"/>
                <div className="login-label">Password</div>
                <input type="password" className="login-detail" placeholder="Your password"/>
                <div style={{margin: "5% 0 0.5% 0"}}>
                    <button className="login-submit" onClick={handleLogin}>Login</button>
                </div>
                <div style={{margin: "5% 0 0.5% 0"}}>
                    <button className="google-login-button" onClick={handleLogin}>Sign in with Google</button>
                </div>

            </div>
        </div>
    );
}

export default Login;