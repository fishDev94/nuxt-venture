<template>
  <nav class="nv-navbar">
    <UiHamMenu />
    <div class="nv-navbar__logo">
      <UiNvLogo />
      <h1>nuxt venture</h1>
    </div>
    <div class="nv-navbar__menu-content">
      <UiNavMenu />
      <NuxtLink to="/cart" class="nv-navbar__cart-menu">
        <UIcon href="/cart" class="nv-navbar__cart-menu-icon" name="el:shopping-cart" />
        <p>Cart</p>
      </NuxtLink>
    </div>
  </nav>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
@use "assets/style/utils" as *;
.nv-navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 14px;
  background-color: var(--ui-bg);
  height: var(--nv-navbar-height-mobile);

  @include start-from(medium-desktop) {
    padding: 16px 64px;
  }

  &__logo {
    display: flex;
    flex-direction: column;
    align-items: center;

    @include start-from(medium-desktop) {
      flex-direction: row;
      gap: 4px;
    }

    h1 {
      @include body(5);

      font-weight: bold;
      line-height: 100%;

      @include start-from(medium-desktop) {
        @include sub-heading(6);
      }
    }
  }

  &__menu-content {
    display: flex;
    align-items: center;
    gap: 28px;
  }

  &__cart-menu {
    display: flex;
    gap: 6px;
    align-items: center;

    p {
      display: none;

      @include start-from(medium-desktop) {
        @include body(2);

        display: block;
        font-weight: 600;
      }
    }
  }

  &__cart-menu-icon {
    color: var(--ui-secondary);
    height: 22px;
    width: 22px;
  }
}
</style>
