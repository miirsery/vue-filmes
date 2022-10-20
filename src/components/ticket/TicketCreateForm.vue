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
      <el-select v-model="form.sellerId" class="m-2" placeholder="Select employee" @focus.once="handleSellersGet">
        <el-option v-for="item in employeesOptions" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
    </el-form-item>
    <el-form-item prop="userId">
      <el-select v-model="form.userId" class="m-2" placeholder="Select user" @focus.once="handleGetUsers">
        <el-option v-for="item in userOptions" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
    </el-form-item>
    <el-form-item prop="movie_id">
      <el-select v-model="form.movie_id" class="m-2" placeholder="Select movie" @focus.once="handleMoviesGet">
        <el-option v-for="item in moviesOptions" :key="item.value" :label="item.label" :value="item.value" />
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
import moviesApi from '@/api/movies/movies.api'
import employeesApi from '@/api/employees/employees.api'

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
  movie_id: '',
})

const userOptions = ref<any>([])
const moviesOptions = ref<any>([])
const employeesOptions = ref<any>([])

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
    movie_id: form.movie_id,
  })

  if (!error) {
    handleCloseDialog()

    updateTable()
  }
}

const setUserOptions = (usersData: any): void => {
  usersData.forEach((user: any) => {
    userOptions.value.push({
      label: `${user.name}`,
      value: user.id,
    })
  })
}

const setMoviesOptions = (moviesData: any): void => {
  moviesData.forEach((movie: any) => {
    moviesOptions.value.push({
      label: `${movie.title}`,
      value: movie.id,
    })
  })
}

const setEmployeesOptions = (employeesData: any): void => {
  employeesData.forEach((employee: any) => {
    employeesOptions.value.push({
      label: `${employee.name}`,
      value: employee.id,
    })
  })
}

const handleGetUsers = async (): Promise<void> => {
  const [error, data] = await usersApi.getUsers()

  if (!error && data) {
    const usersData = data.map((user: UserType) => ({ id: user.id, name: user.name }))

    await setUserOptions(usersData)
  }
}

const handleMoviesGet = async (): Promise<void> => {
  const [error, data] = await moviesApi.getMovies()

  if (!error && data) {
    const movies = data.map((movie: any) => ({ id: movie.id, title: movie.title }))

    await setMoviesOptions(movies)
  }
}

const handleSellersGet = async (): Promise<void> => {
  const [error, data] = await employeesApi.getEmployees()

  if (!error && data) {
    const employees = data.map((employee: any) => ({ id: employee.id, name: employee.name }))

    await setEmployeesOptions(employees)
  }
}
</script>
