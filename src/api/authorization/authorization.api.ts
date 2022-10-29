import { AxiosService } from '@/api/AxiosService/axiosSerive'
import { AxiosRequestConfig } from 'axios'

class AuthorizationApi extends AxiosService {
  constructor(config?: AxiosRequestConfig) {
    super(config)
  }

  async getToken(data: any) {
    return this.axiosCall({
      method: 'post',
      url: 'get-token',
      data,
    })
  }

  async login() {
    return this.axiosCall({
      method: 'get',
      url: 'login',
    })
  }

  async getSelf() {
    return this.axiosCall({
      method: 'get',
      url: '/self',
    })
  }
}

export default new AuthorizationApi({
  baseURL: '/api/v1/dashboard/auth/',
  withCredentials: false,
})
