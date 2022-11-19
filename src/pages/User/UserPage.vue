<template>
  <div class="user-page">
    <h1>User page</h1>
    <div class="d-flex jc-between">
      <user-tickets />
      <aside>
        <nav>
          <ul>
            <li> tickets </li>
          </ul>
        </nav>
      </aside>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useUserStore } from '@/stores/user.store'
import { onMounted } from 'vue'

const useUser = useUserStore()

onMounted(() => {
  getSelf()
})

const getSelf = async (): Promise<void> => {
  await useUser.getSelf()
}
</script>
