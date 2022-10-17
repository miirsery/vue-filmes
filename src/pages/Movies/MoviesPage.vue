<template>
  <div class="movies-page w-100">
    <div class="users-page__header d-flex ai-center jc-between">
      <h1>Movies with tickets</h1>
      <div class="d-flex ai-center">
        <el-button type="success" @click="handleMostPopularMovieGet">Most popular</el-button>
        <el-button type="primary" @click="handleCreateModalVisibleChange">Create movie</el-button>
      </div>
    </div>
    <movies-table :movies="movies" :loading="tableLoading" @open-edit-dialog="handleEditModalVisibleChange" />

    <movie-edit-dialog
      :movie="movie"
      :visible="isEditDialogVisible"
      :loading="isEditDialogLoading"
      @close-dialog="handleEditModalVisibleChange"
      @update-table="getMovies"
    />
    <movie-create-dialog
      :visible="isCreateDialogVisible"
      @close-dialog="handleCreateModalVisibleChange"
      @update-table="getMovies"
    />
  </div>
</template>

<script lang="ts" setup>
import MoviesTable from '@/components/movies/MoviesTable.vue'
import MovieEditDialog from '@/components/movie/MovieEdit/MovieEditDialog.vue'
import { onMounted, reactive, ref } from 'vue'
import moviesApi from '@/api/movies/movies.api'
import MovieCreateDialog from '@/components/movie/MovieCreate/MovieCreateDialog.vue'

const tableLoading = ref(false)
const isEditDialogLoading = ref(false)
const isEditDialogVisible = ref(false)
const isCreateDialogVisible = ref(false)

const movies = ref<any>([])
const movie = reactive<any>({})
const filter = reactive({
  most_popular: true,
})

const handleEditModalVisibleChange = async (id?: number): Promise<void> => {
  isEditDialogLoading.value = true

  isEditDialogVisible.value = !isEditDialogVisible.value

  if (id) {
    await getMovie(id)
  }

  isEditDialogLoading.value = false
}

const handleCreateModalVisibleChange = (): void => {
  isCreateDialogVisible.value = !isCreateDialogVisible.value
}

const getMovie = async (id: number): Promise<void> => {
  const [error, data] = await moviesApi.getMovie(id)

  if (!error && data) {
    movie.value = data
  }
}

const getMovies = async (filters?: any): Promise<void> => {
  tableLoading.value = true

  const [error, data] = await moviesApi.getMovies(filters)

  if (!error && data) {
    movies.value = data
  }

  tableLoading.value = false
}

const handleMostPopularMovieGet = async (): Promise<void> => {
  const [error, data] = await moviesApi.getMovies({
    most_popular: filter.most_popular,
  })

  if (!error && data) {
    movie.value = data
  }
}

onMounted(() => {
  getMovies()
})
</script>
