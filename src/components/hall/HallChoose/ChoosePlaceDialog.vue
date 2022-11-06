<template>
  <el-dialog title="Choose place" :model-value="props.visible" :before-close="handleCloseDialog" class="choose-place">
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
        <el-row v-for="(seatsY, indexY) in props.seats" :key="indexY" class="w-100 mb-16">
          <el-row v-if="+seatsY.row - 1 === indexY" class="w-100">
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
          <el-col v-else class="w-100">
            <div
              v-for="(_, idx) in calculateEmptyRowsCount(props.seats, indexY)"
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
  </el-dialog>
</template>

<script lang="ts" setup>
import ChoosePlaceItem from '@/components/hall/HallChoose/ChoosePlaceItem.vue'
import { SeatsSchemaType, SeatType } from '@/types/hall.types'

interface IProps {
  visible: boolean
  seats: SeatsSchemaType
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

// TODO: Неправильная генерация пустых клеток. Там, где должен стоять 5-ый, пустая клетка
// А на месте 6-ого 5-ый элемент
const calculateEmptyColumnsCount = (seat: SeatType): number | void => {
  if (!lastSeat) {
    lastSeat = seat
  } else if (lastSeat.id !== seat.id) {
    lastElement = +lastSeat.x_position

    lastSeat = seat
  }

  const result = +seat.x_position - (lastElement + 2)

  if (result <= 0) {
    return
  }

  return result
}

const calculateEmptyRowsCount = (data: any, index: number): any => {
  // const row = data.map((item: any) => item.row)

  lastElement = 0

  lastSeat = null

  const result = +data[index].row - index - 1

  console.log(result)

  if (result <= 0) {
    return
  }

  return result
}
</script>

<style lang="scss" scoped>
.choose-place {
  &__place-empty {
    width: 40px;
    height: 40px;
    margin: 0 8px;

    &.number {
      text-align: center;
      margin: 8px;

      &.col {
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 4px 8px;

        &:first-child {
          margin-top: 0;
        }
      }
    }
  }
}
</style>
