<template>
  <form @submit.prevent="updateRatingInProduct">
    <div class="rate">
      <input
        type="radio"
        id="star5"
        name="rate"
        value="5"
        v-model="numStarRating"
      />
      <label for="star5" title="text">5 stars</label>
      <input
        type="radio"
        id="star4"
        name="rate"
        value="4"
        v-model="numStarRating"
      />
      <label for="star4" title="text">4 stars</label>
      <input
        type="radio"
        id="star3"
        name="rate"
        value="3"
        v-model="numStarRating"
      />
      <label for="star3" title="text">3 stars</label>
      <input
        type="radio"
        id="star2"
        name="rate"
        value="2"
        v-model="numStarRating"
      />
      <label for="star2" title="text">2 stars</label>
      <input
        type="radio"
        id="star1"
        name="rate"
        value="1"
        v-model="numStarRating"
      />
      <label for="star1" title="text">1 star</label>
    </div>
    <button class="button">Rate</button>
  </form>
</template>

<script>
import { ref } from "vue";
import axios from "axios";
import { APIURL } from "@/constant";
export default {
  props: ["product"],
  setup() {
    const userId = (function getUserId() {
      const userStorage = JSON.parse(localStorage.getItem("user"));
      if (userStorage) {
        return userStorage.id;
      }
    })();

    const numStarRating = ref(5);

    return { numStarRating, userId };
  },
  methods: {
    async updateRatingInProduct() {
      if (this.numStarRating) {
        await axios
          .get(`${APIURL}/products/${this.product.id}`)
          .then(({ data }) => {
            data.rating = data.rating.filter((i) => i.id !== this.userId);
            data.rating.push({
              id: this.userId,
              numRate: this.numStarRating,
            });
            axios.patch(`${APIURL}/products/${this.product.id}`, {
              rating: data.rating,
            });
            this.$swal.fire({
              icon: "success",
              title: `Your vote is ${this.numStarRating} &#9733;`,
              timer: 1500,
            });
          });
      } else {
        this.$swal.fire({
          icon: "warning",
          title: "Please choose the number of stars!",
          timer: 1500,
        });
      }
    },
  },
};
</script>

<style scoped>
.rate {
  display: flex;
  flex-direction: row-reverse;
  justify-content: center;
}
.rate:not(:checked) > input {
  position: absolute;
  top: -9999px;
}
.rate:not(:checked) > label {
  float: right;
  width: 1em;
  overflow: hidden;
  white-space: nowrap;
  cursor: pointer;
  font-size: 30px;
  color: #ccc;
}
.rate:not(:checked) > label:before {
  content: "★ ";
}
.rate > input:checked ~ label {
  color: #ffc700;
}
.rate:not(:checked) > label:hover,
.rate:not(:checked) > label:hover ~ label {
  color: #deb217;
}
.rate > input:checked + label:hover,
.rate > input:checked + label:hover ~ label,
.rate > input:checked ~ label:hover,
.rate > input:checked ~ label:hover ~ label,
.rate > label:hover ~ input:checked ~ label {
  color: #c59b08;
}

.button {
  width: 100%;
}
</style>
