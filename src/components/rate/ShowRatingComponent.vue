<template>
  <div class="col-lg-6 col-12 rating-box" v-if="showMediumRate">
    <h2 class="text-center pb-5 title">All of rating</h2>
    <div class="star-medium">
      {{ showMediumRate }}
      <font-awesome-icon :icon="['fas', 'star']" style="color: #ffdf00" />
      / 5 <font-awesome-icon :icon="['fas', 'star']" style="color: #ffdf00" />
    </div>
    <div class="progress-bar">
      <span class="progress">
        <span
          class="progress1"
          style="background-color: #c23824"
          :style="{ width: percent.oneStar + '%' }"
          >{{ percent.oneStar }}%</span
        >
        <span
          class="progress1"
          style="background-color: #f59d00"
          :style="{ width: percent.twoStar + '%' }"
          >{{ percent.twoStar }}%</span
        >
        <span
          class="progress1"
          style="background-color: #ffe168"
          :style="{ width: percent.threeStar + '%' }"
          >{{ percent.threeStar }}%</span
        >
        <span
          class="progress1"
          style="background-color: #4cd964"
          :style="{ width: percent.fourStar + '%' }"
          >{{ percent.fourStar }}%</span
        >
        <span
          class="progress1"
          style="background-color: #1caf5e"
          :style="{ width: percent.fiveStar + '%' }"
          >{{ percent.fiveStar }}%</span
        >
      </span>
    </div>
    <div class="rate-detail">
      <div class="rate-detail-item" style="border-color: #c23824">
        <font-awesome-icon
          :icon="['fas', 'face-angry']"
          style="color: #c23824"
        />
        {{ quantityOfStar.oneStar }}
      </div>
      <div class="rate-detail-item" style="border-color: #f59d00">
        <font-awesome-icon
          :icon="['fas', 'face-frown']"
          style="color: #f59d00"
        />
        {{ quantityOfStar.twoStar }}
      </div>
      <div class="rate-detail-item" style="border-color: #ffe168">
        <font-awesome-icon :icon="['fas', 'face-meh']" style="color: #ffe168" />
        {{ quantityOfStar.threeStar }}
      </div>
      <div class="rate-detail-item" style="border-color: #4cd964">
        <font-awesome-icon
          :icon="['fas', 'face-smile']"
          style="color: #4cd964"
        />
        {{ quantityOfStar.fourStar }}
      </div>
      <div class="rate-detail-item" style="border-color: #1caf5e">
        <font-awesome-icon
          :icon="['fas', 'face-laugh-squint']"
          style="color: #1caf5e"
        />
        {{ quantityOfStar.fiveStar }}
      </div>
    </div>
  </div>
  <div class="col-lg-6 col-12 rating-box" v-else>
    <h2 class="text-center pb-5 title">Do not have rating!</h2>
  </div>
</template>

<script>
import { ref } from "vue";
import axios from "axios";
import { APIURL } from "@/constant";
import { useRoute } from "vue-router";
export default {
  props: ["product"],
  setup() {
    const route = useRoute();

    const quantityOfStar = ref({
      oneStar: null,
      twoStar: null,
      threeStar: null,
      fourStar: null,
      fiveStar: null,
    });

    const percent = ref({
      oneStar: null,
      twoStar: null,
      threeStar: null,
      fourStar: null,
      fiveStar: null,
    });

    const mediumRate = ref();

    async function getRating() {
      axios
        .get(`${APIURL}/products/${route.params.id}`)
        .then((res) => res.data)
        .then((data) => {
          quantityOfStar.value.oneStar = data.rating.filter(
            (i) => i.numRate == 1
          ).length;
          quantityOfStar.value.twoStar = data.rating.filter(
            (i) => i.numRate == 2
          ).length;
          quantityOfStar.value.threeStar = data.rating.filter(
            (i) => i.numRate == 3
          ).length;
          quantityOfStar.value.fourStar = data.rating.filter(
            (i) => i.numRate == 4
          ).length;
          quantityOfStar.value.fiveStar = data.rating.filter(
            (i) => i.numRate == 5
          ).length;

          percent.value.oneStar =
            (quantityOfStar.value.oneStar * 100) / data.rating.length;
          percent.value.twoStar =
            (quantityOfStar.value.twoStar * 100) / data.rating.length;
          percent.value.threeStar =
            (quantityOfStar.value.threeStar * 100) / data.rating.length;
          percent.value.fourStar =
            (quantityOfStar.value.fourStar * 100) / data.rating.length;
          percent.value.fiveStar =
            (quantityOfStar.value.fiveStar * 100) / data.rating.length;

          mediumRate.value =
            (quantityOfStar.value.oneStar +
              quantityOfStar.value.twoStar * 2 +
              quantityOfStar.value.threeStar * 3 +
              quantityOfStar.value.fourStar * 4 +
              quantityOfStar.value.fiveStar * 5) /
            data.rating.length;
        });
    }
    getRating();

    return {
      quantityOfStar,
      percent,
      mediumRate,
      getRating,
    };
  },
  watch: {
    $route() {
      this.updatePage(this.$route.params.id);
    },
  },
  methods: {
    updatePage() {
      this.getRating();
    },
  },
  computed: {
    showMediumRate() {
      if (this.mediumRate) {
        return this.mediumRate.toFixed(1);
      }
      return 0;
    },
  },
};
</script>

<style>
.rating-box {
  padding: 20px 15px;
}

.star-medium {
  text-align: center;
  font-size: 2rem;
  margin-bottom: 10px;
}

.progress {
  height: 25px !important;
}

.progress .progress1 {
  color: #333;
  font-size: 1.3rem;
  font-weight: 700;
  line-height: 25px;
}

.rate-detail {
  display: flex;
  margin: 20px 0;
}

.rate-detail .rate-detail-item {
  width: 20%;
  height: 30px;
  background-color: #51506c;
  margin: 0 5px;
  color: #fff;
  text-align: center;
  line-height: 30px;
  font-size: 2rem;
  border-radius: 5px;
  border: 2px solid;
}
</style>
