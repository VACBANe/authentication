import React from 'react'
import { useHistory } from 'react-router'
import { clearToken } from '../../api/localStorageService'
import './Me.css'

const Me: React.FC = () => {
  const history = useHistory()
  const logoutFunc: () => void = () => {
    clearToken()
    history.push('/login')
  }
  return (
    <div className={'me-container'}>
      <h1>Token is valid</h1>
      <button onClick={logoutFunc}>Logout</button>
    </div>
  )
}

export default Me
