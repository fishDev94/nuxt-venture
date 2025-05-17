<template>
  <main>
    <section v-if="data" class="nv-product-page wrapper">
      <div class="nv-product-page__header">
        <div class="nv-product-page__header-gallery">
          <img
            v-for="(imageUrl, idx) in data.images"
            :key="`gallery-${idx}`"
            :src="imageUrl"
            :alt="`gallery-${idx}`"
          />
        </div>
        <div class="nv-product-page__header-breadcrumbs">
          <NuxtLink :to="{ name: 'home' }">Home</NuxtLink><strong>/</strong
          ><span>{{ data.name }}</span>
        </div>
        <h1 class="nv-product-page__header-title">{{ data.name }}</h1>
      </div>
      <div class="nv-product-page__main"></div>
      <div class="nv-product-page__sidebar wrapper">
        <div class="nv-product-page__sidebar-price-container">
          <p class="nv-product-page__sidebar-price-from">From:</p>
          <p class="nv-product-page__sidebar-price">
            <strong>€ {{ data.price }}</strong>
          </p>
        </div>
        <UButton class="nv-product-page__sidebar-btn font-bold text-(--ui-bg) px-6">Add to cart</UButton>
      </div>
    </section>
  </main>
</template>

<script lang="ts" setup>
const route = useRoute();

const { data, pending } = await useAsyncData(
  route.params.id as string,
  () => $fetch(`/api/products/${route.params.id}`),
  {
    getCachedData(key, nuxtApp) {
      return nuxtApp.payload.data[key] || nuxtApp.static.data[key];
    },
  }
);

console.log(data.value);
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
      order: 3;
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
    height: 500px;
    border: 2px solid red;

    @include start-from(medium-desktop) {
      grid-area: main;
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
    height: 74px;
    box-shadow: 0 -1px 10px -2px rgba(var(--nv-neutral-100), 0.15);

    @include start-from(medium-desktop) {
      position: static;
      width: 100%;
      height: max-content;
      grid-area: sidebar;
      padding: 16px;
      border-radius: 12px;
    }
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
}
</style>
