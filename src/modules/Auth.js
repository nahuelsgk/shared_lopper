class Auth
{
    static authenticateUser(token)
    {
        localStorage.setItem('token', token)
    }

    static isAuthenticatedUser()
    {
        return localStorage.getItem('token') !== null
    }

    static deauthenticateUser()
    {
        localStorage.removeItem('token')
    }

    static getToken()
    {
        return localStorage.getItem('token')
    }
}

export default Auth