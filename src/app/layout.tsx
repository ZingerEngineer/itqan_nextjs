import './globals.css'
import { AuthProvider } from '@/providers/AuthProvider'
import ToastProvider from '@/providers/ToastProvider'
import 'react-toastify/dist/ReactToastify.css'
const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html>
      <body>
        <AuthProvider>
          <ToastProvider>{children}</ToastProvider>
        </AuthProvider>
      </body>
    </html>
  )
}

export default Layout
