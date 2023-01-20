import Layout from "@/components/layouts/Layout";
import { isAuthenticatedUser } from "@/components/utiles/IsAuthenticated";
import AppliedJobs from "@/components/user/AppliedJobs";
import axios from "axios";


const AppliedJobPage = ({ access_token, jobs }) => {
    return ( 
        <Layout title="Applied Jobs">
            <AppliedJobs jobs={ jobs } />
        </Layout>
     );
}
 
export default AppliedJobPage;


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
    
    const res = await axios.get(`${process.env.API_URL}/api/me/jobs/applied/`,{
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