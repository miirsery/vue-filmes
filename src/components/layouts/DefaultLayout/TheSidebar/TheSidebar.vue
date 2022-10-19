<template>
  <div class="the-sidebar">
    <nav>
      <ul class="the-sidebar__menu">
        <li v-for="item in sidebarMenuItems" :key="item.name" class="the-sidebar__menu-item">
          <router-link :exact="item.url === '/'" class="the-sidebar__menu-link" :to="item.url">
            {{ item.name }}
          </router-link>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script lang="ts" setup>
import { sidebarMenuItems } from '@/components/layouts/DefaultLayout/TheSidebar/TheSidebar.constants'
</script>

<style lang="scss" scoped>
.the-sidebar {
  height: 100%;
  border-radius: 19px;
  box-shadow: 28px 28px 56px #212121, -28px -28px 56px #353535;
  background: linear-gradient(145deg, #2e2e2e, #272727);
  margin-right: 40px;

  &__menu {
    width: 300px;

    &-link {
      display: block;
      color: #747474;
      padding: 8px 12px;

      &:hover {
        color: #f3f3f3;
      }

      &.active-exact-link {
        color: #f90;
      }
    }

    &-item {
      width: 100%;
      background-color: #252525;
      transition: all 0.1s ease-in-out;

      &:hover {
        background-color: #4b4b4b;
      }
    }
  }
}
</style>
