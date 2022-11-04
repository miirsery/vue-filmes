<template>
  <div class="hall-create-schema-item">
    <icon-template name="plus" width="16" height="16" />
  </div>
</template>

<script lang="ts" setup>
import IconTemplate from '@/components/common/IconTemplate.vue'
</script>

<style lang="scss" scoped>
@import '@/styles/resources/mixins';

.hall-create-schema-item {
  width: $size--24;
  height: $size--24;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px dashed $color--border;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    @include color('background-color', $color--border, 10%, -0.9);
  }
}
</style>
