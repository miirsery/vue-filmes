<template>
  <el-dialog :model-value="props.visible" :before-close="handleCloseDialog" class="choose-place">
    <div class="mb-16">
      <div class="mb-4"> Choose user </div>
      <el-select v-model="form.user_id" class="mb-16" placeholder="Select user" @focus.once="handleUsersGet">
        <el-option v-for="item in usersOptions" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
    </div>
    <div class="mb-16">
      <div class="mb-4"> Choose employee </div>
      <el-select
        v-model="form.employee_id"
        class="mb-16"
        placeholder="Select employee"
        @focus.once="handleEmployeesGet"
      >
        <el-option v-for="item in employeesOptions" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
    </div>
    <el-button type="primary" @click="handleFormSubmit">Submit</el-button>
  </el-dialog>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import usersApi from '@/api/users/users.api'
import employeesApi from '@/api/employees/employees.api'

interface IProps {
  visible: boolean
}

interface IEmits {
  (e: 'close-dialog'): void
  (e: 'choose-user', users: any): void
}

const props = defineProps<IProps>()
const emit = defineEmits<IEmits>()

const handleFormSubmit = (): void => {
  emit('choose-user', {
    user_id: form.user_id,
    seller_id: form.employee_id,
  })

  handleCloseDialog()
}

const handleCloseDialog = (): void => {
  emit('close-dialog')
}

const usersOptions = ref<any>([])
const employeesOptions = ref<any>([])
const form = reactive<any>({})

const setUsersOptions = (usersData: any): void => {
  usersData.forEach((user: any) => {
    usersOptions.value.push({
      label: `${user.name}`,
      value: user.id,
    })
  })
}

const setEmployeesOptions = (usersData: any): void => {
  usersData.forEach((employee: any) => {
    employeesOptions.value.push({
      label: `${employee.name}`,
      value: employee.id,
    })
  })
}

const handleUsersGet = async (): Promise<void> => {
  const [error, data] = await usersApi.getUsers()

  if (!error && data) {
    const users = data.map((user: any) => ({ id: user.id, name: user.name }))

    await setUsersOptions(users)
  }
}

const handleEmployeesGet = async (): Promise<void> => {
  const [error, data] = await employeesApi.getEmployees()

  if (!error && data) {
    const employees = data.map((employee: any) => ({ id: employee.id, name: employee.name }))

    await setEmployeesOptions(employees)
  }
}
</script>
