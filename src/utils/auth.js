export const login = (username, password) => {
    // Simple hardcoded check
    if (username === 'zelio' && password === '2026') {
        localStorage.setItem('isAuthenticated', 'true');
        return true;
    }
    return false;
};

export const logout = () => {
    localStorage.removeItem('isAuthenticated');
};

export const isAuthenticated = () => {
    return localStorage.getItem('isAuthenticated') === 'true';
};
