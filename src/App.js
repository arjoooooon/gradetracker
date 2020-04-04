import React from 'react';
import Home from './Components/Home';
import Login from './Components/Login';
import Account from './Components/Account'
import UserProvider, { UserContext } from './Providers/UserProvider';

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
                </Switch>
            </Router>
        </div>
        </UserProvider>
    );
}

export default App;