<template>
  <tr>
    <td>
      <img :src="product.image" alt="" />
    </td>
    <td style="max-width: 300px">{{ product.name }}</td>
    <td>x{{ product.quantity }}</td>
    <td>${{ item_cost.toFixed(2) }}</td>
  </tr>
</template>

<script>
export default {
  props: ["product"],
  computed: {
    item_cost() {
      if (this.product.description.isSale) {
        return (
          (this.product.price -
            (this.product.price * this.product.description.saleOff) / 100) *
          this.product.quantity
        );
      }
      return this.product.price * this.product.quantity;
    },
  },
};
</script>

<style scoped>
td {
  min-width: 0;
}
img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
}

@media screen and (max-width: 450px) {
  td:last-child {
    display: none;
  }
}
</style>
