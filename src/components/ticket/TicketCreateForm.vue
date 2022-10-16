<template>
  <el-form class="ticket-create-form">
    <el-form-item prop="seat">
      <input-common v-model="form.seat" placeholder="Enter a seat" />
    </el-form-item>
    <el-form-item prop="price">
      <input-common v-model="form.price" placeholder="Enter a price" />
    </el-form-item>
    <el-form-item prop="session_id">
      <input-common v-model="form.session_id" placeholder="Enter a session id" />
    </el-form-item>
    <el-form-item prop="sellerId">
      <input-common v-model="form.sellerId" placeholder="Enter a seller id" />
    </el-form-item>
    <el-form-item prop="userId">
      <el-select v-model="form.userId" class="m-2" placeholder="Select" @focus.once="handleGetUsers">
        <el-option v-for="item in userOptions" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
    </el-form-item>
    <div class="d-flex ai-center jc-between">
      <el-button @click="handleCloseDialog">close</el-button>
      <el-button @click="handleTicketCreate">Create</el-button>
    </div>
  </el-form>
</template>

<script lang="ts" setup>
import InputCommon from '@/components/common/InputCommon/InputCommon.vue'
import { reactive, ref } from 'vue'
import ticketsApi from '@/api/tickets/tickets.api'
import { UserType } from '@/types/users.types'
import usersApi from '@/api/users/users.api'

interface IEmits {
  (e: 'close-dialog'): void
  (e: 'update-table'): void
}

const emit = defineEmits<IEmits>()

const form = reactive({
  session_id: '',
  seat: '',
  price: '',
  sellerId: '',
  userId: null,
})

const userOptions = ref<any>([])

const updateTable = (): void => {
  emit('update-table')
}

const handleCloseDialog = (): void => {
  emit('close-dialog')
}

const handleTicketCreate = async (): Promise<void> => {
  const [error] = await ticketsApi.createTicket({
    session_id: +form.session_id,
    seat: +form.seat,
    price: +form.price,
    seller_id: +form.sellerId,
    user_id: form.userId,
  })

  if (!error) {
    handleCloseDialog()

    updateTable()
  }
}

const setUserOptions = (usersIds: number[]): void => {
  usersIds.forEach((id) => {
    userOptions.value.push({
      label: `user - ${id}`,
      value: id,
    })
  })
}

const handleGetUsers = async (): Promise<void> => {
  const [error, data] = await usersApi.getUsers()

  if (!error && data) {
    const userIds = data.map((user: UserType) => user.id)

    await setUserOptions(userIds)
  }
}
</script>
