<template>
  <section class="nv-hero">
    <img class="nv-hero__img" src="/img/hero-image.webp" alt="Discover venture">
    <div class="nv-hero__overlay" />
    <div class="nv-hero__content">
      <h1>Discover the world with nv</h1>
      <p>From hotels to activities, the best experiences in your destination.</p>
    </div>
  </section>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
@use "assets/style/utils" as *;

.nv-hero {
  position: relative;
  height: 230px;
  overflow: hidden;

  @include start-from(medium-desktop) {
    height: 480px;
  }

  &__img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
  }

  &__overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: var(--ui-bg);
    opacity: 0.6;
  }

  &__content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: absolute;
    gap: 12px;
    height: 100%;
    padding: 0 16px;

    @include start-from(medium-desktop) {
    padding: 0 64px;
  }

    h1 {
      text-transform: uppercase;
      color: var(--ui-secondary);
    }

    p {
      font-weight: 600;
      color: var(--ui-secondary);
    }
  }
}
</style>
