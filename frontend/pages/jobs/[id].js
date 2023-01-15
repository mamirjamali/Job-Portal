import Layout from '@/components/layouts/Layout'
import JobDetails from '@/components/job/JobDetails'
import NotFoundPage from '../404'
import axios from 'axios'

export default function JobDetailPage({ job, candidates, error }) {

  if (error === "Not found.") return <NotFoundPage/>
  return (
    <>
      <Layout title={job.title}>
        <JobDetails job={job} candidates={ candidates } />
      </Layout>
    </>
  )
}


export async function getServerSideProps({ params }) {
  
  try {
      const res = await axios.get(`${process.env.API_URL}/api/jobs/${params.id}`)
      const job = res.data.job
      const candidates = res.data.candidates

    return {
      props: {
            job,
            candidates
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