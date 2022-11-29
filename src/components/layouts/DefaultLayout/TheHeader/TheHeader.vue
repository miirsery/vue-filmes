<template>
  <header class="the-header">
    <el-row>
      <nav class="d-flex ai-center w-100 jc-between">
        <el-col :span="12">
          <ul class="d-flex ai-center">
            <li v-for="item in headerItems" :key="item.title" class="mr-50">
              <router-link :to="item.url">{{ item.title }}</router-link>
            </li>
          </ul>
        </el-col>
        <el-col :span="4">
          <div class="logo">logo</div>
        </el-col>
        <el-col :span="5">
          <el-popover
            ref="popoverRef"
            :visible="isSearchedMoviesVisible"
            :show-arrow="false"
            width="300px"
            placement="bottom-end"
          >
            <template #reference>
              <the-search :searched-value="currentSearchValue" @search-value="handleMovieSearch" />
            </template>
            <the-search-movie v-for="movie in movies" :key="movie.id" :movie="movie" />
          </el-popover>
        </el-col>
        <el-col v-if="isAuth" :span="2">
          <icon-template class="mr-8" name="favorite" width="32" height="32" />
          <icon-template name="user" width="32" height="32" @click="handleClickLogout" />
        </el-col>
        <el-col v-else :span="2">
          <router-link class="the-header__login" to="/authorization/login"> Вход </router-link>
        </el-col>
      </nav>
    </el-row>
  </header>
</template>

<script lang="ts" setup>
import { headerItems } from '@/constants/header'
import { computed, ref } from 'vue'
import { MovieType } from '@/types/movies.types'
import moviesApi from '@/api/movies/movies.api'
import { onClickOutside } from '@vueuse/core'

const movies = ref<MovieType[] | null>(null)
const isToken = localStorage.getItem('token')
const isAuth = ref<boolean>(!!isToken)
const popoverRef = ref<HTMLDivElement | null>(null)
const currentSearchValue = ref('')

const isSearchedMoviesVisible = computed(() => Boolean(movies.value && !!movies.value.length))

onClickOutside(popoverRef, () => {
  movies.value = []

  currentSearchValue.value = ''
})

const handleClickLogout = (): void => {
  localStorage.clear()

  location.reload()
}

const handleMovieSearch = async (value: string): Promise<void> => {
  currentSearchValue.value = value

  const [error, data] = await moviesApi.getMovies({
    search_value: value,
  })

  if (!error && data) {
    movies.value = data
  }

  if (value === '') {
    movies.value = []
  }
}
</script>

<style lang="scss" scoped>
.the-header {
  padding-top: $size--16;

  &__login {
    width: 100%;
    display: block;
    border-radius: 8px;
    text-align: center;
    color: $color--white;
    background-color: $color--primary;
    padding: 10px 0;
  }
}
</style>
