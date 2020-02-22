import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../context/auth-context';

// props = { children, exact, path }  others = { exact, path }
export function PrivateRoute({ children, allowedRoles, ...others }) {
    const { rol } = useAuth();

    return (
        <React.Fragment>
            {allowedRoles.includes(rol) ? (
                <Route {...others}>{children}</Route>
            ) : (
                    <Redirect to="/login" />
                )}
        </React.Fragment>
    );
}