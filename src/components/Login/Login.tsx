import React, { useState } from 'react'
import { useHistory } from 'react-router'
import { setToken } from '../../api/localStorageService'
import { LoginPost, RegPost } from '../../api/userApi'

import './Login.css'
interface ILogin {
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
}

const Login: React.FC<ILogin> = ({ setIsLoading }) => {
  const [email, setEmail] = useState<string>('qwerty123@reg.com')
  const [password, setPassword] = useState<string>('qwerty123')
  const history = useHistory()
  const loginFunc = () => {
    setIsLoading(true)
    LoginPost(email, password).then(({ data }: any) => {
      if (data.body.access_token) {
        setToken(data.body)
        history.push('/me')
        setIsLoading(false)
      } else {
        alert('Fail')
        setIsLoading(false)
      }
    })
  }
  const regFunc: () => void = () => {
    setIsLoading(true)
    RegPost(email, password).then(({ data }: any) => {
      data.message === 'User was created successfully'
        ? loginFunc()
        : alert('Fail')
      setIsLoading(false)
    })
  }
  return (
    <div className="login-form">
      <input
        type="email"
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <div className={'buttons'}>
        <button onClick={regFunc}>Register</button>
        <button onClick={loginFunc}>Login</button>
      </div>
    </div>
  )
}

export default Login
