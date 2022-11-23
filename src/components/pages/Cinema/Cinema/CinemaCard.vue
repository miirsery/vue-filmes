<template>
  <div class="cinema-card">
    <div class="d-flex mb-16">
      <div class="cinema-card__image">
        <img :src="props.cinema.preview" alt="image" />
        <el-button type="primary" class="cinema-card__favorite-button" @click="handleToFavoriteAdd">
          <icon-template name="star" width="16" height="16" />
        </el-button>
      </div>
      <div class="cinema-card__info">
        <div>
          <div class="cinema-card__title"> {{ props.cinema.title }} </div>
          <div class="cinema-card__phone mb-16"> {{ props.cinema.phone }} </div>
          <div class="cinema-card__description"> {{ props.cinema.description }} </div>
          <div class="cinema-card__age"> {{ props.cinema.description }} </div>
          <age-restriction :age-restriction="props.cinema.age_restriction" />
        </div>
        <router-link class="cinema-card__link link" :to="`/cinemas/${props.cinema.id}`">Check</router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import moviesApi from '@/api/movies/movies.api'

interface IProps {
  cinema: any
}

const props = defineProps<IProps>()

const handleToFavoriteAdd = async (): Promise<void> => {
  const [error] = await moviesApi.addMovieToFavorite(props.cinema.id)

  if (!error) {
    console.log('123')
  }
}
</script>

<style lang="scss" scoped>
.cinema-card {
  padding-bottom: 18px;
  margin-bottom: 16px;

  &__title {
    font-size: 18px;
    line-height: 22px;
  }

  &__image {
    width: 250px;
    height: 250px;
    position: relative;
    margin-right: 16px;

    img {
      height: 100%;
      object-fit: cover;
    }
  }

  &__info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  &__link {
    max-width: 140px;
    border: none;
    border-bottom: 1px solid $color--border;
    border-radius: 0;
    text-align: center;

    &:hover {
      border-bottom: 1px solid #f4f4f4;
    }
  }

  &__description {
    font-size: $size--12;
  }

  &__favorite-button {
    top: 10px;
    right: 10px;
    position: absolute;
  }

  &:not(:last-child) {
    border-bottom: 1px solid $color--border;
  }
}
</style>
