import apiService from "@/utils/apiService"

export const getUserProfile = async (access_token) =>
await apiService
 .request({
  method: 'get',
  url: '/api/user/user/me/',
  headers: {
   Authorization: `Bearer ${access_token}`
  }
 })
 .then((res) => {
  return res
 })
 .catch((err) => {
  throw err
 })