<template>
  <div class="cinemas-movie">
    <div class="d-flex">
      <div class="d-flex ai-center">
        <div class="cinemas-movie__movie-image">
          <img :src="props.movie.image" alt="image" />
        </div>
      </div>
      <div class="cinemas-movie__movie-info">
        <div>{{ props.movie.genre }}</div>
        <div>{{ props.movie.title }}</div>
        <div>{{ props.movie.studio }}</div>
        <div>{{ props.movie.duration }}</div>
      </div>
      <div class="cinemas-movie__sessions d-flex">
        <div v-for="session in props.sessions" :key="session.id" class="cinemas-movie__session d-flex fd-column">
          <el-button type="primary">{{ session.time }}</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
interface IProps {
  movie: any
  sessions: any
}

const props = defineProps<IProps>()
</script>

<style lang="scss" scoped>
.cinemas-movie {
  &__movie-image {
    width: 100px;
  }
}
</style>
