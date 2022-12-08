<template>
  <div class="col-12 order-box">
    <div class="row status-order align-items-center">
      <div class="col-lg-6 col-12">
        <span class="time-order"
          >Date Order: {{ filterDate(order.dateOrder) }}</span
        >
      </div>
      <div class="col-lg-2 col-6">
        <span class="price-order"
          ><font-awesome-icon :icon="['fas', 'money-check-dollar']" /> ${{
            order.totalCart.toFixed(2)
          }}</span
        >
      </div>
      <div class="col-lg-4 col-6">
        <span class="is-delivering" v-if="order.isShip"
          >Is Delivering <font-awesome-icon :icon="['fas', 'truck-fast']"
        /></span>
        <span class="delivered" v-else
          >Delivered <font-awesome-icon :icon="['fas', 'gift']"
        /></span>

        <button
          class="submit button ms-5"
          @click="submitOrder"
          v-if="order.isShip"
        >
          Confirm <font-awesome-icon :icon="['fas', 'check']" />
        </button>
      </div>
    </div>
    <div class="row bill-detail">
      <div class="col-6">
        <h3 class="mt-3">Customer</h3>
        <p>
          <font-awesome-icon :icon="['fas', 'user']" /> {{ order.fullName }}
        </p>
        <p>
          <font-awesome-icon :icon="['fas', 'phone']" /> {{ order.phoneNumber }}
        </p>
        <p>
          <font-awesome-icon :icon="['fas', 'location-dot']" />
          {{ order.address }}
        </p>
      </div>
      <div class="col-6">
        <h3 class="mt-3">List Products</h3>
        <ul>
          <OrderModalRatingComponent
            :product="product"
            :active="active.modalRate"
            @close-modal-rate="closeModalRate()"
          />
          <OrderListProductsComponent
            v-for="product in order.cart"
            :key="product.id"
            :product="product"
            :ship="order.isShip"
            @open-modal-rate="openModalRate($event)"
          />
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { APIURL } from "@/constant";
import axios from "axios";
import OrderModalRatingComponent from "@/components/orders/OrderModalRatingComponent.vue";
import OrderListProductsComponent from "@/components/orders/OrderListProductsComponent.vue";
export default {
  props: ["order"],
  components: {
    OrderModalRatingComponent,
    OrderListProductsComponent,
  },
  data() {
    return {
      active: {
        modalRate: false,
      },
    };
  },
  methods: {
    filterDate(value) {
      const date = new Date(value);
      const minute = date.getMinutes();
      const hour = date.getHours();
      const weekDays = date.toLocaleString("eng", { weekday: "long" });
      const day = date.getDate();
      const month = date.toLocaleString("eng", { month: "long" });
      const year = date.getFullYear();
      return `${weekDays}, ${day} ${month} ${year} at ${hour}:${minute}`;
    },
    submitOrder() {
      // eslint-disable-next-line vue/no-mutating-props
      this.order.isShip = false;
      axios.patch(`${APIURL}/orders/${this.order.id}`, {
        isShip: this.order.isShip,
      });
    },
    openModalRate(product) {
      this.product = product;
      this.active.modalRate = !this.active.modalRate;
    },
    closeModalRate() {
      this.active.modalRate = !this.active.modalRate;
    },
  },
};
</script>

<style>
.order-box {
  background-color: #fff;
  margin: 10px 0;
  border-radius: 8px;
}

.order-box .status-order {
  background-image: linear-gradient(
    to top left,
    #242663,
    #2d3399,
    #8e45d2,
    #ebabf6
  );
  padding: 10px 15px;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  justify-content: space-between;
}

.order-box .status-order .is-delivering,
.order-box .status-order .is-delivering svg {
  color: #ffc107;
}

.order-box .status-order .delivered,
.order-box .status-order .delivered svg {
  color: #4ff48a;
}

.order-box .status-order .time-order,
.order-box .status-order .price-order,
.order-box .status-order .price-order svg {
  color: #fff;
  font-style: italic;
}

.order-box .bill-detail ul {
  list-style: none;
}

.order-box .bill-detail p,
.order-box .bill-detail li {
  padding: 5px;
}
.box-rating svg:hover,
.box-rating svg:hover ~ svg {
  color: red;
}
</style>
