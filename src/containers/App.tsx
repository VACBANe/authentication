import React, { useEffect, useState, FC } from 'react'
import { Route, useHistory } from 'react-router-dom'
import { MeGet } from '../api/userApi'

import './App.css'
import Loader from '../components/Loader/Loader'
import Login from '../components/Login/Login'
import Me from '../components/Me/Me'
const App: FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const history = useHistory()

  useEffect(() => {
    MeGet().then(({ data }: any) => {
      if (data.body) {
        if (data.body.message === 'token is valid') {
          history.push('/me')
          setIsLoading(false)
        }
      } else {
        history.push('/login')
        setIsLoading(false)
      }
    })
  }, [history])

  return (
    <div className="App">
      <Route path="/login" render={() => <Login setIsLoading={setIsLoading}/>}/>
      <Route path="/me" component={Me}/>
      <div className="loader">{isLoading && <Loader />}</div>
    </div>
  )
}
export default App
