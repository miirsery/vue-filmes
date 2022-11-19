<template>
  <div class="the-header-profile d-flex ai-center">
    <icon-template class="mr-8" name="favorite" width="32" height="32" />
    <el-tooltip>
      <el-button class="the-header-profile__button"> <icon-template name="user" width="32" height="32" /> </el-button>
      <template #content>
        <div class="the-header-profile__content">
          <div class="the-header-profile__name">{{ useUser.user.name }}</div>
          <div>
            <router-link to="/profile">Profile</router-link>
          </div>
          <el-divider />
          <el-button class="the-header-profile__button-logout" @click="handleClickLogout">Выйти</el-button>
        </div>
      </template>
    </el-tooltip>
  </div>
</template>

<script lang="ts" setup>
import { useUserStore } from '@/stores/user.store'

const useUser = useUserStore()

const handleClickLogout = (): void => {
  localStorage.clear()

  location.reload()
}
</script>

<style lang="scss" scoped>
.the-header-profile {
  &__name {
    color: $color--white;
  }
}
</style>
