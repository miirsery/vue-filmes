<script lang="ts" setup></script>

<template>
  <div class="the-home">
    <div class="d-flex ai-center jc-between">
      <popular-movies />
      <nav>
        <ul>
          <li class="mb-8">
            <a target="_blank" href="https://t.me/miirsery">
              <icon-template name="telegram" color="#222" stroke-color="#d0b7e5" />
            </a>
          </li>
          <li>
            <a target="_blank" href="https://vk.com/miirsery">
              <icon-template name="vk" color="#222" stroke-color="#d0b7e5" />
            </a>
          </li>
        </ul>
      </nav>
    </div>
    <latest-movies />
  </div>
</template>
