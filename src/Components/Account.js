import React, { useContext } from 'react';
import { UserContext } from '../Providers/UserProvider';
import { Redirect } from 'react-router-dom'
import { signOutWithGoogle } from '../firebase';


function Account(){
    const user = useContext(UserContext);

    const handleSignOut = () => {
        signOutWithGoogle();
    }

    const noAccountComponent = (
        <div>
            <span>You are not signed in.</span>
        </div>
    );
    
    const signOutComponent = (
        <div className="sign-out-wrapper">
            <button className="sign-out-button" onClick={handleSignOut}>Sign Out</button>
        </div>
    );
    
    return (

        <div>
            {(user === null)? noAccountComponent : signOutComponent}
        </div>

    );
}

export default Account;