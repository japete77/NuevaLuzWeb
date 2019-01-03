import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { audiotecaConstants } from '../_constants/audioteca.constants';

export const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        localStorage.getItem(audiotecaConstants.sessionKey)
            ? <Component {...props} />
            : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
    )} />
)