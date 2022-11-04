<template>
  <el-dialog title="Choose place" :model-value="props.visible" :before-close="handleCloseDialog" class="choose-place">
    <div class="choose-place__places">
      <choose-place-item v-for="(seat, index) in props.seats" :key="index" :seat="seat" />
    </div>
  </el-dialog>
</template>

<script lang="ts" setup>
import ChoosePlaceItem from '@/components/hall/HallChoose/ChoosePlaceItem.vue'

interface IProps {
  visible: boolean
  seats: any
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
</script>

<style lang="scss" scoped>
.choose-place__places {
  display: flex;
  flex-wrap: wrap;
}
</style>
