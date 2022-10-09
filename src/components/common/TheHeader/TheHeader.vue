<template>
  <header class="the-header">
    <el-row>
      <nav class="d-flex ai-center w-100 jc-between">
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
        <el-col :span="5">
          <the-search />
        </el-col>
        <el-col :span="2">
          <router-link class="the-header__login" to="/authorization/login"> Вход </router-link>
        </el-col>
      </nav>
    </el-row>
  </header>
</template>

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
