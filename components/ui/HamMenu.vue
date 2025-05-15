<template>
  <div class="rm-ham-menu" @click="handleMenuClick">
    <span />
    <span />
    <span />
  </div>
</template>

<script lang="ts" setup>
const { toggleMenuPanel } = useUI()
const emit = defineEmits<{
    (e: 'onMenuClick'): void
}>();

const handleMenuClick = () => {
    emit('onMenuClick');
    toggleMenuPanel()
};
</script>

<style lang="scss" scoped>
@use "assets/style/utils" as *;

.rm-ham-menu {
  display: flex;
  flex-direction: column;
  gap: 3px;
  height: max-content;
  width: max-content;
  position: relative;

  @include start-from(tablet) {
    gap: 5px;
  }

  @include start-from(medium-desktop) {
    display: none;
  }

  span {
    background-color: var(--ui-primary);
    height: 3px;
    width: 18px;
    border-radius: 20px;
    transition: all 0.5s;
    pointer-events: none;

    @include start-from(tablet) {
      height: 4px;
      width: 26px;
    }
  }

  span:nth-child(3) {
    width: 10px;

    @include start-from(tablet) {
      width: 16px;
    }
  }
}
</style>
