<template>
  <div class="card card-hover">
    <!-- Favorite -->
    <div
      class="product-favourite"
      :class="{
        show: isLike,
      }"
      v-if="isLike"
    >
      <font-awesome-icon :icon="['fas', 'check']" />
      <span>Favorite</span>
    </div>

    <!-- SaleOff -->
    <div class="product-sale-off" v-if="isSale">
      <span class="product-sale-off-label">Sale</span>
      <span class="product-sale-off-percent">{{ product.saleOff }}%</span>
    </div>
    <!-- IMG -->
    <div class="bg-white">
      <div class="card-img-top">
        <img :src="product.image" alt="" />
      </div>
      <div class="card-body">
        <!-- Name -->
        <h4 class="card-title text-center">
          <router-link :to="{ name: 'product', params: { id: product.id } }">{{
            product.name
          }}</router-link>
        </h4>
        <div class="price price-sale">
          <h5 class="show-price" v-if="isSale">
            Sale: ${{ priceIsSale.toFixed(2) }}
          </h5>
          &nbsp;
          <h5 v-if="isSale">
            <Del>Price: ${{ product.price.toFixed(2) }}</Del>
          </h5>
          <h5 class="show-price" v-else>
            Price: ${{ product.price.toFixed(2) }}
          </h5>
        </div>
        <p class="text-muted">{{ product.category }}</p>
        <p class="text-muted">
          {{ totalLike }}
          <span v-if="totalLike <= 1">&nbsp;like&nbsp;</span>
          <span v-else>&nbsp;likes&nbsp;</span>
        </p>
        <!-- Button -->
        <div class="button-box">
          <button class="button" @click="$emit('view-product', product)">
            <font-awesome-icon :icon="['fas', 'eye']" />
          </button>
          <!-- <button
            class="button button-red"
            :class="{ 'button-unlike': isLike }"
            @click="handleLikeOrDislikeProduct(product.id)"
            v-if="userId"
          >
            <div v-if="!isLike">
              <font-awesome-icon :icon="['fas', 'heart']" />
            </div>
            <div v-else>
              <font-awesome-icon :icon="['fas', 'heart-crack']" />
            </div>
          </button> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  props: ["product"],
  setup() {
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = ref();
    if (user) {
      userId.value = user.id;
    }

    return { userId };
  },
  computed: {
    isLike() {
      return this.product.userLike.some((i) => i === this.userId);
    },
    totalLike() {
      return this.product.userLike.length;
    },
    isSale() {
      const daySaleFrom = new Date(this.product.saleFrom);
      const daySaleTo = new Date(this.product.saleTo);

      const currentDay = new Date();

      if (currentDay >= daySaleFrom && currentDay < daySaleTo) {
        return true;
      }
      return false;
    },
    priceIsSale() {
      return (
        this.product.price - (this.product.price * this.product.saleOff) / 100
      );
    },
  },
};
</script>

<style>
.bg-white {
  background-color: #fff;
  border-radius: 5px;
}
.card.card-hover {
  background-color: transparent;
  border-radius: 5px;
  --bs-card-border-width: 0 !important;
}
.card:hover .bg-white {
  box-shadow: 0 0 10px #fff;
}

.product-name,
.text-muted {
  padding: 10px 0;
  text-align: center;
}

.card-img-top {
  overflow: hidden;
  width: 100%;
  max-height: 178.83px;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}

.card-img-top img {
  width: 100%;
  max-height: 178.83px;
  transition: all 0.5s ease;
  object-fit: cover;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}

.card:hover .card-img-top img {
  transform: scale(1.1);
  transition: transform 0.5s ease;
}

.price,
.text-muted {
  color: gray;
  display: flex;
  justify-content: center;
}

.price h5 {
  display: inline-block;
  margin: 0;
  padding: 10px 0;
}

.card-title a {
  font-size: 1.6rem;
  font-weight: 700;
  color: #333;
  line-height: 1.8rem;
  height: 3.6rem;
  margin: 10px 10px 6px;
  overflow: hidden;
  display: block;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  text-decoration: none;
}

