import React from 'react';
import Home from './Components/Home';
import Login from './Components/Login';
import Account from './Components/Account'
import Subjects from './Components/EditSubjects';
import Statistics from './Components/Statistics';
import UserProvider, { UserContext } from './Providers/UserProvider';
import SignUp from './Components/SignUp';

import {
    BrowserRouter as Router,
    Switch,
    Link,
    Route,
} from 'react-router-dom';

function App(){
    return(
        <UserProvider>
        <div>
            <link href="https://fonts.googleapis.com/css2?family=Chilanka&display=swap" rel="stylesheet" />
            <Router>
                <Switch>
                    <Route exact path="/">
                        <Login />
                    </Route>

                    <Route exact path="/dashboard">
                        <Home />
                    </Route>

                    <Route exact path="/account">
                        <Account />
                    </Route>

                    <Route exact path="/subjects">
                        <Subjects />
                    </Route>

                    <Route exact path="/signup">
                        <SignUp />
                    </Route>
                    
                    <Route exact path="/statistics">
                        <Statistics />
                    </Route>

                </Switch>
            </Router>
        </div>
        </UserProvider>
    );
}

export default App;