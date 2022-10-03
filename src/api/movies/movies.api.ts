import { AxiosService } from '@/api/AxiosService/axiosSerive'
import { AxiosRequestConfig } from 'axios'

class MoviesApi extends AxiosService {
  constructor(config?: AxiosRequestConfig) {
    super(config)
  }

  public getMovies() {
    return this.axiosCall({
      method: 'get',
      url: '',
    })
  }
}

export default new MoviesApi({
  baseURL: '/api/v1/movies',
  withCredentials: false,
})
