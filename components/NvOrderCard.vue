<template>
  <article class="nv-ordercard">
    <header class="nv-ordercard__header">
      <UiRatingStar :rating="dataCard.rating" />
      <UButton
        icon="tabler:trash"
        variant="ghost"
        size="xs"
        class="font-bold"
        @click="handleRemoveClick"
        >Remove</UButton
      >
    </header>
    <main class="nv-ordercard__main">
      <h3>{{ dataCard.name }}</h3>
      <NuxtImg
        class="nv-ordercard__main-img"
        :src="dataCard.coverImage"
        :alt="dataCard.name"
      />
      <section class="nv-ordercard__main-details">
        <p>{{ dataCard.shortDescription }}</p>
        <div>
          <p><strong>Type:</strong> {{ dataCard.type }}</p>
          <p><strong>City:</strong> {{ dataCard.city }}</p>
        </div>
        <p><strong>Quantity:</strong> <strong class="text-(--ui-primary)">{{ quantity }}</strong></p>
      </section>
    </main>
    <footer class="nv-ordercard__footer">
      <strong>€ {{ dataCard.price }}</strong>
    </footer>
  </article>
</template>

<script lang="ts" setup>
import type { Product } from "~/types/Products";
import { UNIT } from "~/constants";

const { dataCard, quantity = UNIT } = defineProps<{
  dataCard: Product;
  quantity?: number;
}>();

const handleRemoveClick = () => {
  console.log("remove clicked", dataCard.id);
};
</script>

<style lang="scss" scoped>
@use "assets/style/utils" as *;

.nv-ordercard {
  display: flex;
  flex-direction: column;
  gap: 16px;

  &__header {
    display: flex;
    justify-content: space-between;
  }

  &__main {
    display: grid;
    grid-template-areas:
      "image title"
      "details details";
    grid-template-columns: 56px 1fr;
    column-gap: 8px;
    row-gap: 6px;

    @include start-from(medium-desktop) {
      grid-template-columns: 152px 1fr;
      grid-template-areas:
        "title title"
        "image details";
      gap: 16px;
    }

    h3 {
      @include body(3);

      grid-area: title;
      font-weight: 600;
    }
  }

  &__main-img {
    grid-area: image;
    height: 56px;
    width: 56px;
    object-fit: cover;
    overflow: hidden;
    border-radius: 8px;

    @include start-from(medium-desktop) {
      height: 152px;
      width: 152px;

      border-radius: 16px;
    }
  }

  &__main-details {
    grid-area: details;
    display: flex;
    flex-direction: column;
    gap: 8px;

    p {
      @include body(5);
    }
  }

  &__footer {
    display: flex;
    justify-content: end;

    @include start-from(medium-desktop) {
      @include body(1);
    }
  }
}
</style>
