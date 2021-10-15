import axios, { AxiosRequestConfig } from 'axios'
import { clearToken, getAccessToken, getRefreshToken, setToken } from './localStorageService'

export const instance = axios.create({
  baseURL: 'http://142.93.134.108:1111/',
  headers: {
    'Content-Type': 'application/json'
  }
})
instance.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const token = getAccessToken()
    if (token) {
      config.headers!.Authorization = 'Bearer ' + token
    }
    return config
  },
  (error) => {
    Promise.reject(error)
  }
)

instance.interceptors.response.use(
  async (response: any) => {
    const originalRequest = response.config
    if (response.data.statusCode === 401) {
      if (response.data.body.message === 'token is not valid') {
        clearToken()
        window.location.reload()
        return response
      }
      try {
        axios
          .post('http://142.93.134.108:1111/refresh', null, {
            headers: {
              Authorization:
                'Bearer ' + getRefreshToken()
            }
          })
          .then(({ data }: any) => {
            setToken(data.body)
          })
        originalRequest.headers.Authorization = `Bearer ${getAccessToken()}`
        return instance(originalRequest)
      } catch (err) {
        clearToken()
        return Promise.reject(err)
      }
    }
    return response
  },
  (error) => {
    const originalRequest = error.config

    if (error.response.status === 401) {
      return Promise.reject(error)
    }

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      const refreshToken = getRefreshToken()
      return axios
        .post('/refresh', null, {
          headers: {
            Authorization: 'Bearer ' + refreshToken
          }
        })
        .then((res: any) => {
          if (res.status === 201) {
            setToken(res.data)
            axios.defaults.headers.common.Authorization =
              'Bearer ' + getAccessToken()
            return instance(originalRequest)
          }
        })
        .catch((error) => {
          clearToken()
          return Promise.reject(error)
        })
    }
    return Promise.reject(error)
  }
)
