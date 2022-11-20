<template>
  <footer class="footer">
    <el-row>
      <el-col :span="12">
        <nav>
          <ul class="d-flex">
            <li v-for="item in footerItems" :key="item.title">
              {{ item.title }}
            </li>
            <li>
              <div @click="handleClickFeedbackDialogVisibleChange">Feedback</div>
            </li>
          </ul>
        </nav>
      </el-col>
    </el-row>
  </footer>
</template>

<script lang="ts" setup>
import { footerItems } from '@/constants/footer'

interface IEmits {
  (e: 'open-dialog'): void
}

const emit = defineEmits<IEmits>()

const handleClickFeedbackDialogVisibleChange = (): void => {
  emit('open-dialog')
}
</script>
