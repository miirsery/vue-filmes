import { AxiosService } from '@/api/AxiosService/axiosSerive'
import { AxiosRequestConfig } from 'axios'
import { UserType } from '@/types/users.types'

class UsersApi extends AxiosService {
  constructor(config?: AxiosRequestConfig) {
    super(config)
  }

  async userRegister(payload: any) {
    return this.axiosCall<any>({
      method: 'post',
      url: '',
      data: { ...payload },
    })
  }

  async getUsers() {
    return this.axiosCall<UserType[]>({
      method: 'get',
      url: '',
    })
  }

  async userDelete(id: number) {
    return this.axiosCall({
      method: 'delete',
      url: `/${id}`,
    })
  }

  async setDiscount(discount: number) {
    return this.axiosCall({
      method: 'post',
      url: '/discount',
      data: {
        discount,
      },
    })
  }
}

export default new UsersApi({
  baseURL: '/api/v1/users',
  withCredentials: false,
})
