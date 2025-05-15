<template>
  <UCard class="nv-card" as="a" href="/test">
    <NuxtImg :src class="nv-card__img h-32" />

    <template #footer>
      <h3 class="nv-card__title">{{ title }}</h3>
      <p class="nv-card__description">
        {{ description }}
      </p>
      <div class="nv-card__price">€ {{ price }}</div>
    </template>
  </UCard>
</template>

<script lang="ts" setup>
import { PRICE_PLACEHOLDER } from '~/constants';

const {
  price = PRICE_PLACEHOLDER,
  title = "Title card placeholder",
  src = "https://picsum.photos/200/300",
  description = "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laudantium quod, iure debitis maiores laborum dicta.",
} = defineProps<{
  title?: string;
  description?: string;
  src?: string;
  price?: number;
}>();
</script>

<style lang="scss" scoped>
@use "assets/style/utils" as *;

.nv-card {
  display: block;
  overflow: hidden;

  &__img {
    width: 100%;
  }

  &__title {
    @include body(3);

    font-weight: 700;
  }

  &__description {
    @include body(6);
  }

  &__price {
    @include body(5);

    font-weight: 700;
    display: flex;
    justify-content: flex-end;
  }
}
</style>
