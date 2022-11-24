import { AxiosService } from '@/api/AxiosService/axiosSerive'
import { AxiosRequestConfig } from 'axios'
import { SuccessResponseMessageType } from '@/types/common.types'

class CinemasApi extends AxiosService {
  constructor(config?: AxiosRequestConfig) {
    super(config)
  }

  async getCinemas(userId: number) {
    return this.axiosCall({
      method: 'get',
      url: '',
      params: {
        user_id: userId,
      },
    })
  }

  async getCinema(payload?: any) {
    const params = {
      date: payload.date,
    }

    return this.axiosCall<any>({
      method: 'get',
      url: `/${payload.id}`,
      params,
    })
  }

  async deleteCinema(id: number) {
    return this.axiosCall({
      method: 'get',
      url: `/${id}`,
    })
  }

  public addCinemaToFavorite(data: any) {
    return this.axiosCall<SuccessResponseMessageType>({
      method: 'patch',
      url: '/favorite',
      data,
    })
  }
}

export default new CinemasApi({
  baseURL: '/api/v1/cinemas',
  withCredentials: false,
})
