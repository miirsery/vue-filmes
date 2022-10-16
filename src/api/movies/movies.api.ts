import { AxiosService } from '@/api/AxiosService/axiosSerive'
import { AxiosRequestConfig } from 'axios'

class MoviesApi extends AxiosService {
  constructor(config?: AxiosRequestConfig) {
    super(config)
  }

  getMovies(filters?: any) {
    return this.axiosCall<any>({
      method: 'get',
      url: '',
      params: filters,
    })
  }

  getMovie(id: number) {
    return this.axiosCall<any>({
      method: 'get',
      url: `/${id}`,
    })
  }

  createMovie(payload: FormData) {
    return this.axiosCall<any>({
      method: 'post',
      url: '',
      data: payload,
    })
  }

  updateMovie(data: FormData) {
    return this.axiosCall<any>({
      method: 'patch',
      url: '',
      data,
    })
  }
}

export default new MoviesApi({
  baseURL: '/api/v1/movies',
  withCredentials: false,
})
