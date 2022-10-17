import { AxiosService } from '@/api/AxiosService/axiosSerive'
import { AxiosRequestConfig } from 'axios'

class CinemasApi extends AxiosService {
  constructor(config?: AxiosRequestConfig) {
    super(config)
  }

  async getCinemas() {
    return this.axiosCall({
      method: 'get',
      url: '',
    })
  }

  async deleteCinema(id: number) {
    return this.axiosCall({
      method: 'get',
      url: `/${id}`,
    })
  }
}

export default new CinemasApi({
  baseURL: '/api/v1/cinemas',
  withCredentials: false,
})
