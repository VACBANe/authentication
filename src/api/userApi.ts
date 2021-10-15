import { instance } from './axios'

export const LoginPost = (email: string, password: string) => {
  return instance.post(`login?email=${email}&password=${password}`)
}
export const MeGet = () => {
  return instance.get('me')
}

export const RegPost = (email: string, password: string) => {
  return instance
    .post('sign_up', {
      email: email,
      password: password
    })
}
