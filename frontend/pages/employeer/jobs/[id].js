import Layout from '@/components/layouts/Layout'
import UpdateJob from '@/components/job/UpdateJob'
import { isAuthenticatedUser } from '@/components/utiles/IsAuthenticated'
import NotFoundPage from '@/pages/404'
import axios from 'axios'

export default function UpdateJobPage({ job, access_token, error}) {

  if (error?.includes("Not found")) return <NotFoundPage />
  
  return (
    <>
      <Layout title={"Job Candidates"}>
        <UpdateJob job={job} access_token={access_token} />
      </Layout>
    </>
  )
}


export async function getServerSideProps({ req, params }) {
  
  const access_token = req.cookies.access || ''

  try {
    const res = await axios.get(`${process.env.API_URL}/api/jobs/${params.id}/`)
      
    const job = res.data.job

    return {
      props: {
        access_token,
        job
      }
    }

  } catch (error) {
    console.log(error)
    return {
      props: {
        error: error.response.data.error,
      }
    }
  }
}