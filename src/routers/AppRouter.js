import { login } from '../actions/auth';
import { AuthRouter } from './AuthRouter';
import { useDispatch } from 'react-redux';
import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';
import React, { useEffect, useState } from 'react'
import { startLoadingNotes } from '../actions/notes';
import { firebase } from "../firebase/firebase-config";
import { JournalScreen } from '../components/journal/JournalScreen';
import { BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';

export const AppRouter = () => {

    const dispatch = useDispatch();
    const [checking, setChecking] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // Cuando la autenticación cambia, se ejecuta esta función.
        firebase.auth().onAuthStateChanged(async (user) => {
            if ( user?.uid ) {
                dispatch( login(user.uid, user.displayName) );
                setIsLoggedIn(true);
                dispatch( startLoadingNotes(user.uid) );
            } else {
                setIsLoggedIn(false);
            }
            setChecking(false);
        });
    }, [ dispatch, setChecking, setIsLoggedIn ]);
    // Sin ninguna dependencia, el efecto solo se aplica una vez
    // el dispatch nunca va a cambiar pero como se esta usando dentro del effect, es un warning

    if (checking) {
        return (
            <h1>Wait...</h1>
        )
    } else {
        return (
            <Router>
                <div>
                    <Switch>
                        <PublicRoute
                            path="/auth"
                            component={ AuthRouter }
                            isAuthenticated={ isLoggedIn }
                        />
                        <PrivateRoute 
                            exact
                            path="/"
                            isAuthenticated={ isLoggedIn }
                            component={ JournalScreen }
                        />
                        <Redirect to="/auth/login" />
                    </Switch>
                </div>
            </Router>
        )
    }

}
