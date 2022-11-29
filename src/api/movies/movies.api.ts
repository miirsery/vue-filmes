import { AxiosService } from '@/api/AxiosService/axiosSerive'
import { AxiosRequestConfig } from 'axios'
import { MovieType } from '@/types/movies.types'

class MoviesApi extends AxiosService {
  constructor(config?: AxiosRequestConfig) {
    super(config)
  }

  public getMovies(params?: any) {
    return this.axiosCall<MovieType[]>({
      method: 'get',
      url: '',
      params,
    })
  }

  public getMovie(id: string, userId: number) {
    return this.axiosCall<any>({
      method: 'get',
      url: `/${id}`,
      params: {
        user_id: userId,
      },
    })
  }

  async getPopularMovies() {
    return this.axiosCall({
      method: 'get',
      url: '/popular',
    })
  }
}

export default new MoviesApi({
  baseURL: '/api/v1/movies',
  withCredentials: false,
})
