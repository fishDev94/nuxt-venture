<template>
  <main>
    <div class="nv-cart wrapper">
      <h1 class="nv-cart__title">Cart</h1>
      <section v-if="isCart" class="nv-cart__content block-section">
        <div v-for="(product, idx) in cart" :key="`cart-data-${product.id}`">
          <NvOrderCard :product-id="product.id" :quantity="product.quantity" />
          <div v-if="!isLastElement(idx)" class="separator" />
        </div>
      </section>
      <section v-if="isCart" class="nv-cart__review block-section">
        <h2 class="nv-cart__review-title">Order review</h2>
        <div class="nv-cart__review-content">
          <UIcon name="el:shopping-cart" /> {{ totalItems }} Experiences
        </div>
        <div class="nv-cart__review-price">
          <span>Total</span>
          <span>€ {{ totalPrice }}</span>
        </div>
        <UButton class="nv-cart__review-btn" :disabled="isButtonDisabled"
          >Go to checkout</UButton
        >
      </section>
      <section v-else class="nv-cart__empty block-section">
        <h3>Your Adventure Awaits</h3>
        <p>Your cart is empty, but the world isn't.</p>
      </section>
    </div>
  </main>
</template>

<script lang="ts" setup>
import { INIT_REF_NUMBER, UNIT } from "~/constants";

const { totalItems, totalPrice, cart } = useCart();

const isCart = computed(() => Boolean(cart.value.length));
const isButtonDisabled = computed(() => totalPrice.value === INIT_REF_NUMBER);

const isLastElement = (index: number) => index + UNIT === cart.value.length;
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
  padding-block: 16px;

  @include start-from(medium-desktop) {
    grid-template-columns: 1fr 420px;
    grid-template-areas:
      "title title"
      "items aside";
    gap: 24px;
    padding-block: 24px;
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

    @include start-from(medium-desktop) {
      position: sticky;
      top: 100px;
    }
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

  &__empty {
    grid-column: 1 / -1;
    padding: 36px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 8px;
    text-align: center;
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
