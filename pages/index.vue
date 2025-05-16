<template>
  <main>
    <NvHero />
    <div class="home-main wrapper">
      <section class="nv-top-section">
        <h3>Discover our hotels</h3>
        <NvCarousel :data="hotels"/>
      </section>
      <section class="nv-top-section">
        <h3>Recommended experiences</h3>
        <NvCarousel :data="experiences"/>
      </section>
    </div>
  </main>
</template>

<script lang="ts" setup>
import NvCarousel from '~/components/ui/NvCarousel.vue';

const { data: hotels } = useFetch('/api/products', {
  query: {
    type: 'hotel'
  }
})

const { data: experiences } = useFetch('/api/products', {
  query: {
    type: 'experience'
  }
})

</script>

<style lang="scss" scoped>
@use "assets/style/utils" as *;
  .home-main {
    padding-block: 24px;
  }

  .nv-top-section {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin: 24px 0;

    @include start-from(medium-desktop) {
      margin: 32px 0;
    }

    h3 {
      color: var(--ui-secondary);
    }
  }
</style>