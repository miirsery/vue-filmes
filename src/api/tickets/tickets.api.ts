import { AxiosService } from '@/api/AxiosService/axiosSerive'
import { AxiosRequestConfig } from 'axios'

class TicketsApi extends AxiosService {
  constructor(config?: AxiosRequestConfig) {
    super(config)
  }

  async getTickets(filters?: any) {
    return this.axiosCall<any>({
      method: 'get',
      url: '',
      params: filters,
    })
  }

  async createTicket(data: any) {
    return this.axiosCall<any>({
      method: 'post',
      url: '',
      data,
    })
  }
}

export default new TicketsApi({
  baseURL: '/api/v1/tickets',
  withCredentials: false,
})
