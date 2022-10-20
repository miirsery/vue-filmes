<template>
  <el-form class="user-create-form">
    <el-form-item prop="name">
      <input-common v-model="form.name" placeholder="Enter a name" />
    </el-form-item>
    <el-form-item prop="surname">
      <input-common v-model="form.surname" placeholder="Enter a surname" />
    </el-form-item>
    <el-form-item prop="patronymic">
      <input-common v-model="form.patronymic" placeholder="Enter a patronymic" />
    </el-form-item>
    <el-form-item prop="login">
      <input-common v-model="form.login" placeholder="Enter a login" />
    </el-form-item>
    <el-form-item prop="email">
      <input-common v-model="form.email" placeholder="Enter a email" />
    </el-form-item>
    <el-form-item prop="birthdate">
      <div class="d-flex fd-column">
        <div>birthdate</div>
        <el-date-picker v-model="form.birthdate" format="DD-MM-YYYY" value-format="YYYY-MM-DD" />
      </div>
    </el-form-item>
    <el-form-item prop="role">
      <el-select v-model="form.role" class="m-2" placeholder="Select">
        <el-option v-for="item in roleOptions" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
    </el-form-item>
    <el-form-item prop="password">
      <input-common v-model="form.password" placeholder="Enter a password again" />
    </el-form-item>
    <el-form-item prop="retryPassword">
      <input-common v-model="retryPassword" placeholder="Enter a password again" />
    </el-form-item>
    <div class="d-flex ai-center jc-between">
      <el-button @click="handleCloseDialog">close</el-button>
      <el-button @click="handleCreateUser">Create</el-button>
    </div>
  </el-form>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { UserCreateType } from '@/components/user/UserCreate/user-create.types'
import InputCommon from '@/components/common/InputCommon/InputCommon.vue'
import usersApi from '@/api/users/users.api'

interface IEmits {
  (e: 'close-dialog'): void
  (e: 'update-table'): void
}

const emit = defineEmits<IEmits>()

const roleOptions = [
  {
    label: 'User',
    value: 'user',
  },
  {
    label: 'Admin',
    value: 'admin',
  },
  {
    label: 'Moderator',
    value: 'moderator',
  },
]

const form = reactive<UserCreateType>({
  birthdate: '',
  email: '',
  login: '',
  password: '',
  patronymic: '',
  role: 'user',
  surname: '',
  name: '',
})

const retryPassword = ref('')

const updateTable = (): void => {
  emit('update-table')
}

const handleCloseDialog = (): void => {
  emit('close-dialog')
}

const handleCreateUser = async (): Promise<void> => {
  const [error] = await usersApi.userRegister(form)

  if (!error) {
    handleCloseDialog()

    updateTable()
  }
}
</script>
