<template>
  <div
    class="choose-place-item"
    :class="[isAnotherPerson && 'busy-another', isSelected && 'active', !props.seat.available ? 'busy' : 'available']"
  >
    <el-popover placement="top" title="Title" :width="200" trigger="hover">
      <div v-if="!props.seat.available">Busy</div>
      <div>Seat {{ props.seat.seat }}</div>
      <template #reference>
        <el-button type="primary" class="choose-place-item__button" @click="handleSeatSelect(props.seat)" />
      </template>
    </el-popover>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useUserStore } from '@/stores/user.store'

interface IProps {
  seat: any
  selectedPlaces: any
}

interface IEmits {
  (e: 'select-seat', seat: number): void
}

const props = defineProps<IProps>()
const emit = defineEmits<IEmits>()
const useUser = useUserStore()

const user = computed(() => useUser.user)

const handleSeatSelect = (seat: any): void => {
  emit('select-seat', seat)
}

const isSelected = computed(() => props.selectedPlaces.map((place: any) => place.seat).indexOf(props.seat.seat) !== -1)
const isAnotherPerson = computed(() => props.seat.user_id !== null && props.seat.user_id !== user.value.id)
</script>

<style lang="scss" scoped>
.choose-place-item {
  width: 40px;
  height: 40px;
  border-radius: 4px;
  margin: 4px;

  &.busy {
    background-color: $color--warning !important;
  }

  &.available {
    background-color: $color--success !important;
  }

  &.busy-another {
    background-color: $color--bg !important;
    pointer-events: none;
  }

  &.active {
    background: #d0b7e5 !important;
  }
}
</style>
