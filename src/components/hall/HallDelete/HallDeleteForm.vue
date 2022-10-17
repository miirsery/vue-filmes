<template>
  <el-form class="hall-delete-form">
    <el-form-item prop="user_id">
      <div class="d-flex fd-column">
        <div>Select a movie theater to remove the hall from it</div>
        <el-select
          v-model="form.cinema_id"
          class="m-2"
          placeholder="Select"
          @focus.once="handleCinemasGet"
          @change="handleAvailableTicketsGet"
        >
          <el-option v-for="item in cinemasOptions" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </div>
    </el-form-item>
    <el-form-item prop="user_id">
      <div class="d-flex fd-column">
        <div>Select a hall</div>
        <el-select v-model="form.hall_id" class="m-2" placeholder="Select">
          <el-option v-for="item in hallsOptions" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </div>
    </el-form-item>
    <div class="d-flex ai-center jc-between">
      <el-button @click="handleCloseDialog">close</el-button>
      <el-button @click="handleHallDelete">Remove</el-button>
    </div>
  </el-form>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import cinemasApi from '@/api/cinemas/cinemas.api'
import hallsApi from '@/api/halls/halls.api'

interface IEmits {
  (e: 'close-dialog'): void
  (e: 'update-table'): void
}

const emit = defineEmits<IEmits>()

const cinemasOptions = ref<any>([])
const hallsOptions = ref<any>([])

const updateTable = (): void => {
  emit('update-table')
}

const handleCloseDialog = (): void => {
  emit('close-dialog')
}

const form = reactive<any>({
  cinema_id: 0,
  hall_id: 0,
})

const handleCinemasGet = async (): Promise<void> => {
  const [error, data] = await cinemasApi.getCinemas()

  if (!error && data) {
    cinemasOptions.value = data.map((cinema: any) => ({ value: cinema.id, label: cinema.title }))
  }
}

const handleAvailableTicketsGet = async (): Promise<void> => {
  const [error, data] = await hallsApi.getHalls({
    cinema_id: form.cinema_id,
  })

  if (!error && data) {
    hallsOptions.value = data.map((hall: any) => ({ value: hall.id, label: `title - ${hall.title}` }))
  }
}

const handleHallDelete = async (): Promise<void> => {
  const [error] = await hallsApi.deleteHall(form.hall_id)

  if (!error) {
    handleCloseDialog()

    updateTable()
  }
}
</script>
