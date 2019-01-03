import config from 'react-global-configuration';
import { stringify } from 'querystring';
import { audiotecaConstants } from '../_constants/audioteca.constants';

export const userService = {
    login
};

function login(username, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user: username, password: password })
    };

    return fetch(`${config.get('api_url')}/login`, requestOptions)
        .then(handleResponse)
        .then(response => {
            // login successful if success flag is true
            if (response.Success) {
                // store session token in local storage to keep user logged in between page refreshes
                localStorage.setItem(audiotecaConstants.sessionKey, response.Session);
            }

            return response;
        })
        .catch(error => {
            return {
                Success: false,
                Message: 'Error accediendo al servicio de la audioteca'
            }
        });
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}