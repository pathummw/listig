import React, { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { AuthContext } from "./Auth";


export default function PrivateRoute({ component: Component, ...rest }) {

    const { currentUser } = useContext(AuthContext);

    return (
        <Route {...rest}
            render={props => {
                return currentUser ? <Component {...props} /> : <Redirect to="/signin" />
            }}
        >
        </Route>
    )
}
