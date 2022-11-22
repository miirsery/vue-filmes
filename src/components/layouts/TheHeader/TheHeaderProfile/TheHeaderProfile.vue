<template>
  <div class="the-header-profile d-flex ai-center">
    <icon-template class="mr-8" name="favorite" width="32" height="32" />
    <el-popover popper-class="the-header__popper" :show-arrow="false">
      <template #reference>
        <el-button type="primary" class="the-header-profile__button">
          <icon-template name="user" width="32" height="32" />
        </el-button>
      </template>
      <div class="the-header-profile__content">
        <div class="the-header-profile__name the-header__popper-item">
          <router-link class="the-header__popper-item-link" to="/profile#general">
            {{ useUser.user.name }}
          </router-link>
        </div>
        <div class="the-header__popper-item">
          <router-link class="the-header__popper-item-link" to="/profile#tickets">Tickets</router-link>
        </div>
        <el-divider />
        <div class="d-flex jc-center">
          <el-button type="primary" class="the-header-profile__button-logout" @click="handleClickLogout">
            Logout
          </el-button>
        </div>
      </div>
    </el-popover>
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
