<template>
  <el-dialog title="Choose place" :model-value="props.visible" :before-close="handleCloseDialog" class="choose-place">
    <div class="d-flex ai-center jc-between">
      <div class="d-flex fd-column ai-center mb-16">
        <el-select
          v-model="chosePlaceForm.cinemaId"
          class="mb-16"
          placeholder="Select cinema"
          @focus.once="handleCinemasGet"
        >
          <el-option v-for="item in cinemasOptions" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
        <el-select
          v-model="chosePlaceForm.hallId"
          class="mb-16"
          placeholder="Select hall"
          :disabled="!cinemasOptions.length"
          @focus.once="handleHallsGet"
          @change="getSchema"
        >
          <el-option v-for="item in hallsOptions" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
        <el-select
          v-model="chosePlaceForm.movie_id"
          class="mb-16"
          placeholder="Select movie"
          @focus.once="handleMoviesGet"
        >
          <el-option v-for="item in moviesOptions" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
        <el-select
          v-model="chosePlaceForm.session_id"
          class="mb-16"
          placeholder="Select session"
          @focus.once="handleSessionsGet"
          @change="getSchema"
        >
          <el-option v-for="item in sessionsOptions" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
        <input-common v-model="chosePlaceForm.price" placeholder="Enter a price" type="number" />
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
                <choose-place-item
                  v-if="seat.x_position - 1 === index"
                  :seat="seat"
                  @click="handleChooseUserVisibleChange"
                  @select-seat="handleSeatSelect"
                />
                <el-row v-else class="w-100">
                  <div
                    v-for="(_, idx) in calculateEmptyColumnsCount(seat)"
                    :key="idx"
                    class="choose-place__place-empty"
                  />
                  <el-col :span="calculateEmptyColumnsCount(seat) / 24">
                    <choose-place-item
                      :seat="seat"
                      @click="handleChooseUserVisibleChange"
                      @select-seat="handleSeatSelect"
                    />
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
                  <choose-place-item
                    v-if="+seat.x_position - 1 === index"
                    :seat="seat"
                    @click="handleChooseUserVisibleChange"
                    @select-seat="handleSeatSelect"
                  />
                  <el-row v-else class="w-100">
                    <div
                      v-for="(_, idx) in calculateEmptyColumnsCount(seat)"
                      :key="idx"
                      class="choose-place__place-empty"
                    />
                    <el-col :span="calculateEmptyColumnsCount(seat) / 24">
                      <choose-place-item
                        :seat="seat"
                        @click="handleChooseUserVisibleChange"
                        @select-seat="handleSeatSelect"
                      />
                    </el-col>
                  </el-row>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>

    <choose-user-dialog
      :visible="isChooseUserShow"
      @choose-user="handleUsersSet"
      @close-dialog="handleChooseUserVisibleChange"
    />
  </el-dialog>
</template>

<script lang="ts" setup>
import ChoosePlaceItem from '@/components/hall/HallChoose/ChoosePlaceItem.vue'
import { SeatsSchemaType, SeatType } from '@/types/hall.types'
import { computed, reactive, ref } from 'vue'
import moviesApi from '@/api/movies/movies.api'
import sessionsApi from '@/api/sessions/sessions.api'
import hallsApi from '@/api/halls/halls.api'
import ChooseUserDialog from '@/components/user/ChooseUser/ChooseUserDialog.vue'
import InputCommon from '@/components/common/InputCommon/InputCommon.vue'
import ticketsApi from '@/api/tickets/tickets.api'
import cinemasApi from '@/api/cinemas/cinemas.api'

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

const updateTable = (): void => {
  emit('update-table')
}

let lastElement = 0
let lastSeat: SeatType | null = null

const moviesOptions = ref<any>([])
const sessionsOptions = ref<any>([])
const cinemasOptions = ref<any>([])
const chosePlaceForm = reactive<any>({
  hallId: '',
})
const schema = ref<SeatsSchemaType[]>([])
const selectedPlaces = ref<any>([])
const hallsOptions = ref<any>([])
const isChooseUserShow = ref(false)

const isCreateDisabled = computed(() => !selectedPlaces.value.length)

const handleChooseUserVisibleChange = (): void => {
  isChooseUserShow.value = !isChooseUserShow.value
}

const handleSeatSelect = (seat: number): void => {
  chosePlaceForm.seat = seat
}

const handleUsersSet = (data: any): void => {
  Object.entries(data).forEach(([key, value]) => {
    chosePlaceForm[key] = value
  })

  selectedPlaces.value.push({
    user_id: chosePlaceForm.user_id,
    seller_id: chosePlaceForm.seller_id,
  })
}

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

const setSessionsOptions = async (sessionsData: any): Promise<void> => {
  sessionsData.forEach((session: any) => {
    sessionsOptions.value.push({
      label: `session: ${session.id}`,
      value: session.id,
    })
  })
}

const setHallsOptions = (hallsData: any): void => {
  hallsData.forEach((hall: any) => {
    hallsOptions.value.push({
      label: `hall: ${hall.title}`,
      value: hall.id,
    })
  })
}

const setCinemasOptions = (cinemasData: any): void => {
  cinemasData.forEach((cinema: any) => {
    cinemasOptions.value.push({
      label: `cinema: ${cinema.title}`,
      value: cinema.id,
    })
  })
}

const getSchema = async (): Promise<void> => {
  const [error, data] = await hallsApi.getSchema(+chosePlaceForm.hallId)

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
  const [error, data] = await ticketsApi.createTicket({
    seat: chosePlaceForm.seat,
    price: +chosePlaceForm.price,
    session_id: chosePlaceForm.session_id,
    seller_id: chosePlaceForm.seller_id,
    user_id: chosePlaceForm.user_id,
  })

  if (!error && data) {
    await getSchema()

    await updateTable()
  }
}

const handleHallsGet = async (): Promise<void> => {
  const [error, data] = await hallsApi.getHalls(chosePlaceForm.cinemaId)

  if (!error && data) {
    const halls = data.map((hall: any) => ({ id: hall.id, title: hall.title }))

    await setHallsOptions(halls)
  }
}

const handleCinemasGet = async (): Promise<void> => {
  const [error, data] = await cinemasApi.getCinemas()

  if (!error && data) {
    const cinemas = data.map((cinema: any) => ({ id: cinema.id, title: cinema.title }))

    await setCinemasOptions(cinemas)
  }
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
