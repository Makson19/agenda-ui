import api from '../../utils/api'

const authEndpoint = '/auth'

export const signIn = async ({ params }: any) => {
  console.log('params', params)
  const response = await api.post(`${authEndpoint}/signin`, params)
  return response 
}