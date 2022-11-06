import { AxiosService } from '@/api/AxiosService/axiosSerive'
import { AxiosRequestConfig } from 'axios'

class SessionsApi extends AxiosService {
  constructor(config?: AxiosRequestConfig) {
    super(config)
  }

  async getSessions() {
    return this.axiosCall<any>({
      method: 'get',
      url: '',
    })
  }
}

export default new SessionsApi({
  baseURL: '/api/v1/sessions',
  withCredentials: false,
})
