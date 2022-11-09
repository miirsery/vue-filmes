<template>
  <div class="the-search-dropdown">
    <the-search-dropdown-item v-for="movie in props.movies" :key="movie.id" />
  </div>
</template>

<script lang="ts" setup>
import { MovieType } from '@/components/layouts/TheHeader/TheSearchDropdown/TheSearchDropdownItem.types'

interface IMovie {
  movies: MovieType[]
}

const props = withDefaults(defineProps<IMovie>(), {})
</script>
