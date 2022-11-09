<template>
  <header class="the-header">
    <el-row>
      <nav class="d-flex ai-center w-100 jc-between">
        <el-col :span="12">
          <ul class="d-flex ai-center">
            <li v-for="item in headerItems" :key="item.title" class="mr-50">
              <router-link :to="item.url">{{ item.title }}</router-link>
            </li>
          </ul>
        </el-col>
        <el-col :span="4">
          <div class="logo">logo</div>
        </el-col>
        <el-col :span="5">
          <the-search />
        </el-col>
        <el-col v-if="isAuth" :span="2">
          <the-header-avatar />
        </el-col>
        <el-col v-else :span="2">
          <router-link class="the-header__login" to="/authorization/login"> Вход </router-link>
        </el-col>
      </nav>
    </el-row>
  </header>
</template>

<script lang="ts" setup>
import { headerItems } from '@/constants/header'
import { ref } from 'vue'
import { MovieType } from '@/types/movies.types'
import TheHeaderAvatar from '@/components/layouts/TheHeader/TheHeaderProfile/TheHeaderProfile.vue'

const movies = ref<MovieType[]>([
  {
    id: 0,
    title: '',
    description: '',
    release_date: '',
    preview: '',
  },
])

const isToken = localStorage.getItem('token')
const isAuth = ref<boolean>(!!isToken)
</script>

<style lang="scss" scoped>
.the-header {
  padding-top: $size--16;

  &__login {
    width: 100%;
    display: block;
    border-radius: 8px;
    text-align: center;
    color: $color--white;
    background-color: $color--accent;
    padding: 10px 0;
  }
}
</style>
