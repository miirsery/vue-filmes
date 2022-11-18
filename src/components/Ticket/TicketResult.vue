<template>
  <div class="ticket-result">
    <div class="ticket-result__preview">
      <img
        src="https://kartinkin.net/uploads/posts/2021-07/1625528961_27-kartinkin-com-p-anime-posteri-anime-krasivo-42.jpg"
        alt="movie"
      />
      <div class="ticket-result__preview-header d-flex ai-center">
        <div class="ticket-result__title mr-8"> Movie #1 </div>
        <div class="ticket-result__age nc-17">18+</div>
      </div>
      <div class="ticket-result__preview-footer">
        <div class="ticket-result__date"> ts, 1 dec 19:00 </div>
      </div>
    </div>
    <div>1 ticket</div>
    <div class="ticket-result__row d-flex ai-center jc-center">
      <div> 1 row, 6 place</div>
      <div class="ticket-result__dots" />
      <div>350 Р</div>
    </div>
    <div class="ticket-result__total-price"> 350 Р </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/styles/resources/mixins';

.ticket-result {
  width: 100%;
  max-width: 300px;

  &__preview {
    height: 120px;
    position: relative;
    margin-bottom: $size--16;
    z-index: 2;

    &-header {
      top: $size--8;
      left: $size--8;
      position: absolute;
    }

    &-footer {
      left: $size--8;
      bottom: $size--8;
      position: absolute;
    }

    img {
      width: 100%;
      object-fit: cover;
      opacity: 0.4;
    }
  }

  &__age {
    &.nc-17 {
      //@include color('background-color', $color--warning, -1);
      background-color: #9a2020;
      padding: 4px;
    }
  }

  &__dots {
    height: 1px;
    flex: 1;
    border-bottom: 2px dotted $color--border;
    margin: 0 $size--4;
  }
}
</style>
