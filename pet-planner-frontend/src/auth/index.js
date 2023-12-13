// Function to check if the user is logged in
export function isLoggedIn() {
    const token = localStorage.getItem('userToken');
    return !!token; // Convert token to boolean
}

// Function to handle logout
export function logout() {
    localStorage.removeItem('userToken');
    // Redirect to home or login page
    window.location.href = '/login';
}

// Function to save the token after successful login
export function saveToken(token) {
    localStorage.setItem('userToken', token);
}

export async function authenticate(username, password) {
    try {
        const response = await fetch('http://localhost:8080/authenticate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        const data = await response.json();
        if (response.ok) {
            saveToken(data.jwt);
            return { success: true };
        } else {
            return { success: false, message: data.message || 'Authentication failed' };
        }
    } catch (error) {
        return { success: false, message: error.message || 'Failed to authenticate' };
    }
}

export async function signup(username, password, email, profilePic) {
    try {
        const formData = new FormData();
        formData.append('username', username);
        formData.append('password', password);
        formData.append('email', email);
        formData.append('profilePic', profilePic);

        const response = await fetch('http://localhost:8080/api/users', {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            return { success: true };
        } else {
            const data = await response.json();
            return { success: false, message: data.message || 'Signup failed' };
        }
    } catch (error) {
        return { success: false, message: error.message || 'Failed to signup' };
    }
}
