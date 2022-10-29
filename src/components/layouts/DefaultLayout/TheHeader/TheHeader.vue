<template>
  <header class="the-header d-flex ai-center w-100 jc-between pv-20">
    <div>logo</div>
    <el-dropdown
      ref="menu"
      trigger="contextmenu"
      :popper-options="{ modifiers: [{ name: 'offset', options: { offset: [-15, 15] } }] }"
    >
      <el-avatar :size="32" :src="avatar" @click="handleDropdownOpen">
        <span>user</span>
      </el-avatar>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>Action 1</el-dropdown-item>
          <el-dropdown-item>Action 2</el-dropdown-item>
          <el-dropdown-item>Action 3</el-dropdown-item>
          <el-dropdown-item disabled>Action 4</el-dropdown-item>
          <el-dropdown-item divided @click="handleLogout">Logout</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </header>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user.store'

const router = useRouter()
const useUser = useUserStore()

const menu = ref()
const avatar = computed(() => useUser.user.avatar)

const handleDropdownOpen = (): void => {
  menu.value.handleOpen()
}

const handleLogout = (): void => {
  localStorage.clear()

  router.push({ name: 'LoginPage' })
}
</script>
