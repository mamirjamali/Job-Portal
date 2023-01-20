import Layout from '@/components/layouts/Layout'
import JobDetails from '@/components/job/JobDetails'
import NotFoundPage from '../404'
import axios from 'axios'

export default function JobDetailPage({ job, candidates, error,  access_token}) {

  if (error === "Not found.") return <NotFoundPage/>
  return (
    <>
      <Layout title={job.title}>
        <JobDetails job={job} candidates={ candidates } access_token={access_token} />
      </Layout>
    </>
  )
}


export async function getServerSideProps({ req, params }) {
  
  try {
      const res = await axios.get(`${process.env.API_URL}/api/jobs/${params.id}`)
      const job = res.data.job
      const candidates = res.data.candidates
      
      const access_token = req.cookies.access || ''
      
      return {
        props: {
              job,
              candidates,
              access_token
        }
      }
  } catch (error) {
    return {
      props: {
        error: error.response.data.detail
      }
    }
  }
}