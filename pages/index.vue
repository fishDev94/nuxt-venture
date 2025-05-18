<template>
  <main>
    <NvHero />
    <div class="home-main wrapper">
      <section class="nv-top-section">
        <h3>Discover our hotels</h3>
        <NvCarousel>
          <template v-if="isHotelsCallSuccessed">
            <UiNvCard
              v-for="(product, idx) in hotels"
              :id="product.id"
              :key="`${product.type}-${idx}`"
              :title="product.name"
              :price="product.price"
              :description="product.shortDescription"
              :src="product.coverImage"
              :rating="product.rating"
            />
          </template>
          <template v-else>
            <SkeletonNvCard v-for="(_, idx) in Array(SKT_SHORT_CAROUSEL)" :key="`skeleton-hotels-${idx}`"/>
          </template>
        </NvCarousel>
      </section>
      <section class="nv-top-section">
        <h3>Recommended experiences</h3>
        <NvCarousel>
          <template v-if="isExperiencesCallSuccessed">
            <UiNvCard
              v-for="(product, idx) in experiences"
              :id="product.id"
              :key="`${product.type}-${idx}`"
              :title="product.name"
              :price="product.price"
              :description="product.shortDescription"
              :src="product.coverImage"
              :rating="product.rating"
            />
          </template>
          <template v-else>
            <SkeletonNvCard v-for="(_, idx) in Array(SKT_LONG_CAROUSEL)" :key="`skeleton-exp-${idx}`"/>
          </template>
        </NvCarousel>
      </section>
    </div>
  </main>
</template>

<script lang="ts" setup>
import NvCarousel from "~/components/ui/NvCarousel.vue";
import { SKT_LONG_CAROUSEL, SKT_SHORT_CAROUSEL } from "~/constants";

definePageMeta({
  name: "home",
});

const { data: hotels, status: hotelsCallStatus } = useFetch("/api/products", {
  query: {
    type: "hotel",
  },
});

const { data: experiences, status: experiencesCallStatus } = useFetch(
  "/api/products",
  {
    query: {
      type: "experience",
    },
  }
);

const isHotelsCallSuccessed = computed(
  () => hotelsCallStatus.value === "success"
);
const isExperiencesCallSuccessed = computed(
  () => experiencesCallStatus.value === "success"
);
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
