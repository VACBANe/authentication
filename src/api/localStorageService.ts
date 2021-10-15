/* eslint-disable camelcase */
type tokenObj = {
  access_token: string;
  refresh_token: string;
};
export const setToken = (obj: tokenObj) => {
  localStorage.setItem('access_token', obj.access_token)
  localStorage.setItem('refresh_token', obj.refresh_token)
}

export const getAccessToken = () => {
  return localStorage.getItem('access_token')
}
export const getRefreshToken = () => {
  return localStorage.getItem('refresh_token')
}
export const clearToken = () => {
  localStorage.removeItem('access_token')
  localStorage.removeItem('refresh_token')
}
