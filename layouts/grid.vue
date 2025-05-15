<template>
  <div class="grid">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.grid {
  gap: 16px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);

  @media (min-width: 744px) {
    gap: 24px;
    grid-template-columns: repeat(12, 1fr);
  }
}
</style>
