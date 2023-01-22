import React from 'react'
import Layout from '@/components/layouts/Layout'
import NewJob from '@/components/job/NewJob'
import { isAuthenticatedUser } from '@/components/utiles/IsAuthenticated'


export default function NewJobPage({access_token}) {
  return (
    <Layout title='Add New Job'>
          <NewJob access_token={ access_token} />
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

    return {
      props: {
        access_token,
      }
    }
  }