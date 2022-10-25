<template>
  <el-table v-loading="loading" :data="props.tickets" @selection-change="handleRowSelect">
    <el-table-column type="selection" />
    <el-table-column label="ID" prop="id">
      <template #default="{ row }">
        <div v-if="checkSelectedRow(row.id)">
          {{ row.id }}
        </div>
        <el-button v-else>edit</el-button>
      </template>
    </el-table-column>
    <el-table-column label="Seat" prop="seat">
      <template #default="{ row }">
        <div v-if="checkSelectedRow(row.id)">
          {{ row.seat }}
        </div>
      </template>
    </el-table-column>
    <el-table-column label="Price" prop="price">
      <template #header>
        <el-tooltip>
          <span>Price</span>
          <template #content>
            <div class="d-flex fd-column">
              <div class="d-flex ai-center">
                <div>greater then - </div>
                <input-common v-model="filters.comparison" placeholder="price..." />
              </div>
              <div class="d-flex ai-center">
                <div>EqualsTickets - </div>
                <input-common v-model="filters.equals" placeholder="price..." />
              </div>
              <el-button type="success" @click="handleFilterApply">Submit</el-button>
            </div>
          </template>
        </el-tooltip>
      </template>
      <template #default="{ row }">
        <div v-if="checkSelectedRow(row.id)">
          {{ row.price }}
        </div>
      </template>
    </el-table-column>
    <el-table-column label="Session Id" prop="session_id">
      <template #header>
        <el-tooltip>
          <span>Session id</span>
          <template #content>
            <input-common v-model="filters.session_id" placeholder="Enter a session id" />
            <el-button type="success" @click="handleFilterApply">Submit</el-button>
          </template>
        </el-tooltip>
      </template>
      <template #default="{ row }">
        <div v-if="checkSelectedRow(row.id)">
          {{ row.session_id }}
        </div>
      </template>
    </el-table-column>
    <el-table-column label="Seller Id" prop="seller_id">
      <template #header>
        <el-tooltip>
          <span>Seller id</span>
          <template #content>
            <input-common v-model="filters.seller_id" placeholder="Enter a seller id" />
            <el-button type="success" @click="handleFilterApply">Submit</el-button>
          </template>
        </el-tooltip>
      </template>
      <template #default="{ row }">
        <div v-if="checkSelectedRow(row.id)">
          {{ row.seller_id }}
        </div>
      </template>
    </el-table-column>
    <el-table-column label="User Id" prop="user_id">
      <template #header>
        <el-tooltip>
          <span>User id</span>
          <template #content>
            <input-common v-model="filters.user_id" placeholder="Enter a user id" />
            <el-button type="success" @click="handleFilterApply">Submit</el-button>
          </template>
        </el-tooltip>
      </template>
      <template #default="{ row }">
        <div v-if="checkSelectedRow(row.id)">
          {{ row.user_id }}
        </div>
      </template>
    </el-table-column>
    <el-table-column label="Movie Id" prop="movie_id">
      <template #header>
        <el-tooltip>
          <span>Movie id</span>
          <template #content>
            <input-common v-model="filters.movie_id" placeholder="Enter a user id" />
            <el-button type="success" @click="handleFilterApply">Submit</el-button>
          </template>
        </el-tooltip>
      </template>
      <template #default="{ row }">
        <div v-if="checkSelectedRow(row.id)">
          {{ row.movie_id }}
        </div>
      </template>
    </el-table-column>
    <el-table-column label="Hall ID" prop="ticket_id">
      <template #default="{ row }">
        <div v-if="checkSelectedRow(row.id)">
          {{ row.hall_id }}
        </div>
      </template>
    </el-table-column>
    <el-table-column label="Buy time" prop="buy_date">
      <template #default="{ row }">
        <div v-if="checkSelectedRow(row.id)">
          {{ row.buy_date }}
        </div>
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { UserType } from '@/types/users.types'
import InputCommon from '@/components/common/InputCommon/InputCommon.vue'

interface IProps {
  tickets: any[]
  loading: boolean
}

interface IEmits {
  (e: 'update-table'): void
  (e: 'apply-filters', filters: any): object
}

const props = defineProps<IProps>()
const emit = defineEmits<IEmits>()

const selectRows = ref<UserType[]>([])
const filters = reactive<any>({})

const updateTable = (): void => {
  emit('update-table')
}

const applyFilters = (filters: any): void => {
  emit('apply-filters', filters)
}

const handleRowSelect = (rows: UserType[]): void => {
  selectRows.value = rows
}

const checkSelectedRow = (id: number): boolean => {
  const account = selectRows.value.find((row: UserType) => row.id === +id)

  if (account) {
    return selectRows.value.length > 1
  }

  return true
}

const handleFilterApply = (): void => {
  applyFilters(filters)
}
</script>
