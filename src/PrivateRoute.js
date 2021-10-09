import React, { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { AuthUserContext } from './App';


export default function PrivateRoute({ component: Component, ...rest }) {

    const uid = useContext(AuthUserContext);

    return (
        <Route {...rest}
            render={props => {
                return uid ? <Component {...props} /> : <Redirect to="/signin" />
            }}
        >
        </Route>
    )
}
