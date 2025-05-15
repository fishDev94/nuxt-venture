<template>
  <ul :class="['nav-menu', { active: isMenuOpen }]">
    <NuxtLink id="/" class="nav-menu__link" to="/" @click="handleLinkClick"
      >Home <UIcon class="nav-menu__icon" name="material-symbols:home"
    /></NuxtLink>
    <NuxtLink id="about-us" class="nav-menu__link" to="about-us" @click="handleLinkClick"
      >About us <UIcon class="nav-menu__icon" name="mdi:users"
    /></NuxtLink>
  </ul>
</template>

<script lang="ts" setup>
const { isMenuOpen, toggleMenuPanel } = useUI();

const handleLinkClick = () => {
  toggleMenuPanel();
};
</script>

<style lang="scss" scoped>
@use "assets/style/utils" as *;

.nav-menu {
  visibility: hidden;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 14px 36px;
  position: absolute;
  top: var(--nv-navbar-height-mobile);
  left: -100vw;
  z-index: 1;
  background-color: var(--ui-bg);
  width: 100%;
  height: calc(100dvh - var(--nv-navbar-height-mobile));
  transition: 0.15s all;

  @include start-from(medium-desktop) {
    visibility: visible;
    position: static;
    top: auto;
    left: auto;
    flex-direction: row;
    width: auto;
    height: auto;
    padding: 0;
    gap: 28px;

    &__link {
      gap: 6px;
      flex-direction: row-reverse;
    }
  }

  &__link {
    @include body(2);

    display: flex;
    align-items: center;
    justify-content: space-between;
    color: var(--ui-secondary);
    font-weight: 600;
  }

  &__icon {
    height: 22px;
    width: 22px;
  }
}

.active {
  visibility: visible;
  left: 0;
}
</style>
