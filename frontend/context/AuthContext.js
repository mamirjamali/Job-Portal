import { useState, useEffect, createContext } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'

const AuthContext = createContext();

export const AuthProvider = ( { children }) => {

    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState(null)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [error, setError] = useState(null)
    
    const router = useRouter()

    useEffect(() => {
        if(!user) {
            loadUser()
        }
    }, [user])

    //Login User
    const login = async ({ username, password }) => {
        try {
            setLoading(true)
            setError(null)

            const res = await axios.post('/api/auth/login', {
                username,
                password
            })

            if (res.data.success) {
                loadUser()
            }
        }
        catch (error) {
            setLoading(false)
            setError(error.response && error.response.data.error)
        }
    }

    
    //Register User
    const register = async ({ first_name, last_name, email, password,  }) => {
        try {
            setLoading(true)
            setError(null)

            const res = await axios.post(`${process.env.API_URL}/api/register/`, {
                first_name,
                last_name,
                email,
                password, 
            })
            if (res.data.message) {
                setLoading(false)
                router.push("/login")
            }
            if (res.data.error) {
                setError(res.data.error)
                setLoading(false)
            }
        }
        catch (error) {
            setLoading(false)
            setError(error.response && error.response.data.error || error.response.data.detail)
        }
    }

    
    //Load User
    const loadUser = async () => {
        try {
            setLoading(true)
            const res = await axios.get('/api/auth/user')

            if (res.data.user) {
                setLoading(false)
                setIsAuthenticated(true)
                setUser(res.data.user)
            }
        }
        catch (error) {
            setLoading(false)
            setIsAuthenticated(false)
            setUser(null)
            setError(error.response && error.response.data.error)
        }
    }

    
    //Logout User
    const logout = async () => {
        try {

            const res = await axios.post('/api/auth/logout')

            if (res.data.success) {
                setIsAuthenticated(false)
                setUser(null)
            }
        }
        catch (error) {
            setError(error.response && error.response.data.error)
        }
    }

    //Clear Errors
    const clearErrors = () => {
        setError(null)
    }

    return (
        <AuthContext.Provider
            value={{
                loading,
                user,
                isAuthenticated,
                error,
                login,
                logout,
                register,
                clearErrors,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;