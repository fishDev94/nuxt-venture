<template>
  <UModal
    class="nv-modal"
    :close="{ onClick: () => emit('close', false) }"
    :title
    aria-describedby="modal-dialog"
  >
    <template #footer>
      <div class="flex gap-2">
        <UButton
          color="neutral"
          class="font-bold"
          label="Dismiss"
          @click="emit('close', false)"
        />
        <UButton class="text-(--ui-bg) font-bold" label="Confirm" @click="emit('close', true)" />
      </div>
    </template>
  </UModal>
</template>

<script lang="ts" setup>
defineProps<{ title: string }>();
const emit = defineEmits<{ close: [boolean] }>();
</script>

<style lang="scss" >
@use "assets/style/utils" as *;

.nv-modal {
  h2 { 
    @include body(3);

    font-weight: 600;
    color: var(--ui-secondary);
  }
}
</style>
