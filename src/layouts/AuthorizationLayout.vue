<template>
  <div class="container">
    <div class="authorization-layout">
      <router-view />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.authorization-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
