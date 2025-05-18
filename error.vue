<template>
    <NuxtLayout name="default">
      <main class="error-page wrapper">
        <div class="error-page__container">
          <h1>{{error.statusCode}} {{ error.statusMessage }}</h1>
          <p>The page you are looking for does not exist.</p>
          <UButton class="error-page__btn" as="NuxtLink" :to="{ name: 'home' }" variant="outline"
            >Back to Homepage</UButton
          >
        </div>
      </main>
    </NuxtLayout>
</template>

<script lang="ts" setup>
import type { NuxtError } from '#app';

defineProps<{
    error: NuxtError
}>()
</script>

<style lang="scss" scoped>
.error-page {
  min-height: calc(100dvh - var(--nv-navbar-height-mobile));
  display: flex;
  align-items: center;
  justify-content: center;

  &__container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;

    h1 {
        color: var(--ui-secondary);
    }
  }

  &__btn {
    flex: 0 0 auto;
    width: max-content;
  }
}
</style>
