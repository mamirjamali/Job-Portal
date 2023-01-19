import cookie from 'cookie'
import { isAuthenticatedUser } from "@/components/utiles/IsAuthenticated";
import Layout from "@/components/layouts/Layout";
import UploadResume from "@/components/user/UploadResume";

const UploadResumePage = ({access_token}) => {
    return ( 
        <Layout title="Upload Your Resume">
            <UploadResume access_token={access_token} />
        </Layout>
     );
}
 
export default UploadResumePage;



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