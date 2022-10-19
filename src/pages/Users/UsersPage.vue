<template>
  <div class="users-page w-100">
    <div class="users-page__header d-flex ai-center jc-between">
      <h1>Users</h1>
      <div class="d-flex ai-center">
        <el-tooltip effect="dark" placement="left">
          <template #content>
            <input-common v-model="discount" placeholder="enter a amount" />
          </template>
          <el-button type="primary" @click="handleDiscountSet">Set discount</el-button>
        </el-tooltip>
        <el-button type="primary" @click="handleUserCreateModalVisibleChange">Create user</el-button>
      </div>
    </div>

    <users-table :users="users" :loading="tableLoading" @update-table="getUsers" />

    <user-create-dialog
      :visible="isUserCreateDialogVisible"
      @close-dialog="handleUserCreateModalVisibleChange"
      @update-table="getUsers"
    />
  </div>
</template>

<script lang="ts" setup>
import UsersTable from '@/components/users/UsersTable.vue'
import UserCreateDialog from '@/components/user/UserCreate/UserCreateDialog.vue'
import InputCommon from '@/components/common/InputCommon/InputCommon.vue'
import { onMounted, ref } from 'vue'
import usersApi from '@/api/users/users.api'
import { UserType } from '@/types/users.types'

const isUserCreateDialogVisible = ref(false)
const tableLoading = ref(false)
const discount = ref(0)
const users = ref<UserType[]>([])

const handleUserCreateModalVisibleChange = (): void => {
  isUserCreateDialogVisible.value = !isUserCreateDialogVisible.value
}

const getUsers = async (): Promise<void> => {
  tableLoading.value = true

  const [error, data] = await usersApi.getUsers()

  if (!error && data) {
    users.value = data
  }

  tableLoading.value = false
}

const handleDiscountSet = async (): Promise<void> => {
  const [error, data] = await usersApi.setDiscount(+discount.value)

  if (!error && data) {
    await getUsers()
  }
}

onMounted(() => {
  getUsers()
})
</script>
