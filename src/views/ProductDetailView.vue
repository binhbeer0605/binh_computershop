<template>
  <div class="grid wide">
    <div v-if="product" class="row">
      <div class="row">
        <div class="col-lg-6 col-12 mt-5 img-box">
          <img :src="product.image" alt="" />
          <h2 class="mt-2 title">Related products</h2>
          <ul class="categorys">
            <li class="category-box" v-for="item in category" :key="item.id">
              <router-link :to="{ name: 'product', params: { id: item.id } }">
                <img :src="item.image" alt="" />
              </router-link>
            </li>
          </ul>
        </div>
        <div class="col-lg-6 col-12 mt-lg-5 detail-box">
          <h3 class="text-center">{{ product.name }}</h3>
          <div class="price price-sale text-center">
            <h3 class="show-price" v-if="isSale">
              Sale: ${{ priceIsSale.toFixed(2) }} <br />
              <span class="pt-2 text-warning"
                >from {{ filterDate(product.saleFrom) }} to
                {{ filterDate(product.saleTo) }}</span
              >
            </h3>
            <h3 v-else>Price: ${{ product.price.toFixed(2) }}</h3>
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
            <li class="text-random">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus
              beatae saepe aliquid asperiores nulla quas facere, amet excepturi,
              quo doloribus quibusdam quis, sint iste quasi cupiditate sit. Et,
              veritatis consectetur.
            </li>
          </ul>

          <div class="button-container">
            <button class="button add" @click="addToCart()">
              <font-awesome-icon :icon="['fas', 'cart-plus']" /> Add
            </button>
            <button
              class="button like"
              :class="{ liked: likedProduct }"
              @click="addToFavorite()"
            >
              <font-awesome-icon :icon="['far', 'thumbs-up']" /> {{ totalLike }}
            </button>
          </div>
        </div>
      </div>
      <div class="row">
        <CommentComponent style="margin-bottom: 50px" :product="product" />
        <ShowRatingComponent :product="product" />
      </div>
    </div>
    <LoadingComponent v-else />
  </div>
</template>

<script>
import { ref } from "vue";
import axios from "axios";
import { APIURL } from "@/constant";
import LoadingComponent from "../components/loadding/LoadingComponent.vue";
import CommentComponent from "../components/comment/CommentComponent.vue";
import ShowRatingComponent from "../components/rate/ShowRatingComponent.vue";
import { useRoute } from "vue-router";
export default {
  components: {
    LoadingComponent,
    CommentComponent,
    ShowRatingComponent,
  },
  setup() {
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = ref();
    if (user) {
      userId.value = user.id;
    }

    const route = useRoute();
    const category = ref();
    function getCategory() {
      axios
        .get(`${APIURL}/products`)
        .then((response) => {
          return response.data;
        })
        .then((data) => {
          const item = data.find((i) => i.id == route.params.id);
          category.value = data.filter(
            (i) => i.category == item.category && i.id != item.id
          );
        });
    }

    getCategory();

    return { userId, category, getCategory };
  },
  created() {
    this.$store.dispatch("fetchProduct", { id: this.$route.params.id });
  },
  watch: {
    cartQuantity(newValue, oldValue) {
      if (newValue !== oldValue) {
        this.$swal.fire({
          icon: "success",
          title: "Added 1 product to your cart!",
          timer: 1000,
        });
      }
    },
    $route(current, prev) {
      if (current.params.id && prev.params.id) {
        if (current.params.id !== prev.params.id) {
          this.updatePage(this.$route.params.id);
        }
      }
    },
  },
  methods: {
    addToCart() {
      this.$store.commit("addToCart", this.product);
    },
    addToFavorite() {
      this.$store.commit("addToFavorite", this.product);
    },
    updatePage() {
      this.$store.dispatch("fetchProduct", { id: this.$route.params.id });
      this.getCategory();
    },
    filterDate(value) {
      const date = new Date(value);
      const day = date.getDate();
      const month = date.getMonth() + 1;
      return ` ${day}/${month}`;
    },
  },
  computed: {
    totalLike() {
      return this.product.userLike.length;
    },
    product() {
      return this.$store.state.product;
    },
    likedProduct() {
      return this.product.userLike.some((i) => i === this.userId);
    },
    cartQuantity() {
      return this.$store.getters.cartQuantity;
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

<style scoped>
* {
  color: #fff;
}

.img-box {
  padding: 20px 15px;
}

.categorys {
  max-width: 100%;
  overflow-x: auto;
  display: flex;
  list-style: none;
  padding-left: 0;
}

.categorys::-webkit-scrollbar {
  width: 0;
  height: 15px;
  /* Chiều rộng vùng chứa scrollbar */
}

.categorys::-webkit-scrollbar-track {
  background: #2d3399;
  border-radius: 5px;
  /* Màu nền ngoài của thanh scrollbar */
}

.categorys::-webkit-scrollbar-thumb {
  background-color: #4ff48a;
  /* Màu của thanh cuộn (scroll thumb) */
  border-radius: 10px;
  /* Bo góc scroll thumb */
  border: 3px solid #2d3399;
  /* Không hỗ trợ padding, margin, transition nên dùng viền cùng màu nên để padding scroll thumb */
}

.categorys::-webkit-scrollbar-thumb:hover {
  filter: brightness(150%);
  /* Hiệu ứng di chuột đổi màu*/
}

.categorys li:first-child {
  padding-left: 0;
}

.categorys li:last-child {
  padding-right: 0;
}

.category-box {
  flex-shrink: 0;
  width: calc(100% / 4);
}

.category-box > a > img {
  width: 100%;
  height: 90px;
  object-fit: cover;
  transition: all 0.2s linear;
}

.category-box > a {
  overflow: hidden;
  display: block;
  border-radius: 5px;
}

.category-box > a:hover > img {
  transform: scale(1.2);
  transition: all 0.2s linear;
}

.img-box > img {
  background-color: #fff;
  width: 100%;
  max-height: 360px;
  box-shadow: 0 0 10px #4ff48a;
  border-radius: 5px;
  object-fit: contain;
}

.detail-box {
  padding: 20px 15px;
}

.description {
  list-style: none;
  padding-left: 30px;
}

li {
  padding: 5px;
}

.text-random {
  margin: 10px 0;
}

.button {
  font-size: 20px;
}

.button.add {
  color: #333;
}

.button.like {
  min-width: calc(50% / 2);
  background-color: transparent;
  background-image: none;
  border: 1px solid#3131f3;
  margin-left: 5%;
  color: #fff;
}

.button.like.liked {
  background-image: linear-gradient(to right bottom, #3131f3, #173196);
}

.button.like svg {
  color: #fff;
}

@media screen and (max-width: 400px) {
  .category-box {
    width: calc(100% / 2);
  }
}

@media screen and (min-width: 400px) and (max-width: 600px) {
  .category-box {
    width: calc(100% / 3);
  }
}
</style>
