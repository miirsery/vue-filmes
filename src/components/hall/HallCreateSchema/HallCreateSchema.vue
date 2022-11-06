<template>
  <div class="hall-create-schema mb-16">
    <div class="hall-create-schema__title">Schema</div>
    <div class="hall-create-schema__content">
      <hall-create-schema-item
        v-for="(item, index) in props.selectedSeats"
        :key="index"
        :seat="item"
        @select-seat="handleSeatSelect"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import HallCreateSchemaItem from '@/components/hall/HallCreateSchema/HallCreateSchemaItem.vue'

interface IProps {
  selectedSeats: any
}

interface IEmits {
  (e: 'seat-select', seat: any): void
}

const props = defineProps<IProps>()
const emit = defineEmits<IEmits>()

const handleSeatSelect = (seat: any): void => {
  emit('seat-select', seat)
}
</script>

<style lang="scss" scoped>
.hall-create-schema {
  width: 100%;
  border: 1px solid $color--border;
  padding: $size--12;

  &__title {
    font-weight: 600;
    font-size: 18px;
    line-height: 22px;
    text-align: center;
  }

  &__content {
    display: flex;
    flex-wrap: wrap;
  }
}
</style>
