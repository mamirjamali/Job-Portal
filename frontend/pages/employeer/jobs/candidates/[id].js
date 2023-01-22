import Layout from '@/components/layouts/Layout'
import JobCandidates from '@/components/job/JobCandidates'
import { isAuthenticatedUser } from '@/components/utiles/IsAuthenticated'
import NotFoundPage from '@/pages/404'
import axios from 'axios'

export default function JobDetailPage({ candidatesApplied, error}) {

  if (error?.includes("Not found")) return <NotFoundPage />
  
  return (
    <>
      <Layout title={"Job Candidates"}>
        <JobCandidates candidatesApplied={candidatesApplied} error={error} />
      </Layout>
    </>
  )
}


export async function getServerSideProps({ req, params }) {
  
  const access_token = req.cookies.access || ''
  const user = await isAuthenticatedUser(access_token)


  try {
    const res = await axios.get(`${process.env.API_URL}/api/job/${params.id}/candidates`,
      {
        headers: {
           Authorization: `Bearer ${access_token}`
         }
    })
      
    const candidatesApplied = res.data

      
    return {
      props: {
        candidatesApplied
      }
    }

  } catch (error) {
    return {
      props: {
        error: error.response.data.error,
      }
    }
  }
}