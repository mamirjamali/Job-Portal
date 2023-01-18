// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import cookie from 'cookie'
import axios from "axios"

export default async (req, res) => {

    if (req.method === "GET") {
        
            const access = cookie.parse(req.headers.cookie || '')

            if (!access.access) {
                return res.status(401).json({
                    messege: 'Login first to load user'
                })
            }
            
        try {
            const response = await axios.get(`${process.env.API_URL}/api/me/`, {
                headers: {
                    Authorization: `Bearer ${access.access}`,
                },
            })
            
            if (response.data) {
                return res.status(200).json({
                    user: response.data
                })
            }
        }
        catch (error) {
            return res.status(error.response.status).json({
                error: "Somthing went wrong"
            })
        }
    }
}
