<template>
  <div class="nv-skeleton-card-wrapper">
    <UCard class="nv-skeleton-card">
      <template #header>
        <USkeleton class="h-34 lg:h-48 rounded-b-none" />
      </template>

      <template #default>
        <div class="nv-skeleton-card__footer-container">
          <div class="nv-skeleton-card__footer-subhead">
            <USkeleton class="h-6 rounded-none" />
            <div class="flex flex-col gap-[4px]">
              <USkeleton class="w-[272px] h-3 rounded-none" />
              <USkeleton class="w-[240px] h-3 rounded-none" />
              <USkeleton class="w-[180px] h-3 rounded-none" />
            </div>
          </div>
          <div class="nv-skeleton-card__info">
            <USkeleton class="w-[60px] h-4 rounded-none" />
            <USkeleton class="w-[60px] h-4 rounded-none" />
          </div>
        </div>
      </template>
    </UCard>
  </div>
</template>

<style lang="scss" scoped>
@use "assets/style/utils" as *;

.nv-skeleton-card-wrapper {
  display: flex;
  flex: 0 0 230px;
  scroll-snap-align: start;

  @include start-from(tablet) {
    min-width: 320px;
  }
}

.nv-skeleton-card {
  display: flex;
  flex-direction: column;
  overflow: hidden;

  & > * {
    flex: 1;
  }

  &__footer-subhead {
    display: flex;
    flex-direction: column;
    gap: 6px;

    @include start-from(medium-desktop) {
      gap: 12px;
    }
  }

  &__footer-container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 8px;
    height: 100%;

    @include start-from(medium-desktop) {
      gap: 12px;
    }
  }

  &__info {
    display: flex;
    justify-content: space-between;
    align-items: center;

    &--price {
      @include body(5);

      @include start-from(medium-desktop) {
        @include body(4);
      }
    }
  }
}
</style>
