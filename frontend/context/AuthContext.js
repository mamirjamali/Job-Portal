import { useState, useEffect, createContext } from 'react'
import axios from 'axios'

const AuthContext = createContext()

export const AuthProvider = ( { children }) => {

    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState(null)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [error, setError] = useState(null)
    
    const login = async ({ username, password }) => {
        
        
        try {
            setLoading(true)
            setError(null)
            const res = await axios.post('/api/auth/login', {
                username,
                password
            })

            if (res.data.success) {
                setLoading(false)
                setIsAuthenticated(true)
            }

        } catch (error) {
            setLoading(false)
            setError(error.response.data.error)
        }

    }
    return (
        <AuthContext.Provider
            value={{
                loading,
                user,
                isAuthenticated,
                error,
                login
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;