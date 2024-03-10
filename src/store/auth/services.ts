import api from '../../utils/api'

const authEndpoint = '/auth'

export const signIn = async ( params : any) => {
  const response = await api.post(`${authEndpoint}/signin`, params)
  return response 
}

export const signUp = async (params : any) => {
  const response = await api.post(`${authEndpoint}/register`, params)
  return response
}