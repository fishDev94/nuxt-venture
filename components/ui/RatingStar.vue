<template>
  <p class="nv-rating-star">
    <UIcon class="star-icon" name="material-symbols:star" />
    <strong>{{ rating }}</strong
    >/5
  </p>
</template>

<script lang="ts" setup>
defineProps<{ rating: number }>();
</script>

<style lang="scss" scoped>
@use "assets/style/utils" as *;

.nv-rating-star {
  @include body(6);

  display: flex;
  align-items: center;

  @include start-from(medium-desktop) {
    @include body(5);
  }

  .star-icon {
    color: rgba(var(--nv-alert-100));
  }
}
</style>
