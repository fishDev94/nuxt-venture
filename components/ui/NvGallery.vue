<template>
  <div class="nv-gallery">
    <img
      v-for="(imageUrl, idx) in images"
      :key="`gallery-${idx}`"
      :src="imageUrl"
      :alt="`gallery-${idx}`"
    >
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  images: string[];
}>();
</script>

<style lang="scss" scoped>
@use "assets/style/utils" as *;

.nv-gallery {
  display: grid;
  height: 195px;
  overflow: hidden;
  gap: 4px;
  grid-template-columns: 2fr 1fr;
  grid-template-rows: 1fr 1fr;
  grid-template-areas:
    "first second"
    "first third";
  position: relative;

  @include start-from(tablet) {
    grid-template-areas:
      "first second third"
      "first second third";
    grid-template-columns: 2fr 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    gap: 8px;
    height: 256px;
  }

  @include start-from(medium-desktop) {
    height: 340px;
  }

  img {
    object-fit: cover;
  }

  img:first-child {
    height: 196px;
    width: 100%;
    grid-area: first;

    @include start-from(tablet) {
      height: 100%;
    }
  }

  img:nth-child(n + 2) {
    height: 98px;
    width: 100%;

    @include start-from(tablet) {
      height: 100%;
    }
  }

  img:nth-child(2) {
    grid-area: second;
  }

  img:nth-child(3) {
    grid-area: third;
  }
}
</style>
