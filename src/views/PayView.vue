<template>
  <div class="container">
    <div class="row-pay">
      <PayImportInfoComponent />
    </div>
  </div>
</template>

<script>
import PayImportInfoComponent from "@/components/pay/PayImportInfoComponent.vue";
export default {
  components: {
    PayImportInfoComponent,
  },
};
</script>

<style>
.row-pay {
  background-color: #fff;
  padding: 30px 20px;
  border-radius: 5px;
  margin: 150px 0 50px !important;
}
</style>
