<template>
  <div
    class="rating-modal-background"
    :class="{ show: active }"
    @click="$emit('close-modal-rate')"
  ></div>
  <div class="rating-modal" :class="{ show: active }">
    <div
      class="btn btn-outline-danger float-end ms-2 rating-modal-close"
      @click="$emit('close-modal-rate')"
    >
      X
    </div>
    <div v-if="product" class="product-details">
      <h3 class="text-center">{{ product.name }}</h3>
      <div class="img-box">
        <img :src="product.image" alt="" />
      </div>
      <div class="text-center">
        <p>Please rate the product</p>
        <RateComponent :product="product" />
      </div>
    </div>
  </div>
</template>

<script>
import RateComponent from "@/components/rate/RateComponent.vue";
export default {
  props: ["product", "active"],
  components: {
    RateComponent,
  },
};
</script>

<style>
.rating-modal-background {
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

.rating-modal-background.show {
  display: block;
}

.rating-modal {
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

.rating-modal.show {
  left: 0;
}

.btn.rating-modal-close {
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
  .rating-modal {
    width: 350px;
  }
}
</style>
