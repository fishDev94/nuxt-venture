<template>
  <nav class="nv-navbar">
    <UiHamMenu />
    <div class="nv-navbar__logo">
      <UiNvLogo />
      <h1>nuxt venture</h1>
    </div>
    <UIcon class="nv-navbar__cart-icon" name="el:shopping-cart" />
  </nav>
</template>

<style lang="scss" scoped>
@use "assets/style/utils" as *;
.nv-navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 14px;
  background-color: var(--ui-bg);

  &__logo {
    display: flex;
    flex-direction: column;
    align-items: center;

    h1 {
      @include body(5);
      font-weight: bold;
      line-height: 100%;
    }
  }

  &__cart-icon {
    height: 24px;
    width: 24px;
  }
}
</style>
