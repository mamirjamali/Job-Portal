import React from 'react'
import axios from 'axios'
import Layout from '@/components/layouts/Layout'
import MyJobs from '@/components/job/MyJobs'
import { isAuthenticatedUser } from '@/components/utiles/IsAuthenticated'


export default function NewJobPage({access_token, jobs}) {
  return (
    <Layout title='My Jobs'>
          <MyJobs access_token={ access_token} jobs={jobs} />
    </Layout>
  )
}


export async function getServerSideProps({req}) {

    const access_token = req.cookies.access
    const user = await isAuthenticatedUser(access_token)
 
    if (!user) {
        return {
            redirect: {
                destination: '/login',
                permanent: false
            }
        }
    }

    const res = await axios.get(`${process.env.API_URL}/api/me/jobs/`,{
        headers: {
            Authorization: `Bearer ${access_token}`
        }
    })

    const jobs = res.data

    return {
      props: {
        access_token,
        jobs
      }
    }
  }