<template>
  <UCard class="nv-card" as="a" :href="`/id/${id}`">
    <template #header>
      <NuxtImg :src class="nv-card__img h-34 lg:h-48" />
    </template>

    <template #default>
      <div class="nv-card__footer-container">
        <div class="nv-card__footer-subhead">
          <h3 class="nv-card__title">{{ title }}</h3>
          <p class="nv-card__description">
            {{ description }}
          </p>
        </div>
        <div class="nv-card__info">
          <p class="nv-card__info--price">
            <strong>€ {{ price }}</strong>
          </p>
          <UiRatingStar v-if="rating" :rating />
        </div>
      </div>
    </template>
  </UCard>
</template>

<script lang="ts" setup>
import { PRICE_PLACEHOLDER } from "~/constants";

const {
  price = PRICE_PLACEHOLDER,
  title = "Title card placeholder",
  src = "https://picsum.photos/200/300",
  rating = undefined,
  description = "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laudantium quod, iure debitis maiores laborum dicta.",
} = defineProps<{
  title?: string;
  description?: string;
  src?: string;
  rating?: number;
  id: number;
  price?: number;
}>();
</script>

<style lang="scss" scoped>
@use "assets/style/utils" as *;

.nv-card {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  flex: 0 0 230px;
  scroll-snap-align: start;

  @include start-from(tablet) {
    min-width: 320px;
  }

  & > * {
    flex: 1;
  }

  &__img {
    width: 100%;
  }

  &__footer-subhead {
    display: flex;
    flex-direction: column;
    gap: 6px;

    @include start-from(medium-desktop) {
      gap: 12px;
    }
  }

  &__footer-container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 8px;
    height: 100%;

    @include start-from(medium-desktop) {
      gap: 12px;
    }
  }

  &__title {
    @include body(3);

    font-weight: 700;

    @include start-from(medium-desktop) {
      @include body(2);

      font-weight: 700;
    }
  }

  &__description {
    @include body(6);

    @include start-from(medium-desktop) {
      @include body(5);
    }
  }

  &__info {
    display: flex;
    justify-content: space-between;
    align-items: center;

    &--price {
      @include body(5);

      @include start-from(medium-desktop) {
        @include body(4);
      }
    }
  }
}
</style>
