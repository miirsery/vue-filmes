<template>
  <header class="the-header">
    <el-row>
      <nav class="d-flex ai-center w-100">
        <el-col :span="12">
          <ul class="d-flex ai-center">
            <li v-for="item in headerItems" :key="item.title" class="mr-50">
              {{ item.title }}
            </li>
          </ul>
        </el-col>
        <el-col :span="4">
          <div class="logo">logo</div>
        </el-col>
        <el-col :span="6">
          <the-search />
        </el-col>
        <el-col :span="2">
          <el-button> Вход </el-button>
        </el-col>
      </nav>
    </el-row>
  </header>
</template>

<script lang="ts" setup>
import { headerItems } from '@/constants/header'
</script>
