<template>
  <main>
    <div class="nv-cart wrapper">
      <h1 class="nv-cart__title">Cart</h1>
      <section class="nv-cart__content block-section">Empty cart</section>
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
import { INIT_REF_NUMBER } from "~/constants";

const totalPrice = ref(INIT_REF_NUMBER);
const totalExperiences = ref(INIT_REF_NUMBER);

const isButtonDisabled = computed(() => totalPrice.value === INIT_REF_NUMBER);
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
</style>

<style lang="scss">
.nv-cart__review-btn {
  color: var(--ui-bg);
  justify-content: center;
}
</style>
