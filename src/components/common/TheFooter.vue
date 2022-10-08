<template>
  <footer class="footer">
    <el-row>
      <el-col :span="12">
        <nav>
          <ul class="d-flex">
            <li v-for="item in footerItems" :key="item.title">
              {{ item.title }}
            </li>
          </ul>
        </nav>
      </el-col>
    </el-row>
  </footer>
</template>

<script lang="ts" setup>
import { footerItems } from '@/constants/footer'
</script>
