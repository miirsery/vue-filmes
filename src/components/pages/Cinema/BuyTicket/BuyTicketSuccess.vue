<template>
  <div class="buy-ticket-success">
    <h1>Ticket will send on your {{ props.email }}</h1>
  </div>
</template>

<script lang="ts" setup>
interface IProps {
  email: string
}

const props = defineProps<IProps>()

// const email = 'qwdqd@gmail.com'
</script>
