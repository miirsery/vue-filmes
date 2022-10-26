<template>
  <div class="users-page w-100">
    <div class="users-page__header d-flex ai-center jc-between mb-16">
      <h1>Users</h1>
      <div class="d-flex ai-center">
        <el-tooltip effect="dark" placement="left" :show-arrow="false">
          <template #content>
            <div v-html="exampleFilePath" />
          </template>
          <div class="users-page__help">
            <icon-template name="question" width="16" height="16" />
          </div>
        </el-tooltip>
        <el-button type="primary" @click="handleUsersLoadVisibleChange">Load users</el-button>
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

    <users-load :visible="isUsersLoadVisible" @close-dialog="handleUsersLoadVisibleChange" />
  </div>
</template>

<script lang="ts" setup>
import UsersTable from '@/components/users/UsersTable.vue'
import UserCreateDialog from '@/components/user/UserCreate/UserCreateDialog.vue'
import InputCommon from '@/components/common/InputCommon/InputCommon.vue'
import { onMounted, ref } from 'vue'
import usersApi from '@/api/users/users.api'
import { UserType } from '@/types/users.types'
import IconTemplate from '@/components/common/IconTemplate.vue'
import UsersLoad from '@/components/users/UsersLoad.vue'

const isUserCreateDialogVisible = ref(false)
const tableLoading = ref(false)
const isUsersLoadVisible = ref(false)
const discount = ref(0)
const users = ref<UserType[]>([])
const exampleFilePath = ref('')

const getExampleFileLink = async (): Promise<void> => {
  const [error, data] = await usersApi.getExampleFile()

  if (!error && data) {
    exampleFilePath.value = data.path
  }
}

const handleUserCreateModalVisibleChange = (): void => {
  isUserCreateDialogVisible.value = !isUserCreateDialogVisible.value
}

const handleUsersLoadVisibleChange = (): void => {
  isUsersLoadVisible.value = !isUsersLoadVisible.value
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

  getExampleFileLink()
})
</script>

<style lang="scss" scoped>
@import '@/styles/resources/mixins';

.users-page {
  &__help {
    @include color('background-color', $color--primary--light-9, 10%);

    width: $size--20;
    height: $size--20;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    margin-right: $size--8;
  }
}
</style>
