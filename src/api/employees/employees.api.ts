import { AxiosService } from '@/api/AxiosService/axiosSerive'
import { AxiosRequestConfig } from 'axios'

class EmployeesApi extends AxiosService {
  constructor(config?: AxiosRequestConfig) {
    super(config)
  }

  async getEmployees(price?: number) {
    return this.axiosCall({
      method: 'get',
      url: '',
      params: {
        price,
      },
    })
  }
}

export default new EmployeesApi({
  baseURL: '/api/v1/employees',
  withCredentials: false,
})
