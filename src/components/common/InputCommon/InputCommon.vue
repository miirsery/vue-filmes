<template>
  <el-input
    v-bind="$attrs"
    :model-value="props.value"
    :placeholder="props.placeholder"
    :label="props.label"
    @input="handleValueChange"
  />
</template>

<script lang="ts" setup>
interface IProps {
  label?: string
  placeholder?: string
  value?: string | number
}

const props = withDefaults(defineProps<IProps>(), {
  value: '',
})

const emit = defineEmits<{
  (e: 'change', value: string | number): string | number
}>()

const handleValueChange = (inputValue: string | number): void => {
  emit('change', inputValue)
}
</script>
