import config from 'react-global-configuration'
import { audiotecaConstants } from '../_constants/audioteca.constants'

export const audiotecaService = {
    getTitles,
    getTitlesByAuthor,
    getAuthors,
    getBookDetails,
    searchByTitle,
    searchByAuthor,
    getLink,
};

function getTitles(index, count) {

    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    };

    return fetch(`${config.get('api_url')}/gettitles?index=${index}&count=${count}&session=${localStorage.getItem(audiotecaConstants.sessionKey)}`, requestOptions)
        .then(handleResponse)
        .then(response => {
            return response;
        })
        .catch(error => {
            redirectToLogin();
        });
}

function getAuthors(index, count) {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    };

    return fetch(`${config.get('api_url')}/getauthors?index=${index}&count=${count}&session=${localStorage.getItem(audiotecaConstants.sessionKey)}`, requestOptions)
        .then(handleResponse)
        .then(response => {
            return response;
        })
        .catch(error => {
            redirectToLogin();
        });
}

function getBookDetails(id) {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    };

    return fetch(`${config.get('api_url')}/getaudiobookdetail?id=${id}&session=${localStorage.getItem(audiotecaConstants.sessionKey)}`, requestOptions)
        .then(handleResponse)
        .then(response => {
            return response;
        })
        .catch(error => {
            redirectToLogin();
        });
}

function searchByTitle(text, index, count) {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    };

    return fetch(`${config.get('api_url')}/searchtitles?text=${text}&index=${index}&count=${count}&session=${localStorage.getItem(audiotecaConstants.sessionKey)}`, requestOptions)
        .then(handleResponse)
        .then(response => {
            return response;
        })
        .catch(error => {
            redirectToLogin();
        });
}

function searchByAuthor(text, index, count) {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    };

    return fetch(`${config.get('api_url')}/searchauthors?text=${text}&index=${index}&count=${count}&session=${localStorage.getItem(audiotecaConstants.sessionKey)}`, requestOptions)
        .then(handleResponse)
        .then(response => {
            return response;
        })
        .catch(error => {
            redirectToLogin();
        });
}

function getLink(id) {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    };

    return fetch(`${config.get('api_url')}/getaudiobooklink?id=${id}&session=${localStorage.getItem(audiotecaConstants.sessionKey)}`, requestOptions)
        .then(handleResponse)
        .then(response => {
            return response;
        })
        .catch(error => {
            redirectToLogin();
        });
}

function getTitlesByAuthor(id, index, count) {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    };

    return fetch(`${config.get('api_url')}/gettitlesbyauthor?id=${id}&index=${index}&count=${count}&session=${localStorage.getItem(audiotecaConstants.sessionKey)}`, requestOptions)
        .then(handleResponse)
        .then(response => {
            return response;
        })
        .catch(error => {
            redirectToLogin();
        });
}

function redirectToLogin() {
    localStorage.removeItem(audiotecaConstants.sessionKey);
    window.location.href = '/';
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