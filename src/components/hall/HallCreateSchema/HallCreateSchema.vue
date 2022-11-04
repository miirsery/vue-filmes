<template>
  <div class="hall-create-schema mb-16">
    <div class="hall-create-schema__title">Schema</div>
    <div class="hall-create-schema__content">
      <hall-create-schema-item />
    </div>
  </div>
</template>

<script lang="ts" setup>
import HallCreateSchemaItem from '@/components/hall/HallCreateSchema/HallCreateSchemaItem.vue'
</script>

<style lang="scss" scoped>
.hall-create-schema {
  width: 100%;
  border: 1px solid $color--border;
  padding: $size--12;

  &__title {
    text-align: center;
  }
}
</style>
