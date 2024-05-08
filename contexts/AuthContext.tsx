"use client"
import axios from 'axios'
import jwt_decode, { jwtDecode } from 'jwt-decode'
import { useRouter } from 'next/navigation' 
import { ReactNode, createContext, useEffect, useState } from 'react'
import authConfig from '../configs/auth'
import { Storage } from '../services/storage'
import { UserInfoSession } from './auth'
import { AuthValuesType, UserDataType } from './types'
import { apiUserLogin } from '@/services/api/Employee/LoginApi'


const defaultProvider: AuthValuesType = {
	user: null,
	loading: true,
	setUser: () => null,
	setLoading: () => Boolean,
	login: (email: string, password :string) => Promise.resolve(),
	logout: () => Promise.resolve(),
}

const AuthContext = createContext(defaultProvider)

type Props = {
	children: ReactNode
}

const AuthProvider = ({ children }: Props) => {
	const storage = Storage.getInstance()

	const [user, setUser] = useState<UserDataType | null>(defaultProvider.user)
	const [loading, setLoading] = useState<boolean>(defaultProvider.loading)

	const router = useRouter()

	useEffect(() => {
		const initAuth = async (): Promise<void> => {
			const storedToken = storage.getSessionToken()
			if (storedToken) {
				const decoded = jwtDecode(storedToken) as UserInfoSession
				setUser(decoded as UserDataType | null)
				setLoading(false)
			} else {
				setLoading(false)
			}
		}

		initAuth()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const handleLogin  = async (email: string, password :string) => {
		try {
			console.log("handleLogin")
			let res = await apiUserLogin(email, password);
			console.log("res")
			console.log(res)
			if (res){
				window.localStorage.setItem('at', JSON.stringify(res))
				let userInfo  = jwtDecode(String(res)) as UserInfoSession
				window.localStorage.setItem('roleName', userInfo?.roleName!)
				router.push("/employee")
			}

		}catch(err){
			console.log(err)
		}
	}

	const handleLogout = () => {
		setUser(null)
		storage.clearAllSession()
		router.push('/login')
	}

	const values = {
		user,
		loading,
		setUser,
		setLoading,
		login: handleLogin,
		logout: handleLogout,
	}

	return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export { AuthContext, AuthProvider }
