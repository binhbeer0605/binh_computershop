<template>
  <div class="">
    <div class="row">
      <h2 class="title-text text-center pt-5 pb-5 text-white">My Orders</h2>
    </div>
    <div class="row">
      <OrderUserComponent
        v-for="order in orders"
        :key="order.id"
        :order="order"
      />
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import axios from "axios";
import { APIURL } from "@/constant";
import OrderUserComponent from "@/components/orders/OrderUserComponent.vue";
export default {
  components: {
    OrderUserComponent,
  },
  setup() {
    const orders = ref([]);
    (async function getUserOrders() {
      const userStorage = JSON.parse(localStorage.getItem("user"));

      if (userStorage) {
        await axios
          .get(`${APIURL}/orders`)
          .then(
            (response) =>
              (orders.value = response.data.filter(
                (item) => item.userName === userStorage.userName
              ))
          );
      }
    })();

    return { orders };
  },
};
</script>
