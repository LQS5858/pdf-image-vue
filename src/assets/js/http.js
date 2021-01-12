import axios from 'axios'
import { Message } from 'element-ui'

const http = axios.create({
    timeout: 30000,
    baseURL: '/api'
})



http.interceptors.response.use(res => {
    const { config, data } = res || {}
    const { success, error, message, data: _data } = data || {}
    const { showError = false } = config || {}
    if (showError && !success) {
        const msg = error || message
        Message.error(msg)
    }
    if (success) {
        return Promise.resolve(_data)
    } else {
        return Promise.reject(data)
    }
})

export default http