.card-title a:hover {
  color: #45db7f;
}

.price .show-price {
  color: #ff6533;
}

.description {
  list-style: none;
  text-align: left;
  font-size: 0.85rem;
}

.description li {
  padding-top: 0.5rem;
  font-size: 1rem;
}

.button-box {
  display: flex;
  justify-content: space-around;
}

.button {
  padding: 10px;
  background-image: linear-gradient(to right bottom, #4ff48a, #1fe4ec);
  border: none;
  color: #333;
  font-weight: bold;
  font-size: 1.15rem;
  border-radius: 5px;
  cursor: pointer;
  max-height: 50px;
  position: relative;
  overflow: hidden;
  min-width: calc(90% / 2);
  filter: brightness(90%);
}

.button svg {
  color: #333;
}

.button.button-red {
  color: #fff;
  background-image: linear-gradient(to right bottom, #c31432, #5d0844);
}

.button.button-red svg {
  color: #fff;
}

.button.button-unlike svg {
  color: #666;
}

.button.button-red.button-unlike {
  background-image: linear-gradient(to right bottom, #d3cce3, #e9e4f0);
}

.button:not(.disable):hover::after {
  animation: 1s ease 0s normal none 1 running fixedAnim;
  animation: 1s ease 0s normal none 1 running fixedAnim;
  -webkit-animation: 1s ease 0s normal none 1 running fixedAnim;
  -moz-animation: 1s ease 0s normal none 1 running fixedAnim;
}

.button::after {
  background: rgba(0, 0, 0, 0)
    linear-gradient(
      to right,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.8) 100%
    )
    repeat scroll 0 0;
  content: "";
  display: block;
  height: 100%;
  position: absolute;
  right: -75%;
  top: 0;
  transform: skewX(-25deg);
  width: 50%;
  z-index: 2;
}

@-webkit-keyframes fixedAnim {
  0% {
    right: 125%;
  }
  125% {
    right: 0;
  }
}

@-moz-keyframes fixedAnim {
  0% {
    right: 125%;
  }
  125% {
    right: 0;
  }
}

@keyframes fixedAnim {
  0% {
    right: 125%;
  }
  125% {
    right: 0;
  }
}

.product-favourite {
  position: absolute;
  display: none;
  top: 10px;
  left: 0px;
  color: #ff6533;
  padding: 5px;
  background-color: currentColor;
  font-size: 1.6rem;
  font-weight: 500;
  line-height: 1.6rem;
  padding-right: 4px;
  border-top-right-radius: 3px;
  border-bottom-right-radius: 3px;
  user-select: none;
  z-index: 10;
}

.product-favourite.show {
  display: block;
}

.product-favourite::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: -6px;
  border-top: 6px solid currentColor;
  border-left: 6px solid transparent;
  filter: brightness(60%);
}

.product-favourite span {
  color: white;
}

.product-favourite svg.svg-inline--fa.fa-check {
  color: white;
  font-size: 0.9rem;
  margin: 0 2px 0 4px;
}

.product-sale-off {
  position: absolute;
  right: 7.5px;
  top: 0;
  width: 50px;
  height: 50px;
  background-color: rgba(255, 216, 64, 0.94);
  text-align: center;
  border-top-right-radius: 3px;
  user-select: none;
  z-index: 10;
}

.product-sale-off::after {
  content: "";
  position: absolute;
  left: 0px;
  bottom: -6px;
  border-width: 0 25px 6px;
  border-style: solid;
  border-color: transparent rgba(255, 216, 64, 0.94) transparent
    rgba(255, 216, 64, 0.94);
}

.product-sale-off-percent {
  color: #ee4d2d;
  font-weight: 600;
  font-size: 1.6rem;
  line-height: 1.6rem;
  position: relative;
  top: 5px;
  display: block;
  margin-top: 0.5rem;
}

.product-sale-off-label {
  font-size: 1.6rem;
  line-height: 1.6rem;
  color: white;
  text-transform: uppercase;
  font-weight: 600;
  position: relative;
  top: 5px;
  display: block;
}
</style>
