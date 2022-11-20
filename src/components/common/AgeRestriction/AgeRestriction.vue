<template>
  <div :class="['age-restriction', props.ageRestriction]">
    {{ ageRestrictionStatuses[props.ageRestriction] }}
  </div>
</template>

<script lang="ts" setup>
interface IProps {
  ageRestriction: string
}

const props = defineProps<IProps>()

const ageRestrictionStatuses = {
  'NC-17': '18+',
  'PG-13': '13+',
}
</script>

<style lang="scss" scoped>
.age-restriction {
  width: $size--24;
  height: $size--24;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: $size--12;
  text-align: center;

  &.NC-17 {
    background-color: #96050a;
  }
}
</style>
