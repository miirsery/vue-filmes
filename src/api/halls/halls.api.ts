import { AxiosService } from '@/api/AxiosService/axiosSerive'
import { AxiosRequestConfig } from 'axios'

class HallsApi extends AxiosService {
  constructor(config?: AxiosRequestConfig) {
    super(config)
  }

  async getHalls(cinemaId?: any) {
    return this.axiosCall({
      method: 'get',
      url: '',
      params: {
        cinema_id: cinemaId,
      },
    })
  }

  async getHall(id: number) {
    return this.axiosCall({
      method: 'get',
      url: `/${id}`,
    })
  }

  async getSchema(hallId?: number) {
    return this.axiosCall<any[]>({
      method: 'get',
      url: 'schema',
      params: {
        hall_id: hallId,
      },
    })
  }

  async createHall(data: any) {
    return this.axiosCall({
      method: 'post',
      url: '',
      data,
    })
  }

  async createSchema(data: any) {
    return this.axiosCall({
      method: 'post',
      url: 'schema',
      data,
    })
  }

  async deleteHall(id: number) {
    return this.axiosCall({
      method: 'delete',
      url: `/${id}`,
    })
  }
}

export default new HallsApi({
  baseURL: '/api/v1/halls',
  withCredentials: false,
})
