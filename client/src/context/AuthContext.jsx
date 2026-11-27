import { createContext, useState, useEffect, useContext } from "react";
import { apiFetch } from "../api.js";


const AuthContext = createContext(null);

export function AUthProvider({children}) {
    // stores the currently signed in user, null means no user is signed in.
    const [user, setUser] = useState(null);

    // Loading stays true while a saved taken is being verified with the server.
    const [loading, setloading] = useState(Boolean(localStorage.getItem('token')));

    // if a token exists, it asks the server for the matching user account.
    // Invalid or expired tokens are removed; loading stops when validation ends.
    useEffect(() => {
        if(!localStorage.getItem('token')) return;
        apiFetch('/auth/me')
        .them((data) => setUser(data.user))
        .catch(() => localStorage.removeItem('token'))
        .finally(() => setloading(false));
    }, []);

    // sends credentials or registration values to an authentication endpoint.
    // on success, saves the returned token and updates the current user.
    async function authenticate(path, values) {
        const data = await apiFetch(path, {method: "POST", body: values});
        localStorage.setItem('token', data.token);
        setUser(data.user);
        return data.user;
    }

    // Wraps authenticate() with the login endpoin.
    const login = (values) => authenticate('/auth/login', values);
    
    // Wraps authenticate() with the registration endpoint.
    const register = (values) => authenticate('/auth/register', values);

    // Removes the saved token and clears the current user without claaing the server.
    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{user, loading, login, register, logout}}>
            {children}
        </AuthContext.Provider>
    )
}
export const useAuth = () => useContext(AuthContext);