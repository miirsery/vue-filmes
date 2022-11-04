<template>
  <el-form class="hall-create-form">
    <el-form-item prop="user_id">
      <div class="d-flex fd-column">
        <div>Select a movie theater to select the hall from it</div>
        <el-select v-model="form.cinemaId" class="m-2" placeholder="Select" @focus.once="handleCinemasGet">
          <el-option v-for="item in cinemasOptions" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </div>
    </el-form-item>
    <el-form-item>
      <input-common v-model="form.title" type="number" placeholder="Enter a title" />
    </el-form-item>
    <el-form-item>
      <el-button @click="handleChoosePlaceOpen">Choose place</el-button>
    </el-form-item>
    <div class="d-flex ai-center jc-between">
      <el-button @click="handleCloseDialog">close</el-button>
      <el-button @click="handleHallCreate">Create</el-button>
    </div>
  </el-form>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import cinemasApi from '@/api/cinemas/cinemas.api'
import InputCommon from '@/components/common/InputCommon/InputCommon.vue'
import hallsApi from '@/api/halls/halls.api'

interface IEmits {
  (e: 'close-dialog'): void
  (e: 'update-table'): void
  (e: 'choose-place-visible-change'): void
}

const emit = defineEmits<IEmits>()

const cinemasOptions = ref<any>([])

const updateTable = (): void => {
  emit('update-table')
}

const handleCloseDialog = (): void => {
  emit('close-dialog')
}

const handleChoosePlaceOpen = (): void => {
  emit('choose-place-visible-change')
}

const form = reactive<any>({
  cinemaId: '',
  title: 0,
})

const handleCinemasGet = async (): Promise<void> => {
  const [error, data] = await cinemasApi.getCinemas()

  if (!error && data) {
    cinemasOptions.value = data.map((cinema: any) => ({ value: cinema.id, label: cinema.title }))
  }
}

const handleHallCreate = async (): Promise<void> => {
  const [error, data] = await hallsApi.createHall({
    cinema_id: form.cinemaId,
    title: form.title,
  })

  if (!error && data) {
    form.values = {}

    handleCloseDialog()

    updateTable()
  }
}
</script>
