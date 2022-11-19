<template>
  <div class="user-tickets">
    <h2>user tickets</h2>
    <div class="user-tickets__content">
      <div v-for="ticket in tickets" :key="ticket.id" class="user-tickets__ticket">
        <div class="d-flex">
          <div class="mr-8">
            <div>Ticket: №{{ ticket.movie.id }}</div>
            <div>{{ ticket.movie.title }}</div>
          </div>
          <div class="user-tickets__ticket-image">
            <img :src="ticket.movie.preview" alt="movie" />
          </div>
        </div>
        <div>Date: {{ ticket.session.date }}</div>
        <div>Time: {{ ticket.session.time }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useUserStore } from '@/stores/user.store'
import { computed } from 'vue'

const useUser = useUserStore()

const tickets = computed(() => useUser.user.tickets)
</script>

<style lang="scss" scoped>
.user-tickets {
  &__ticket {
    width: 150px;
    box-shadow: 4px 4px 4px #141414;
    padding: 8px;

    &-image {
      height: 100px;

      img {
        object-fit: cover;
      }
    }

    &:not(:last-child) {
      margin-bottom: $size--16;
    }
  }
}
</style>
