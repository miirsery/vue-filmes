<template>
  <div class="default-layout">
    <div class="container">
      <div class="hero">
        <the-header />
        <router-view />
      </div>
      <the-footer @open-dialog="feedbackDialogVisibleChange" />
    </div>
    <the-footer-feedback-modal :visible="isFeedbackDialogVisible" @close-dialog="feedbackDialogVisibleChange" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useUserStore } from '@/stores/user.store'
import { onMounted } from 'vue'

const useUser = useUserStore()

const isFeedbackDialogVisible = ref(false)

const feedbackDialogVisibleChange = (): void => {
  isFeedbackDialogVisible.value = !isFeedbackDialogVisible.value
}

// const getSelf = (): void => {
//   useUser.getSelf()
// }
//
// onMounted(() => {
//   getSelf()
// })
</script>

<style lang="scss" scoped>
.hero {
  min-height: 100vh;
}
</style>
