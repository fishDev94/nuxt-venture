<template>
  <div class="nv-carousel">
    <div ref="carousel-ref" class="nv-carousel__scroller">
      <template v-if="isSuccessed">
        <UiNvCard
          v-for="(product, idx) in data"
          :id="product.id"
          :key="`${product.type}-${idx}`"
          :title="product.name"
          :price="product.price"
          :description="product.shortDescription"
          :src="product.coverImage"
          :rating="product.rating"
        />
      </template>
      <template v-else>
        <SkeletonNvCard
          v-for="(_, idx) in Array(lengthSkeletonArray)"
          :key="`skeleton-${type}-${idx}`"
        />
      </template>
    </div>
    <div v-if="shouldShowArrows" class="nv-carousel__scroll-btn">
      <UButton
        :class="[
          'nv-carousel__arrow-icon',
          { 'nv-carousel__arrow-icon--active': !isPrevDisabled },
        ]"
        variant="ghost"
        icon="ep:arrow-left-bold"
        @click="handleScroll()"
      />
      <UButton
        :class="[
          'nv-carousel__arrow-icon',
          { 'nv-carousel__arrow-icon--active': !isNextDisabled },
        ]"
        variant="ghost"
        icon="ep:arrow-right-bold"
        @click="handleScroll('right')"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  FIRST_ELEMENT,
  INIT_REF_NUMBER,
  SKT_LONG_CAROUSEL,
  SKT_SHORT_CAROUSEL,
} from "~/constants";
import type { Product } from "~/types/Products";

const { type } = defineProps<{
  type: Product["type"];
}>();

const { data, status, error } = await useFetch(
  "/api/products",
  {
    query: {
      type,
    },
    getCachedData(key, nuxtApp) {
      return nuxtApp.payload.data[key] || nuxtApp.static.data[key];
    },
  },
);

if (error.value) {
  throw createError({
    statusCode: error.value.statusCode,
    statusMessage: error.value.statusMessage,
  });
}

const caruselEl = useTemplateRef("carousel-ref");
const cardWidth = computed(() => {
  return (
    caruselEl.value?.children[FIRST_ELEMENT].clientWidth || INIT_REF_NUMBER
  );
});
const isSuccessed = computed(() => status.value === "success");

const lengthSkeletonArray = computed(() =>
  type === "experience" ? SKT_LONG_CAROUSEL : SKT_SHORT_CAROUSEL
);

const { handleScroll, shouldShowArrows, isNextDisabled, isPrevDisabled } =
  useScrollable(caruselEl, cardWidth);
</script>

<style lang="scss" scoped>
@use "assets/style/utils" as *;

.nv-carousel {
  position: relative;

  &__scroller {
    display: flex;
    gap: 8px;
    padding: 2px;
    overflow-x: scroll;
    scroll-snap-type: x mandatory;
    scroll-snap-stop: always;
    -webkit-overflow-scrolling: touch;
    -ms-overflow-style: none; /* Internet Explorer 10+ */
    scrollbar-width: none; /* Firefox */
    scroll-padding: 2px;

    @include start-from(tablet) {
      gap: 16px;

      & > * {
        flex: auto;
      }
    }

    &::-webkit-scrollbar {
      display: none; /* Safari and Chrome */
    }
  }

  &__scroll-btn {
    display: none;

    @include start-from(medium-desktop) {
      position: absolute;
      display: flex;
      justify-content: space-between;
      align-items: center;
      top: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
    }
  }
}
</style>

<style lang="scss">
.nv-carousel__arrow-icon {
  background-color: var(--ui-bg);
  color: var(--ui-secondary);
  font-size: 18px;
  padding: 12px;
  height: max-content;
  pointer-events: all;
  border-radius: 100%;
  box-shadow: 0 0 8px 1px rgba(var(--nv-neutral-100), 0.1);
  opacity: 0;
  cursor: pointer;

  &:first-child {
    position: relative;
    left: -21px;
  }

  &:nth-child(2) {
    position: relative;
    right: -21px;
  }

  &--active {
    opacity: 1;
  }
}
</style>
