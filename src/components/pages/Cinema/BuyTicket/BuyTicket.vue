<template>
  <div class="buy-ticket">
    <div class="buy-ticket__header">
      <div>back</div>
      <div>Close</div>
    </div>
    <div class="buy-ticket__content d-flex">
      <ticket-result />
      <div>
        <div>
          <input-common v-model="form.email" placeholder="Enter a email" />
          <input-common v-model="form.phone" placeholder="Enter a phone" />
        </div>
        <div class="buy-ticket__payment-methods">
          <div>QR</div>
          <div>Bank card</div>
        </div>
      </div>
    </div>
    <div class="buy-ticket__footer">
      <div class="buy-ticket__user-agreement">
        <a href="/pdf" target="_blank">User Agreement</a>
      </div>
      <el-button class="buy-ticket__submit">Pay 350 Р</el-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'

const form = reactive<any>({})
const activePaymentMethod = ref('QR')
</script>

<style lang="scss" scoped>
.buy-ticket {
  &__payment-methods {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
  }
}
</style>
