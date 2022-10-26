<template>
  <div class="users-load">
    <el-dialog title="User create" :model-value="props.visible" :before-close="handleCloseDialog" width="550px">
      <el-upload
        ref="upload"
        action=""
        :auto-upload="false"
        :on-change="handlePreviewSet"
        :file-list="usersFile ? [usersFile] : []"
        accept=".xlsx"
      >
        <el-button type="primary">Click to upload</el-button>
      </el-upload>
      <div class="d-flex ai-center jc-between">
        <el-button @click="handleCloseDialog">close</el-button>
        <el-button type="primary" @click="handleUsersLoad">Load users</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { FileType } from '@/types/common.types'
import usersApi from '@/api/users/users.api'
import { ref } from 'vue'

interface IProps {
  visible: boolean
}

interface IEmits {
  (e: 'close-dialog'): void
}

const props = defineProps<IProps>()
const emit = defineEmits<IEmits>()

const usersFile = ref<any>(null)

const handleCloseDialog = (): void => {
  emit('close-dialog')
}

const handlePreviewSet = (image: FileType): void => {
  if (image) {
    usersFile.value = [image]
  }
}

const handleUsersLoad = async (): Promise<void> => {
  const formData = new FormData()

  if (usersFile.value && usersFile.value[0].raw) {
    formData.append('users', usersFile.value[0].raw)

    await usersApi.addUsersGroup(formData)

    usersFile.value = []

    handleCloseDialog()
  }
}
</script>
