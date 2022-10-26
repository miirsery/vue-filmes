import { AxiosService } from '@/api/AxiosService/axiosSerive'
import { AxiosRequestConfig } from 'axios'

class HallsApi extends AxiosService {
  constructor(config?: AxiosRequestConfig) {
    super(config)
  }

  async getHalls(filters?: any) {
    return this.axiosCall({
      method: 'get',
      url: '',
      params: filters,
    })
  }

  async deleteHall(id: number) {
    return this.axiosCall({
      method: 'delete',
      url: `/${id}`,
    })
  }

  async getHall(id: number) {
    return this.axiosCall({
      method: 'get',
      url: `/${id}`,
    })
  }
}

export default new HallsApi({
  baseURL: '/api/v1/halls',
  withCredentials: false,
})
