<template>
  <div class="ticket-result">
    <div class="ticket-result__preview">
      <img :src="props.movie.preview" alt="movie" />
      <div class="ticket-result__preview-header d-flex ai-center">
        <div class="ticket-result__title mr-8"> {{ props.movie.title }} </div>
        <age-restriction :age-restriction="props.movie.age_restriction" />
      </div>
    </div>
    <div v-for="(place, index) in seats" :key="index" class="ticket-result__seat">
      <div>{{ index + 1 }} ticket</div>
      <div class="ticket-result__row d-flex ai-center jc-center">
        <div> {{ place.y_position }} row, {{ place.x_position }} place</div>
        <div class="ticket-result__dots" />
        <div>{{ props.session.price }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
interface IProps {
  movie: any
  seats: any
  session: any
}

const props = defineProps<IProps>()
</script>

<style lang="scss" scoped>
@import '@/styles/resources/mixins';

.ticket-result {
  width: 100%;
  max-width: 300px;

  &__preview {
    height: 120px;
    position: relative;
    margin-bottom: $size--16;
    z-index: 2;

    &-header {
      top: $size--8;
      left: $size--8;
      position: absolute;
    }

    &-footer {
      left: $size--8;
      bottom: $size--8;
      position: absolute;
    }

    img {
      width: 100%;
      object-fit: cover;
      opacity: 0.4;
    }
  }

  &__dots {
    height: 1px;
    flex: 1;
    border-bottom: 2px dotted $color--border;
    margin: 0 $size--4;
  }

  &__seat {
    margin-bottom: $size--16;
  }
}
</style>
