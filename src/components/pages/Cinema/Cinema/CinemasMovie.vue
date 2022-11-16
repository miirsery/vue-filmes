<template>
  <div class="cinemas-movie">
    <div class="d-flex mt-16">
      <div class="d-flex ai-center">
        <div class="cinemas-movie__movie-image">
          <img :src="props.movie.preview" alt="image" />
        </div>
      </div>
      <div class="cinemas-movie__movie-info">
        <div>{{ props.movie.genre }}</div>
        <div>{{ props.movie.title }}</div>
        <div>{{ props.movie.studio }}</div>
        <div>{{ props.movie.duration }}</div>
      </div>
      <div class="cinemas-movie__sessions d-flex">
        <div
          v-for="session in props.movie.sessions"
          :key="session.id"
          class="cinemas-movie__session d-flex fd-column ta-center"
        >
          <el-button class="cinemas-movie__session-button" type="primary" @click="setCurrentSession(session.id)">
            {{ session.time }}
          </el-button>
          <div class="cinemas-movie__session-price">350 Р</div>
        </div>
      </div>
    </div>

    <choose-place-dialog
      :visible="isChoosePlaceVisible"
      :cinema="props.cinema"
      :session-id="currentSession"
      @close-dialog="handleChoosePlaceVisibleChange"
    />
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'

interface IProps {
  movie: any
  cinema: any
}

const props = defineProps<IProps>()

const currentSession = ref('')

const isChoosePlaceVisible = ref(false)

const form = reactive<any>({
  movie_id: props.movie.id,
})

const setCurrentSession = (sessionId: any): void => {
  currentSession.value = sessionId

  handleChoosePlaceVisibleChange()
}

const handleChoosePlaceVisibleChange = (): void => {
  isChoosePlaceVisible.value = !isChoosePlaceVisible.value
}
</script>

<style lang="scss" scoped>
.cinemas-movie {
  &__movie {
    &-image {
      width: 100px;
    }

    &-info {
      width: 100%;
      max-width: 350px;
      margin-left: 16px;
    }
  }

  &__session {
    margin-left: 16px;

    &-price {
      font-size: 12px;
      margin-top: 8px;
    }
  }
}
</style>
