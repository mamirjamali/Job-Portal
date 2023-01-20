import '@/styles/globals.css'
import { AuthProvider } from '@/context/AuthContext'
import { JobProvider } from '@/context/JobContext'


export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <JobProvider>
        <Component {...pageProps} />
      </JobProvider>
    </AuthProvider>
  )
}
