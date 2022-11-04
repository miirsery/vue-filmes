<template>
  <div class="halls-page w-100">
    <div class="halls-page__header d-flex ai-center jc-between mb-16">
      <h1>Halls</h1>
      <div class="d-flex ai-center">
        <el-button @click="handleCreateSeatsVisibleChange">Create schema</el-button>
        <el-button type="primary" @click="handleCreateHallVisibleChange">Create Hall</el-button>
        <el-button type="success" @click="handleDeleteModalVisibleChange">Delete hall</el-button>
      </div>
    </div>

    <halls-table
      :halls="halls"
      :loading="tableLoading"
      @open-edit-dialog="handleEditModalVisibleChange"
      @update-table="getHalls"
    />

    <hall-delete-dialog
      :visible="isRemoveDialogVisible"
      @close-dialog="handleDeleteModalVisibleChange"
      @update-table="getHalls"
    />

    <hall-create-dialog
      :visible="isCreateDialogVisible"
      @choose-place-visible-change="handleChoosePlaceVisibleChange"
      @update-table="getHalls"
      @close-dialog="handleCreateHallVisibleChange"
    />

    <choose-place-dialog
      :visible="isChoosePlaceVisible"
      :seats="schema"
      @close-dialog="handleChoosePlaceVisibleChange"
    />

    <hall-create-seats :visible="isCreatePlaceVisible" @close-dialog="handleCreateSeatsVisibleChange" />
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import HallsTable from '@/components/halls/HallsTable.vue'
import hallsApi from '@/api/halls/halls.api'
import HallDeleteDialog from '@/components/hall/HallDelete/HallDeleteDialog.vue'
import HallCreateDialog from '@/components/hall/HallCreate/HallCreateDialog.vue'
import ChoosePlaceDialog from '@/components/hall/HallChoose/ChoosePlaceDialog.vue'
import HallCreateSeats from '@/components/hall/HallCreateSeats/HallCreateSeats.vue'

const isCreateDialogVisible = ref(false)
const isRemoveDialogVisible = ref(false)
const isChoosePlaceVisible = ref(false)
const isCreatePlaceVisible = ref(false)
const tableLoading = ref(false)
const halls = ref<any>([])
const schema = ref<any>([])

const handleDeleteModalVisibleChange = (): void => {
  isRemoveDialogVisible.value = !isRemoveDialogVisible.value
}

const handleCreateHallVisibleChange = (): void => {
  isCreateDialogVisible.value = !isCreateDialogVisible.value
}

const handleChoosePlaceVisibleChange = async (): Promise<void> => {
  isChoosePlaceVisible.value = !isChoosePlaceVisible.value

  await getSchema()
}

const handleCreateSeatsVisibleChange = (): void => {
  isCreatePlaceVisible.value = !isCreatePlaceVisible.value
}

const handleEditModalVisibleChange = (): void => {
  //...
}

const getSchema = async (): Promise<void> => {
  const [error, data] = await hallsApi.getSchema()

  if (!error && data) {
    schema.value = data
  }
}

const getHalls = async (): Promise<void> => {
  tableLoading.value = true

  const [error, data] = await hallsApi.getHalls()

  if (!error && data) {
    halls.value = data
  }

  tableLoading.value = false
}

onMounted(async () => {
  await getHalls()
})
</script>
