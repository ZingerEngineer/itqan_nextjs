'use client'
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useLayoutEffect
} from 'react'
import { usePathname, useRouter } from 'next/navigation'
import axios, { AxiosResponse } from 'axios'
import { IHR, ISuperAdmin } from '@/interfaces/global'
import { ZSSuperAdmin, ZSHR } from '@/schemas/authSchema'
import { setCookie } from '@/utils/setCookie'
import { showToast } from '@/utils/showToast'

interface AuthContextType {
  user: ISuperAdmin | IHR | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
}

type TSignInFlow = {
  authStatus: 'success' | 'fail'
  data:
    | {
        user: ISuperAdmin | IHR
        currentRole: string
        id: string
      }
    | undefined
  authToken?: string
}

const handleSingInFlow = (axiosResponse: AxiosResponse): TSignInFlow => {
  let currentRole: string
  let id: string
  let authToken: string
  const user: ISuperAdmin | IHR = axiosResponse.data.data.user
  const { token, status } = axiosResponse.data
  if (ZSSuperAdmin.safeParse(user).success) {
    const validatedUser = ZSSuperAdmin.parse(user) as ISuperAdmin
    const { _id } = validatedUser
    currentRole = 'super-admin'
    id = _id
    authToken = token
  } else {
    user['role'] = 'hr'
    const validatedUser = ZSHR.parse(user) as IHR
    const {
      _id,
      role,
      businessEmail,
      firstName,
      lastName,
      phone,
      companySize
    } = validatedUser
    localStorage.setItem(
      'user',
      JSON.stringify({
        token,
        _id,
        role,
        businessEmail,
        firstName,
        lastName,
        phone,
        companySize
      })
    )
    currentRole = 'hr'
    id = _id
    authToken = token
  }
  if (status === 'success') {
    return {
      authStatus: 'success',
      data: {
        user,
        currentRole,
        id
      },
      authToken: authToken
    }
  }
  return {
    authStatus: 'fail',
    data: undefined,
    authToken: undefined
  }
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<ISuperAdmin | IHR | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()
  const unAuthorizedRoutes = ['auth/signin']
  const authorizedRoutes = ['/assessments', '/candidates', '/library']

  const checkUnAuthorizedRoutes = () => {
    const isUnAuthorized = unAuthorizedRoutes.some((route) =>
      pathname.includes(route)
    )
    if (isUnAuthorized && user) {
      router.push(`/dashboard/${user._id}/${user.role}/assessments`)
    }
  }
  const checkAuthorizedRoutes = () => {
    const isAuthorized = authorizedRoutes.some((route) =>
      pathname.includes(route)
    )
    if (isAuthorized && !user) {
      router.push('/auth/signin')
    }
  }
  const checkUserLoggedIn = async () => {
    try {
      const storedUser = localStorage.getItem('user')
      if (storedUser) {
        setUser(JSON.parse(storedUser))
        checkAuthorizedRoutes()
        checkUnAuthorizedRoutes()
      } else {
        throw new Error('User not found')
      }
    } catch (error) {
      setUser(null)
      localStorage.removeItem('user')
      router.push('/auth/signin')
    } finally {
      setLoading(false)
    }
  }
  useLayoutEffect(() => {
    checkUserLoggedIn()
  }, [pathname])

  const login = async (email: string, password: string) => {
    const url = process.env.NEXT_PUBLIC_BACK_END_BASE_URL
    setLoading(true)
    try {
      const res = await axios.post(
        `${url}/api/v1/super-admin/login`,
        {
          email: email,
          password: password
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'Access-Control-Allow-Origin': '*'
          }
        }
      )
      // res.headers['authorization'] = res.data.token
      const signInFlowResults = handleSingInFlow(res)
      if (!signInFlowResults) throw new Error('Login failed')
      const { authStatus, data, authToken } = signInFlowResults
      if (authStatus === 'fail' && !data && !authToken)
        throw new Error('Login failed')
      if (authStatus === 'success' && data && authToken) {
        const { user, currentRole, id } = data
        localStorage.setItem('user', JSON.stringify(user))
        setCookie('Authorization', authToken, 90)
        setUser(user)
        router.push(`/dashboard/${id}/${currentRole}/assessments`)
      }
    } catch (error) {
      showToast('error', 'Login failed.', {
        className: 'bg-red-500 text-white'
      })
    } finally {
      setLoading(false)
    }
  }

  const logout = async () => {
    setLoading(true)
    try {
      setUser(null)
      localStorage.removeItem('user')
      router.push('/login')
    } catch (error) {
      showToast('error', 'Logout failed', {
        className: 'bg-red-500 text-white'
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
