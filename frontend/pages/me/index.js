import Layout from "@/components/layouts/Layout";
import UpdateProfile from "@/components/user/UpdateProfile";
import { isAuthenticatedUser } from "@/components/utiles/IsAuthenticated";


const UpdateProfilePage = ({access_token}) => {
    return ( 
        <Layout title="Update Your Profile">
            <UpdateProfile access_token={access_token}/>
        </Layout>
     );
}
 
export default UpdateProfilePage;


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