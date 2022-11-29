import { defineStore } from 'pinia'
import moviesApi from '@/api/movies/movies.api'
import { ref } from 'vue'

export const useMovieStore = defineStore('movie', () => {
  const movie: any = ref([])

  const getDetailedMove = async (movieId: string, userId: number): Promise<void> => {
    const [error, data] = await moviesApi.getMovie(movieId, userId)

    if (!error && data) {
      movie.value = data
    }
  }

  return { getDetailedMove, movie }
})
