import axios from 'axios'

export const checkUserIsAdmin = (currentUser) => {
  if (!currentUser || !Array.isArray(currentUser.userRoles)) return false
  const { userRoles } = currentUser
  if (userRoles.includes('admin')) return true

  return false
}

export const apiInstance = axios.create({
  baseURL: 'http://localhost:5001/ecommerce-app-780dc/us-central1/api',
})
