<template>
  <div class="cart-item-card" v-if="cart_total">
    <h3>Cart Total: ${{ cart_total.toFixed(2) }}</h3>

    <button class="button mb-4">
      <router-link style="display: block; color: #333" to="/pay"
        >Pay by Credit Card</router-link
      >
    </button>
  </div>

  <div class="cart-item-card cart-blank" v-else>
    <h3>No product in Cart</h3>
  </div>
</template>

<script>
export default {
  props: ["products"],
  computed: {
    cart_total() {
      return this.$store.getters.cartTotal;
    },
  },
};
</script>

<style scoped>
.cart-item-card h3 {
  padding: 10px;
}
.cart-blank {
  height: calc(100vh - 100px);
}
button.button {
  padding: 0;
}
a {
  padding: 10px;
}
</style>
