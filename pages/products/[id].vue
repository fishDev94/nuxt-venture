<template>
  <main>
    <section v-if="data" class="nv-product-page wrapper">
      <div class="nv-product-page__header">
        <UiNvGallery
          class="nv-product-page__header-gallery"
          :images="data.images"
        />
        <div class="nv-product-page__header-breadcrumbs">
          <NuxtLink :to="{ name: 'home' }">Home</NuxtLink><strong>/</strong
          ><span>{{ data.name }}</span>
        </div>
        <h1 class="nv-product-page__header-title">{{ data.name }}</h1>
      </div>
      <div class="nv-product-page__main">
        <div class="nv-product-page__main-rating">
          <p class="nv-product-page__main-rating-text">Rating:</p>
          <RatingStar :rating="data.rating" />
        </div>
        <div class="nv-product-page__main-description">
          <p><strong>Info:</strong></p>
          <p>{{ data.shortDescription }}</p>
        </div>
        <ul class="nv-product-page__main-info">
          <li><strong>Type:</strong> {{ data.type }}</li>
          <li><strong>City:</strong> {{ data.city }}</li>
        </ul>
      </div>
      <div class="nv-product-page__sidebar wrapper">
        <div class="nv-product-page__sidebar-container">
          <div class="nv-product-page__sidebar-price-container">
            <p class="nv-product-page__sidebar-price-from">From:</p>
            <p class="nv-product-page__sidebar-price">
              <strong>€ {{ data.price }}</strong>
            </p>
          </div>
          <UInputNumber
            v-model="quantity"
            class="nv-product-page__sidebar-selector"
            :min="1"
            variant="none"
          />
        </div>
        <UButton
          class="nv-product-page__sidebar-btn font-bold text-(--ui-bg) px-6"
          @click="handleAddCartClick"
          >Add to cart</UButton
        >
      </div>
    </section>
  </main>
</template>

<script lang="ts" setup>
import RatingStar from "~/components/ui/RatingStar.vue";
import { UNIT } from "~/constants";

const route = useRoute();
const { addToCart } = useCart();
const toast = useToast();
const quantity = ref(UNIT);

const { data, error } = await useFetch(`/api/products/${route.params.id}`, {
  getCachedData(key, nuxtApp) {
      return nuxtApp.payload.data[key] || nuxtApp.static.data[key];
    },
})

if (error.value) {
  throw createError({
    statusCode: error.value.statusCode,
    statusMessage: error.value.statusMessage,
  });
}

const handleAddCartClick = () => {
  if (data.value) {
    addToCart(data.value.id, data.value.price, quantity.value);
    toast.add({
      title: "Experience added to your itinerary!",
      ui: { title: "text-(--ui-secondary)" },
      duration: 2000,
    });
  }
};
</script>

<style lang="scss" scoped>
@use "assets/style/utils" as *;

.nv-product-page {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 24px;

  padding-block: 16px;

  @include start-from(medium-desktop) {
    display: grid;
    gap: 32px 40px;
    grid-template-columns: 2fr 1fr;
    grid-template-rows: auto;
    grid-template-areas:
      "header header"
      "main sidebar";
    padding-block: 24px;
  }

  &__header {
    display: flex;
    flex-direction: column;
    gap: 16px;

    @include start-from(medium-desktop) {
      grid-area: header;
    }
  }

  &__header-gallery {
    @include start-from(medium-desktop) {
      order: 3;
    }
  }

  &__header-breadcrumbs {
    @include body(6);

    display: flex;
    gap: 4px;
    color: var(--ui-secondary);

    @include start-from(medium-desktop) {
      @include body(2);

      order: 1;
      gap: 8px;
    }

    a:first-child {
      font-weight: bold;
      text-decoration: underline;
    }
  }

  &__header-title {
    @include sub-heading(5);

    color: var(--ui-secondary);

    @include start-from(medium-desktop) {
      @include sub-heading(2);

      order: 2;
    }
  }

  &__main {
    display: flex;
    flex-direction: column;
    gap: 8px;

    @include start-from(medium-desktop) {
      grid-area: main;
    }
  }

  &__main-rating {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 2px;

    p:nth-child(2) {
      @include body(3);

      @include start-from(medium-desktop) {
        @include body(1);
      }
    }
  }

  &__main-rating-text {
    color: var(--ui-secondary);
    font-weight: 600;

    @include start-from(medium-desktop) {
      @include body(1);

      font-weight: 600;
    }
  }

  &__main-description {
    display: flex;
    flex-direction: column;
    gap: 4px;

    p {
      @include start-from(medium-desktop) {
        @include body(1);
      }
    }
  }

  &__main-info {
    display: flex;
    flex-direction: column;
    gap: 4px;

    @include start-from(medium-desktop) {
      @include body(1);
    }
  }

  &__sidebar {
    position: fixed;
    width: 100%;
    bottom: 0;
    left: 0;
    background-color: var(--ui-bg);
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 8px;
    height: 74px;
    box-shadow: 0 0 10px -2px rgba(var(--nv-neutral-100), 0.15);

    @include start-from(medium-desktop) {
      flex-direction: column;
      position: static;
      width: 100%;
      gap: 16px;
      height: max-content;
      grid-area: sidebar;
      padding: 16px;
      border-radius: 12px;
    }
  }

  &__sidebar-container {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }

  &__sidebar-price-container {
    display: flex;
    flex-direction: column;

    @include start-from(medium-desktop) {
      flex-direction: row;
      align-items: center;
      gap: 8px;
    }
  }

  &__sidebar-price-from {
    font-size: 10px;

    line-height: 100%;

    @include start-from(medium-desktop) {
      @include body(4);
    }
  }

  &__sidebar-price {
    @include body(2);

    line-height: 100%;

    @include start-from(medium-desktop) {
      @include sub-heading(5);
    }
  }

  &__sidebar-selector {
    width: 100px;
    background-color: rgba(var(--nv-secondary-100), 0.1);
    border-radius: 4px;
    height: 100%;

    & > * {
      color: var(--ui-secondary);
    }
  }

  :deep(.nv-product-page__sidebar-btn) {
    flex: 0 0 auto;
  }
}
</style>
