<template>
  <el-dialog title="Choose place" :model-value="props.visible" :before-close="handleCloseDialog" class="choose-place">
    <div class="d-flex ai-center jc-between">
      <div>
        <el-select v-model="form.movie_id" class="mb-16 mr-8" placeholder="Select movie" @focus.once="handleMoviesGet">
          <el-option v-for="item in moviesOptions" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
        <el-select
          v-model="form.sessions_id"
          class="mb-16"
          placeholder="Select movie"
          @focus.once="handleSessionsGet"
          @change="getSchema"
        >
          <el-option v-for="item in sessionsOptions" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </div>
      <el-button type="primary" :disabled="isCreateDisabled" @click="handleTicketCreate">Create ticket</el-button>
    </div>
    <div v-if="!schema.length"> Choose a <strong>session</strong> for displaying schema of hall </div>
    <div v-else>
      <div class="d-flex">
        <div v-for="(_, index) in new Array(18)" :key="index" class="choose-place__place-empty number">{{ index }}</div>
      </div>
      <div class="d-flex">
        <div class="d-flex fd-column">
          <div v-for="(_, index) in new Array(18)" :key="index" class="choose-place__place-empty number col">
            {{ index + 1 }}
          </div>
        </div>
        <div class="choose-place__places">
          <el-row v-for="(seatsY, indexY) in schema" :key="indexY" class="w-100">
            <el-row v-if="+seatsY.row - 1 === indexY" class="w-100">
              <div v-for="(seat, index) in seatsY.seats" :key="index">
                <choose-place-item v-if="seat.x_position - 1 === index" :seat="seat" />
                <el-row v-else class="w-100">
                  <div
                    v-for="(_, idx) in calculateEmptyColumnsCount(seat)"
                    :key="idx"
                    class="choose-place__place-empty"
                  />
                  <el-col :span="calculateEmptyColumnsCount(seat) / 24">
                    <choose-place-item :seat="seat" />
                  </el-col>
                </el-row>
              </div>
            </el-row>
            <el-col v-else class="w-100">
              <div
                v-for="(_, idx) in calculateEmptyRowsCount(schema, indexY)"
                :key="idx"
                class="choose-place__place-empty"
              />
              <el-row class="w-100">
                <el-col v-for="(seat, index) in seatsY.seats" :key="index" :span="seatsY.seats.length / 24">
                  <choose-place-item v-if="+seat.x_position - 1 === index" :seat="seat" />
                  <el-row v-else class="w-100">
                    <div
                      v-for="(_, idx) in calculateEmptyColumnsCount(seat)"
                      :key="idx"
                      class="choose-place__place-empty"
                    />
                    <el-col :span="calculateEmptyColumnsCount(seat) / 24">
                      <choose-place-item :seat="seat" />
                    </el-col>
                  </el-row>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
  </el-dialog>
</template>

<script lang="ts" setup>
import ChoosePlaceItem from '@/components/hall/HallChoose/ChoosePlaceItem.vue'
import { SeatsSchemaType, SeatType } from '@/types/hall.types'
import { computed, reactive, ref } from 'vue'
import moviesApi from '@/api/movies/movies.api'
import sessionsApi from '@/api/sessions/sessions.api'
import hallsApi from '@/api/halls/halls.api'

interface IProps {
  visible: boolean
}

interface IEmits {
  (e: 'close-dialog'): void
  (e: 'update-table'): void
}

const props = defineProps<IProps>()
const emit = defineEmits<IEmits>()

const handleCloseDialog = (): void => {
  emit('close-dialog')
}

let lastElement = 0
let lastSeat: SeatType | null = null
const moviesOptions = ref<any>([])
const sessionsOptions = ref<any>([])
const form = reactive<any>({})
const schema = ref<SeatsSchemaType[]>([])
const selectedPlaces = ref<any>([])

const isCreateDisabled = computed(() => !selectedPlaces.value.length)

const calculateEmptyColumnsCount = (seat: SeatType): number | void => {
  if (!lastSeat) {
    lastSeat = seat
  } else if (lastSeat.id !== seat.id) {
    lastElement = lastSeat.x_position

    lastSeat = seat
  }

  const result = seat.x_position - (lastElement + 1)

  if (result <= 0) {
    return
  }

  return result
}

const calculateEmptyRowsCount = (data: any, index: number): any => {
  lastElement = 0

  lastSeat = null

  const result = +data[index].row - index - 1

  if (result <= 0) {
    return
  }

  return result
}

const setMoviesOptions = (moviesData: any): void => {
  moviesData.forEach((movie: any) => {
    moviesOptions.value.push({
      label: `${movie.title}`,
      value: movie.id,
    })
  })
}

const setSessionsOptions = async (moviesData: any): Promise<void> => {
  moviesData.forEach((sessions: any) => {
    sessionsOptions.value.push({
      label: `session: ${sessions.id}`,
      value: sessions.id,
    })
  })
}

const getSchema = async (): Promise<void> => {
  const [error, data] = await hallsApi.getSchema()

  if (!error && data) {
    schema.value = data
  }
}

const handleMoviesGet = async (): Promise<void> => {
  const [error, data] = await moviesApi.getMovies()

  if (!error && data) {
    const movies = data.map((movie: any) => ({ id: movie.id, title: movie.title }))

    await setMoviesOptions(movies)
  }
}

const handleSessionsGet = async (): Promise<void> => {
  const [error, data] = await sessionsApi.getSessions()

  if (!error && data) {
    const sessions = data.map((movie: any) => ({ id: movie.id, title: movie.title }))

    await setSessionsOptions(sessions)
  }
}

const handleTicketCreate = async (): Promise<void> => {
  console.log(form)
}
</script>

<style lang="scss" scoped>
.choose-place {
  &__place-empty {
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 4px;

    &.number {
      text-align: center;
      margin: 4px;

      &.col {
        display: flex;
        align-items: center;
        justify-content: center;

        &:first-child {
          margin-top: 0;
        }
      }
    }
  }
}
</style>
