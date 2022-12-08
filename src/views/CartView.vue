<template>
  <div class="container text-center container-cart">
    <h1>Your Cart</h1>
    <table id="table-cart">
      <thead v-if="showTable">
        <td>ID</td>
        <td>Name</td>
        <td>Quantity</td>
        <td>Total Cost</td>
        <td>Image</td>
        <td></td>
      </thead>
      <CartItemCard
        v-for="product in products"
        :key="product.id"
        :product="product"
      />
    </table>

    <table id="table-cart-mobile">
      <thead v-if="showTable">
        <td>Image</td>
        <td>Name</td>
        <td>Total Cost</td>
        <td></td>
      </thead>
      <CartItemCardMobile
        v-for="product in products"
        :key="product.id"
        :product="product"
      />
    </table>

    <CartSummaryPaymentCard :products="products" />
  </div>
</template>

<script>
import CartItemCard from "../components/cart/CartItemCard.vue";
import CartItemCardMobile from "../components/cart/CartItemCardMobile.vue";
import CartSummaryPaymentCard from "../components/cart/CartSummaryPaymentCard.vue";

export default {
  components: {
    CartItemCard,
    CartSummaryPaymentCard,
    CartItemCardMobile,
  },
  methods: {},
  computed: {
    showTable() {
      // Nếu mảng sản phẩm có độ dài bằng 0 thì không showTable
      if (this.$store.state.cart.length === 0) {
        return false;
      }
      return true;
    },
    products() {
      return this.$store.getters.cartItems;
    },
  },
};
</script>

<style>
.container-cart {
  color: #fff;
}

.container-cart h1 {
  padding: 10px;
}

#table-cart,
#table-cart-mobile {
  margin: 0 auto;
  background-image: linear-gradient(to right bottom, #4ff48a, #1fe4ec);
  color: #333;
}

#table-cart thead,
#table-cart thead td,
#table-cart tr,
#table-cart tr td,
#table-cart-mobile thead,
#table-cart-mobile thead td,
#table-cart-mobile tr,
#table-cart-mobile tr td {
  border: 1px solid #fff;
}

thead {
  font-weight: 700;
}

#table-cart-mobile td {
  min-width: 20%;
}

#table-cart-mobile img {
  width: 100%;
}

td {
  padding: 10px;
  min-width: 100px;
}

@media screen and (max-width: 992px) {
  #table-cart {
    display: none;
  }
}

@media screen and (min-width: 992.5px) {
  #table-cart-mobile {
    display: none;
  }
}
</style>
