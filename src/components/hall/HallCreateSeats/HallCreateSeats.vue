<template>
  <el-dialog title="Hall create" :model-value="props.visible" :before-close="handleCloseDialog">
    <div class="d-flex fd-column mb-16">
      <div>Select a movie theater to select the hall from it</div>
      <el-select v-model="form.cinemaId" class="mb-16" placeholder="Select" @focus.once="handleCinemasGet">
        <el-option v-for="item in cinemasOptions" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
      <el-select v-model="form.hallId" placeholder="Select hall" @focus.once="handleHallsGet" @change="handleHallsGet">
        <el-option v-for="item in hallsOptions" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
    </div>
    <hall-create-schema />
    <el-button @click="handleSchemaCreate">Create schema</el-button>
  </el-dialog>
</template>

<script lang="ts" setup>
import hallsApi from '@/api/halls/halls.api'
import { seats } from '@/components/hall/HallChoose/ChoosePlace.constants'
import { reactive, ref } from 'vue'
import cinemasApi from '@/api/cinemas/cinemas.api'
import HallCreateSchema from '@/components/hall/HallCreateSchema/HallCreateSchema.vue'

interface IProps {
  visible: boolean
}

interface IEmits {
  (e: 'close-dialog'): void
  (e: 'update-table'): void
}

const props = defineProps<IProps>()
const emit = defineEmits<IEmits>()

const cinemasOptions = ref<any>([])

const form = reactive<any>({
  cinemaId: '',
  hallId: '',
  title: 0,
})

const hallsOptions = ref<any>([])

const updateTable = (): void => {
  emit('update-table')
}

const handleCloseDialog = (): void => {
  emit('close-dialog')
}

const setHallsOptions = (hallsData: any): void => {
  hallsData.forEach((hall: any) => {
    hallsOptions.value.push({
      label: `${hall.title}`,
      value: hall.id,
    })
  })
}

const handleSchemaCreate = async (): Promise<void> => {
  const [error, data] = await hallsApi.createSchema(
    Object.assign(
      {
        items: seats,
      },
      {
        hall_id: form.hallId,
      }
    )
  )

  if (!error && data) {
    console.log(data)
  }
}

const handleCinemasGet = async (): Promise<void> => {
  const [error, data] = await cinemasApi.getCinemas()

  if (!error && data) {
    cinemasOptions.value = data.map((cinema: any) => ({ value: cinema.id, label: cinema.title }))
  }
}

const handleHallsGet = async (): Promise<void> => {
  const [error, data] = await hallsApi.getHalls()

  if (!error && data) {
    const halls = data.map((hall: any) => ({ id: hall.id, title: hall.hall_title }))

    await setHallsOptions(halls)
  }
}
</script>
