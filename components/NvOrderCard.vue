<template>
  <article class="nv-ordercard">
    <header v-if="data" class="nv-ordercard__header">
      <UiRatingStar :rating="data.rating" />
      <UButton
        icon="tabler:trash"
        variant="ghost"
        size="xs"
        class="font-bold"
        @click="handleRemoveClick"
        >Remove</UButton
      >
    </header>
    <main v-if="data" class="nv-ordercard__main">
      <h3>{{ data.name }}</h3>
      <NuxtImg
        class="nv-ordercard__main-img"
        :src="data.coverImage"
        :alt="data.name"
        :placeholder="`data:image/svg+xml;base64,${toBase64(shimmer())}`"
      />
      <section class="nv-ordercard__main-details">
        <p>{{ data.shortDescription }}</p>
        <div>
          <p><strong>Type:</strong> {{ data.type }}</p>
          <p><strong>City:</strong> {{ data.city }}</p>
        </div>
        <p><strong>Quantity:</strong> <strong class="text-(--ui-primary)">{{ quantity }}</strong></p>
      </section>
    </main>
    <footer v-if="data" class="nv-ordercard__footer">
      <strong>€ {{ data.price }}</strong>
    </footer>
  </article>
</template>

<script lang="ts" setup>
import { UNIT } from "~/constants";

const { productId, quantity = UNIT } = defineProps<{
  productId: number;
  quantity?: number;
}>();

const toast = useToast();
const { removeFromCart } = useCart()

const { data } = await useFetch(`/api/products/${productId}`, {
    getCachedData(key, nuxtApp) {
      return nuxtApp.payload.data[key] || nuxtApp.static.data[key];
    },
  })

const handleRemoveClick = () => {
  removeFromCart(productId)
  toast.add({
      title: "Experience removed from your itinerary!",
      ui: { title: "text-(--ui-secondary)" },
      duration: 2000,
      color: "error"
    });
}
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
