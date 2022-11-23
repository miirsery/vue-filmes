import { AxiosService } from '@/api/AxiosService/axiosSerive'
import { AxiosRequestConfig } from 'axios'
import { MovieType } from '@/types/movies.types'
import { SuccessResponseMessageType } from '@/types/common.types'

class MoviesApi extends AxiosService {
  constructor(config?: AxiosRequestConfig) {
    super(config)
  }

  public getMovies() {
    return this.axiosCall<MovieType[]>({
      method: 'get',
      url: '',
    })
  }

  public addMovieToFavorite(movieId: string) {
    return this.axiosCall<SuccessResponseMessageType>({
      method: 'patch',
      url: '/favorite',
    })
  }
}

export default new MoviesApi({
  baseURL: '/api/v1/movies',
  withCredentials: false,
})
