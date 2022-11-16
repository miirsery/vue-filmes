<template>
  <el-dialog
    class="the-footer-dialog"
    :model-value="props.visible"
    :before-close="handleCloseDialog"
    title="Оставьте отзыв или пожеланиек"
    align-center
  >
    <input-common :value="text" placeholder="Пишите здесь" />
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

interface IProps {
  visible: boolean
}

interface IEmits {
  (e: 'close-dialog'): void
}

const props = defineProps<IProps>()
const emit = defineEmits<IEmits>()

const text = ref('')

const handleCloseDialog = (): void => {
  emit('close-dialog')
}
</script>
