<template>
  <div class="employees-page w-100">
    <div class="halls-page__header d-flex ai-center jc-between">
      <h1>Employees</h1>
      <div class="d-flex ai-center">
        <!--        <el-button type="success" @click="handleDeleteModalVisibleChange">Delete employee</el-button>-->
        <el-button type="primary" @click="getEmployees(300)">Get best</el-button>
      </div>
    </div>
    <employees-table :employees="employees" :loading="tableLoading" @update-table="getEmployees" />
  </div>
</template>

<script lang="ts" setup>
import employeesApi from '@/api/employees/employees.api'
import { onMounted, ref } from 'vue'
import EmployeesTable from '@/components/employees/EmployeesTable.vue'

const employees = ref<any>([])
const tableLoading = ref(false)

const getEmployees = async (price?: number): Promise<void> => {
  tableLoading.value = true

  const [error, data] = await employeesApi.getEmployees(price)

  if (!error && data) {
    employees.value = data
  }

  tableLoading.value = false
}

onMounted(async () => {
  await getEmployees()
})
</script>
