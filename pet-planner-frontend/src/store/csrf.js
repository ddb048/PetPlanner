import Cookies from 'js-cookie';

export async function csrfFetch(endpoint, options = {}) {
    const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:8080';
    // Set options.method to 'GET' if there is no method
    options.method = options.method || 'GET';
    // Set options.headers to an empty object if there are no headers
    options.headers = options.headers || {};

    // If the options.method is not 'GET', set the "Content-Type" header to "application/json"
    if (options.method.toUpperCase() !== 'GET') {
        options.headers['Content-Type'] = options.headers['Content-Type'] || 'application/json';
    }

    // Set the "XSRF-TOKEN" header from the cookie
    options.headers['XSRF-Token'] = Cookies.get('XSRF-TOKEN');

    // Include JWT in headers for authenticated requests, but not when authenticating
    if (endpoint !== '/authenticate') {
        const jwt = localStorage.getItem('userToken');
        if (jwt) {
            options.headers['Authorization'] = `Bearer ${jwt}`;
        }
    }

    // Call the default window's fetch with the url and the options passed in
    const res = await window.fetch(`${BASE_URL}${endpoint}`, options);

    console.log('res', res);

    // Throw an error if the response status is 400 or higher
    if (res.status >= 400) {
        const error = new Error('An error occurred while fetching data');
        error.info = await res.json(); // Attach additional info from the response
        error.status = res.status;
        throw error;
    }

    return res;
}

// Call this to get the "XSRF-TOKEN" cookie, should only be used in development
export function restoreCSRF() {
    return csrfFetch('/api/csrf/restore');
}
