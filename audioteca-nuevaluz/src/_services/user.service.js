import config from 'react-global-configuration';
// import { stringify } from 'querystring';
import { audiotecaConstants } from '../_constants/audioteca.constants';

export const userService = {
    login,
    updatePassword
};

function login(username, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user: username, password: password })
    };

    return fetch(`${config.get('api_url')}login`, requestOptions)
        .then(handleResponse)
        .then(response => {
            // login successful if success flag is true
            if (response.success) {
                // store session token in local storage to keep user logged in between page refreshes
                localStorage.setItem(audiotecaConstants.sessionKey, response.session);
            }

            return response;
        })
        .catch(error => {
            return {
                success: false,
                message: 'Error accediendo al servicio de la audioteca'
            }
        });
}

function updatePassword(password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ session: localStorage.getItem(audiotecaConstants.sessionKey), newPassword: password })
    };

    return fetch(`${config.get('api_url')}change-password`, requestOptions)
        .then(handleResponse)
        .then(response => {
            // login successful if success flag is true
            return {
                success: true                
            }
        })
        .catch(error => {
            return {
                success: false,
                message: 'Error accediendo al servicio de la audioteca'
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