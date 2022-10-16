<template>
  <div class="the-sidebar">
    <nav>
      <ul class="the-sidebar__menu">
        <li v-for="item in sidebarMenuItems" :key="item.name" class="the-sidebar__menu-item">
          <router-link class="the-sidebar__menu-link" :to="item.url">{{ item.name }}</router-link>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script lang="ts" setup>
import { sidebarMenuItems } from '@/layouts/TheSidebar/TheSidebar.constants'
</script>

<style lang="scss" scoped>
.the-sidebar {
  height: 100%;
  box-shadow: 3px 3px 3px #f90;

  &__menu {
    width: 300px;

    &-link {
      display: block;
      padding: 8px 12px;
    }

    &-item {
      width: 100%;
      background-color: #707070;

      &:hover {
        background-color: #4b4b4b;
      }
    }
  }
}
</style>
