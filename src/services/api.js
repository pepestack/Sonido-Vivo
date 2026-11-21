import axios from 'axios'
import { CLAVES, leer } from '../utils/almacenamiento'

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1',
  timeout: 10000,
})

let alExpirar = null

export function alExpirarSesion(fn) {
  alExpirar = fn
}

api.interceptors.request.use((config) => {
  const token = leer(CLAVES.sesion, null)?.token
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

api.interceptors.response.use(
  (respuesta) => respuesta,
  (error) => {
    const tokenRechazado = error.response?.status === 401 && error.config?.headers?.Authorization
    if (tokenRechazado && alExpirar) alExpirar()
    return Promise.reject(error)
  }
)
