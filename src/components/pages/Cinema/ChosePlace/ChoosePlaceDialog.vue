<template>
  <el-dialog title="Choose place" :model-value="props.visible" :before-close="handleCloseDialog" class="choose-place">
    <div v-if="!isBuyTicketShow">
      <div class="d-flex ai-center jc-between">
        <div class="d-flex fd-column ai-center mb-16">
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
        </div>
        <el-button type="primary" :disabled="isNextStepButtonDisabled" @click="handleBuyTicketShowChange">
          Next
        </el-button>
      </div>
      <div v-if="!schema.length"> Choose a <strong>session</strong> for displaying schema of hall </div>
      <div v-else>
        <div class="d-flex">
          <div v-for="(_, index) in new Array(18)" :key="index" class="choose-place__place-empty number">
            {{ index }}
          </div>
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
                    :selected-places="selectedPlaces"
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
                        :selected-places="selectedPlaces"
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
                      :selected-places="selectedPlaces"
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
                          :selected-places="selectedPlaces"
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
    </div>

    <buy-ticket v-else @buy-ticket="handleTicketCreate" />
  </el-dialog>
</template>

<script lang="ts" setup>
import { computed, reactive, ref } from 'vue'
import hallsApi from '@/api/halls/halls.api'
import ticketsApi from '@/api/tickets/tickets.api'
import { useUserStore } from '@/stores/user.store'

interface IProps {
  visible: boolean
  cinema: any
  sessionId: any
}

interface IEmits {
  (e: 'close-dialog'): void
}

const props = defineProps<IProps>()
const emit = defineEmits<IEmits>()

const handleCloseDialog = (): void => {
  chosePlaceForm.hallId = ''

  schema.value = []

  emit('close-dialog')
}

const useUser = useUserStore()

let lastElement = 0
let lastSeat: any | null = null

const cinemasOptions = computed(() => [{ label: props.cinema.title, value: props.cinema.id }])
const user = computed(() => useUser.user)
const currentSessionId = computed(() => props.sessionId)

const chosePlaceForm = reactive<any>({
  hallId: '',
  price: 250,
  user,
})
const schema = ref<any[]>([])
// TODO: Сделать выбор нескольких мест
const selectedPlaces = ref<any>([])
const hallsOptions = ref<any>([])
const isChooseUserShow = ref(false)
const isBuyTicketShow = ref(false)

const isNextStepButtonDisabled = computed(() => !selectedPlaces.value.length)

const handleChooseUserVisibleChange = (): void => {
  isChooseUserShow.value = !isChooseUserShow.value
}

const handleBuyTicketShowChange = (): void => {
  isBuyTicketShow.value = !isBuyTicketShow.value
}

const handleSeatSelect = (seat: number): void => {
  chosePlaceForm.seat = seat

  const seatIndex = selectedPlaces.value.findIndex((item: any) => item === seat)

  if (seatIndex !== -1) {
    selectedPlaces.value.splice(seatIndex, 1)
  } else {
    selectedPlaces.value.push(seat)
  }
}

const calculateEmptyColumnsCount = (seat: any): number | void => {
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

const setHallsOptions = (hallsData: any): void => {
  hallsData.forEach((hall: any) => {
    hallsOptions.value.push({
      label: `hall: ${hall.title}`,
      value: hall.id,
    })
  })
}

const getSchema = async (): Promise<void> => {
  const [error, data] = await hallsApi.getSchema(+chosePlaceForm.hallId, +currentSessionId.value)

  if (!error && data) {
    schema.value = data
  }
}

const handleHallsGet = async (): Promise<void> => {
  const [error, data] = await hallsApi.getHalls(props.cinema.id)

  if (!error && data) {
    const halls = data.map((hall: any) => ({ id: hall.id, title: hall.title }))

    await setHallsOptions(halls)
  }
}

const handleTicketCreate = async (paymentData: any): Promise<void> => {
  const [error, data] = await ticketsApi.createTicket(
    Object.assign(
      {
        user_id: chosePlaceForm.user.id,
        seat: chosePlaceForm.seat,
        price: chosePlaceForm.price,
        hall_id: chosePlaceForm.hallId,
        session_id: currentSessionId.value,
        seller_id: 1,
      },
      paymentData
    )
  )

  if (!error && data) {
    await getSchema()
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
