import axios from 'axios'

const API_KEY = import.meta.env.VITE_STACKEXCHANGE_APP_KEY
const API_TOKEN = import.meta.env.VITE_STACKEXCHANGE_APP_TOKEN

const apiRoot = axios.create({
  baseURL: 'https://api.stackexchange.com/2.3',
  params: {
    key: API_KEY,
    access_token: API_TOKEN,
  },
})

export { apiRoot }
