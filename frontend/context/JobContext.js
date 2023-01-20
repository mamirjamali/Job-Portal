import { useState, useEffect, createContext } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'

const JobContext = createContext();

export const JobProvider = ( { children }) => {

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [updated, setUpdated] = useState(false)
    const [applied, setApplied] = useState(false)
    const [stats, setStats] = useState('')
  
    
    const router = useRouter()
    
    //Apply To Job
    const applyToJob = async (id, access_token) => {
        try {
            setLoading(true)
            const res = await axios.post(`${process.env.API_URL}/api/jobs/${id}/apply/`,
                {}
           , {
                headers:{
                    Authorization: `Bearer ${access_token}`
                }
            })
            if (res.data.applied) {
                setLoading(false)
                setApplied(true)
            }
            if (res.data.error) {
                setError(res.data.error)
                setLoading(false)
            }
        }
        catch (error) {
            setLoading(false)
            setError(error.response &&
                error.response.data.error || error.response.data.detail
            )
        }
    }

    //Check If Applied To Job
    const checkApplied = async (id, access_token) => {
        try {
            const res = await axios.get(`${process.env.API_URL}/api/jobs/${id}/check/`,
                {
                    headers: {
                        Authorization: `Bearer ${access_token}`
                    }
                })
            
            setApplied(res.data)
            if (res.data.error) {
                setError(res.data.error)
                setLoading(false)
            }
        }
        catch (error) {
            setLoading(false)
            setError(error.response &&
                error.response.data.error || error.response.data.detail
            )
        }
    }


    //Get The Stats
    const getTopic = async (topic) => {
        try {
            setLoading(true)
            const res = await axios.get(`${process.env.API_URL}/api/stats/${topic}/`,)
            console.log(res)
            
            setLoading(false)
            setStats(res.data)
        }
        catch (error) {
            setLoading(false)
            setError(error.response &&
                error.response.data.error || error.response.data.detail
            )
        }
    }

    //Clear Errors
    const clearErrors = () => {
        setError(null)
    }

    return (
        <JobContext.Provider
            value={{
                loading,
                error,
                updated,
                applied,
                stats,
                getTopic,
                checkApplied,
                applyToJob,
                setUpdated,
                clearErrors,
            }}
        >
            {children}
        </JobContext.Provider>
    )
}

export default JobContext;