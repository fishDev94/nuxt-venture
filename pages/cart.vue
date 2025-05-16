<template>
  <main>
    <div class="nv-cart wrapper">
      <h1 class="nv-cart__title">Cart</h1>
      <section class="nv-cart__content block-section">
        <div v-for="(product, idx) in cartMockData" :key="`cart-data-${product.id}`">
          <NvOrderCard 
          :data-card="product" />
          <div v-if="!isLastElement(idx)" class="separator"/>
        </div>
      </section>
      <section class="nv-cart__review block-section">
        <h2 class="nv-cart__review-title">Order review</h2>
        <div class="nv-cart__review-content">
          <UIcon name="el:shopping-cart" /> {{ totalExperiences }} Experiences
        </div>
        <div class="nv-cart__review-price">
          <span>Total</span>
          <span>€ {{ totalPrice }}</span>
        </div>
        <UButton class="nv-cart__review-btn" :disabled="isButtonDisabled"
          >Go to checkout</UButton
        >
      </section>
    </div>
  </main>
</template>

<script lang="ts" setup>
import { INIT, INIT_REF_NUMBER, UNIT } from "~/constants";
import type { Product } from "~/types/Products";

const cartMockData = ref<Product[]>([
  {
    id: 1,
    type: "experience",
    name: "Chianti Countryside Vespa Tour",
    city: "Florence",
    price: 95,
    rating: 4.8,
    shortDescription:
    "Ride a classic Vespa through the rolling hills of Chianti with tastings at two wineries.",
    coverImage: "https://picsum.photos/seed/vespa/600/400",
    images: [
      "https://picsum.photos/seed/vespa1/800/600",
      "https://picsum.photos/seed/vespa2/800/600",
      "https://picsum.photos/seed/vespa3/800/600",
    ],
  },
  {
    id: 9,
    type: "experience",
    name: "Limoncello Workshop on Amalfi Coast",
    city: "Amalfi",
    price: 50,
    rating: 4.9,
    shortDescription:
    "Craft your own limoncello using Amalfi lemons in a traditional family-run limoneto.",
    coverImage: "https://picsum.photos/seed/limoncello/600/400",
    images: [
      "https://picsum.photos/seed/limoncello1/800/600",
      "https://picsum.photos/seed/limoncello2/800/600",
      "https://picsum.photos/seed/limoncello3/800/600",
    ],
  },
]);

const totalPrice = computed(() => {
  return cartMockData.value.reduce((sum, item) => sum + item.price, INIT);
});
const totalExperiences = computed(() => cartMockData.value.length);
const isButtonDisabled = computed(() => totalPrice.value === INIT_REF_NUMBER);

const isLastElement = (index: number) =>
  index + UNIT === cartMockData.value.length;
</script>

<style lang="scss" scoped>
@use "assets/style/utils" as *;

.nv-cart {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-areas:
    "title"
    "items"
    "aside";
  gap: 16px;

  @include start-from(medium-desktop) {
    grid-template-columns: 1fr 420px;
    grid-template-areas:
      "title title"
      "items aside";
    gap: 24px;
  }

  &__title {
    @include sub-heading(3);

    grid-area: title;
    color: var(--ui-secondary);
  }

  &__content {
    grid-area: items;
    border: 1px solid rgba(var(--nv-secondary-100), 0.15);
    border-radius: 16px;
  }

  &__review {
    grid-area: aside;
    display: flex;
    flex-direction: column;
    gap: 16px;
    height: max-content;
  }

  &__review-title {
    @include sub-heading(6);

    color: var(--ui-secondary);
  }

  &__review-price {
    display: flex;
    justify-content: space-between;
    font-weight: 600;
  }
}

.separator {
  height: 1px;
  width: 100%;
  background-color: rgba(var(--nv-secondary-100), 0.15);
  margin: 16px 0;
}
</style>

<style lang="scss">
.nv-cart__review-btn {
  color: var(--ui-bg);
  justify-content: center;
}
</style>
