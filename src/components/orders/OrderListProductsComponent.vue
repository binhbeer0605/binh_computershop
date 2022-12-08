<template>
  <li>
    <p>{{ product.name }} x {{ product.quantity }}</p>
    <button
      v-if="!ship"
      class="button"
      @click="$emit('open-modal-rate', product)"
    >
      <font-awesome-icon :icon="['fas', 'star']" /> Rate product
      <font-awesome-icon :icon="['fas', 'star']" />
    </button>
  </li>
</template>

<script>
export default {
  props: ["product", "ship"],
};
</script>

<style scoped>
svg {
  color: #fec321;
  filter: brightness(120%);
}

button {
  min-width: 0;
}
</style>
