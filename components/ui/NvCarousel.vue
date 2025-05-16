<template>
  <div ref="carousel-ref" class="nv-carousel">
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
    <div class="nv-carousel__scroll-btn">
      scroll
    </div>
  </div>
</template>

<script lang="ts" setup>
import { FIRST_ELEMENT, INIT_REF_NUMBER } from "~/constants";
import type { Product } from "~/types/Products";

const caruselEl = useTemplateRef('carousel-ref')
const cardWidth = computed(() => {
  return caruselEl.value?.children[FIRST_ELEMENT].clientWidth || INIT_REF_NUMBER
})

const { handleScroll, shouldShowArrows } = useScrollable(caruselEl, cardWidth);

const { data } = defineProps<{
  data: Product[] | null;
}>();
</script>

<style lang="scss" scoped>
@use "assets/style/utils" as *;

.nv-carousel {
  position: relative;
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

  &__scroll-btn {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
  }
}
</style>
