<template>
  <div class="cinemas-map">
    <yandex-map :coordinates="[55.027339, 82.920773]">
      <yandex-marker
        v-for="cinema in cinemas"
        :key="cinema.id"
        :coordinates="calculateCoordinates(cinema)"
        :marker-id="cinema.id"
      >
        <template #component>
          <map-balloon :title="cinema.title" :phone="cinema.phone" />
        </template>
      </yandex-marker>
    </yandex-map>
  </div>
</template>

<script lang="ts" setup>
import { YandexMap, YandexMarker } from 'vue-yandex-maps'

interface IProps {
  cinemas: any
}

defineProps<IProps>()

const calculateCoordinates = (cinema: any): number[] => {
  return [cinema.lng, cinema.lat]
}
</script>
