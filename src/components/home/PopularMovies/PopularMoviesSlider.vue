<template>
  <div class="popular-movies-slider">
    <swiper
      class="popular-movies-slider__content"
      :slides-per-view="3"
      :space-between="50"
      :loop-fill-group-with-blank="true"
      :navigation="{
        nextEl: nextButton,
        prevEl: prevButton,
      }"
      :pagination="{
        el: pagination,
      }"
    >
      <swiper-slide v-for="movie in props.movies" :key="movie.id" class="popular-movies-slider__slide">
        <router-link :to="`/movie/${movie.id}`">
          <div class="popular-movies-slider__slide-image">
            <img :src="movie.preview" alt="movie" />
            <div class="popular-movies-slider__slide-info">
              <div>{{ movie.title }}</div>
            </div>
          </div>
        </router-link>
      </swiper-slide>
    </swiper>
    <div class="popular-movies-slider__arrows">
      <div ref="prevButton" class="popular-movies-slider__arrow prev">
        <icon-template name="slider-arrow" reverse />
      </div>
      <div ref="nextButton" class="popular-movies-slider__arrow next">
        <icon-template name="slider-arrow" />
      </div>
    </div>
    <div ref="pagination" class="popular-movies-slider__pagination" />
  </div>
</template>

<script lang="ts" setup>
import SwiperCore, { Pagination, Navigation } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { ref } from 'vue'

SwiperCore.use([Pagination, Navigation])

interface IProps {
  movies: any
}

const props = withDefaults(defineProps<IProps>(), {})

const prevButton = ref<HTMLElement | null>(null)
const nextButton = ref<HTMLElement | null>(null)
const pagination = ref<HTMLElement | null>(null)
</script>

<style lang="scss" scoped>
.popular-movies-slider {
  position: relative;

  .swiper {
    max-width: 960px;
    margin-left: 0;
  }

  &__slide {
    &-image {
      height: 320px;
      position: relative;

      &::after {
        content: '';
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        width: 100%;
        height: 100%;
        position: absolute;
        background-color: rgb(0 0 0 / 0.6);
        transition: all 0.3s;
        visibility: hidden;
        opacity: 0;
      }

      img {
        object-fit: cover;
      }

      &:hover {
        &::after {
          visibility: visible;
          opacity: 1;
        }

        .popular-movies-slider__slide-info {
          transform: translate(-50%, 0);
          padding: 8px;
          opacity: 0.7;
        }
      }
    }

    &-info {
      left: 50%;
      bottom: 0;
      width: 100%;
      position: absolute;
      font-size: 18px;
      text-align: center;
      background: $color--primary;
      transform: translate(-50%, 25px);
      transition: all ease-in 0.15s;
      z-index: 2;
    }
  }

  &__arrows {
    top: 50%;
    width: 100%;
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: space-between;
    transform: translateY(-50%);
  }

  &__arrow {
    cursor: pointer;

    &.next {
      right: -$size--60;
      position: absolute;
    }

    &.prev {
      left: -$size--60;
      position: absolute;
    }
  }

  &__pagination {
    bottom: -$size--24;
    max-width: 960px;
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

.swiper-button-disabled {
  visibility: hidden;
  opacity: 0;
}
</style>
