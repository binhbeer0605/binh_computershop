<template>
  <div
    class="drawer-background"
    :class="{ show: active }"
    @click="$emit('close-product-drawer')"
  ></div>
  <div class="drawer" :class="{ show: active }">
    <div
      class="btn btn-outline-danger float-end ms-2 drawer-close"
      @click="$emit('close-product-drawer')"
    >
      X
    </div>

    <div v-if="product" class="product-details">
      <h3 class="text-center">{{ product.name }}</h3>
      <div class="img-box">
        <img :src="product.image" alt="" />
      </div>
      <ul class="description">
        <li>
          <font-awesome-icon :icon="['fas', 'display']" />
          {{ product.description.display }} inch
        </li>
        <li>
          <font-awesome-icon :icon="['fas', 'microchip']" />
          {{ product.description.core }}
        </li>
        <li>
          <font-awesome-icon :icon="['fas', 'memory']" />
          {{ product.description.ram }}
        </li>
        <li>
          <font-awesome-icon :icon="['fas', 'hard-drive']" />
          {{ product.description.ssd }}
        </li>
        <li>
          <font-awesome-icon :icon="['fas', 'weight-hanging']" />
          {{ product.description.weight }} kg
        </li>
        <li>
          <font-awesome-icon :icon="['fas', 'gamepad']" />
          {{ product.description.vga }}
        </li>
      </ul>

      <div class="price price-sale text-center">
        <h3 class="show-price" v-if="isSale">
          Sale: ${{ priceIsSale.toFixed(2) }}
        </h3>
        <h3 v-else>Price: ${{ product.price.toFixed(2) }}</h3>
      </div>

      <div class="button-container">
        <button
          class="button button-red remove"
          @click="removeFromCart()"
          :class="{ disable: !product_total }"
          :disabled="!product_total"
        >
          <font-awesome-icon :icon="['fas', 'trash']" /> Remove
        </button>
        <button class="button add" @click="addToCart()">
          <font-awesome-icon :icon="['fas', 'cart-plus']" /> Add
        </button>
      </div>

      <div class="cart-total" v-if="product_total">
        <h3>In Cart</h3>
        <h4>{{ product_total }}</h4>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["product", "active"],
  methods: {
    addToCart() {
      this.$store.commit("addToCart", this.product);
    },
    removeFromCart() {
      if (this.product_total !== 1) {
        this.$store.commit("removeFromCart", this.product);
      } else {
        this.$swal({
          icon: "warning",
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, Delete it!",
          showCancelButton: true,
          text: "This will cause the product to be removed from the cart! \nAre you sure?",
        }).then((result) => {
          if (result.value) {
            this.$swal.fire(
              "Deleted!",
              "Your product has been deleted.",
              "success",
              this.$store.commit("deleteFromCart", this.product)
            );
          }
        });
      }
    },
  },
  computed: {
    product_total() {
      return this.$store.getters.productQuantity(this.product);
    },
    isSale() {
      return this.product.description.isSale;
    },
    priceIsSale() {
      return (
        this.product.price -
        (this.product.price * this.product.description.saleOff) / 100
      );
    },
  },
};
</script>

<style>
.drawer-background {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  background-color: rgba(124, 124, 124, 0.55);
  z-index: 100;
  display: none;
  transition: display 0.5s;
}

.drawer-background.show {
  display: block;
}

.drawer {
  width: 100vw;
  height: 100vh;
  background-color: white;
  position: fixed;
  top: 0;
  left: -105vw;
  padding: 15px;
  transition: left 0.5s;
  z-index: 1000;
}

.drawer.show {
  left: 0;
}

.btn.drawer-close {
  font-size: 2rem;
}

.product-details {
  display: flex;
  justify-content: center;
  flex-direction: column;
}

.product-details .img-box {
  width: 200px;
  height: 200px;
  border: 1px solid #4ff48a;
  border-radius: 50%;
  overflow: hidden;
  margin: 10px auto;
}

.product-details .img-box img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.product-details .description {
  list-style: none;
  line-height: 1.5rem;
  text-align: left;
  margin: 0 auto;
  width: 250px;
}

.button-container,
.cart-total {
  text-align: center;
  padding: 10px;
}

.product-details .button-container button {
  margin: 0 5px 0 5px;
  cursor: pointer;
}

.button-container .button.disable {
  cursor: not-allowed;
  background-image: linear-gradient(to right bottom, gray, gray);
  color: #cfcfcf;
}

.price h3 {
  padding: 10px 0;
}

.show-price {
  color: #ff6533;
}

h3.text-center {
  font-size: 1.55rem;
}

@media (min-width: 500px) {
  .drawer {
    width: 350px;
  }
}
</style>
