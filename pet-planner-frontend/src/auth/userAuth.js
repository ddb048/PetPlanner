import { createContext, useContext, useState } from 'react';
import * as auth from './index';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(auth.isLoggedIn());

    const handleLogout = () => {
        auth.logout();
        setIsAuthenticated(false);
    };

    const value = {
        isAuthenticated,
        handleLogout
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    return useContext(AuthContext);
}
