<template>
  <div
    class="choose-place-item"
    :class="[{ 'place-hidden': !props.seat.have }, !props.seat.available ? 'busy' : 'available']"
  >
    <el-popover placement="top" title="Title" :width="200" trigger="hover">
      <div v-if="!props.seat.available">Busy</div>
      <div>Seat {{ props.seat.seat }}</div>
      <template #reference>
        <el-button class="choose-place-item__button" @click="handleSeatSelect(props.seat.seat)" />
      </template>
    </el-popover>
  </div>
</template>

<script lang="ts" setup>
interface IProps {
  seat: any
}

interface IEmits {
  (e: 'select-seat', seat: number): void
}

const props = defineProps<IProps>()
const emit = defineEmits<IEmits>()

const handleSeatSelect = (seat: number): void => {
  emit('select-seat', seat)
}
</script>

<style lang="scss" scoped>
.choose-place-item {
  width: 40px;
  height: 40px;
  border-radius: 4px;
  margin: 4px;

  &.busy {
    background-color: $color--warning;
  }

  &.available {
    background-color: $color--success;
  }
}
</style>
