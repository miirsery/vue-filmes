<template>
  <div class="hall-create-schema-item" :class="{ 'is-selected': props.seat.have }">
    <el-button class="hall-create-schema-item__button" @click="handleSeatSelect(props.seat)">
      <icon-template v-if="!props.seat.have" name="plus" width="16" height="16" />
    </el-button>
  </div>
</template>

<script lang="ts" setup>
import IconTemplate from '@/components/common/IconTemplate.vue'

interface IProps {
  seat: any
}

interface IEmits {
  (e: 'select-seat', seat: any): void
}
const props = defineProps<IProps>()
const emit = defineEmits<IEmits>()

const handleSeatSelect = (seat: any): void => {
  emit(
    'select-seat',
    Object.assign(seat, {
      have: true,
      seat: seat.id_in_hall,
    })
  )
}
</script>

<style lang="scss" scoped>
@import '@/styles/resources/mixins';

.hall-create-schema-item {
  width: $size--24;
  height: $size--24;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px dashed $color--border;
  border-radius: 4px;
  cursor: pointer;
  margin: 8px;

  &:hover {
    @include color('background-color', $color--border, 10%, -0.9);
  }

  &.is-selected {
    border: none;
    background-color: $color--success;
  }
}
</style>
