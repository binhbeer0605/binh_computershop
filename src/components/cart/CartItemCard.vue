<template>
  <tr>
    <td>{{ product.id }}</td>
    <td style="max-width: 300px">{{ product.name }}</td>
    <td>
      <div class="button-cart">
        <button class="btn btn-danger" @click="removeFromCart()">
          <font-awesome-icon :icon="['fas', 'minus']" />
        </button>
        {{ product.quantity }}
        <button class="btn btn-success" @click="addToCart()">
          <font-awesome-icon :icon="['fas', 'plus']" />
        </button>
      </div>
    </td>
    <td>${{ item_cost.toFixed(2) }}</td>
    <td><img :src="product.image" alt="" /></td>
    <td>
      <button class="btn btn-danger" @click="deleteFromCart()">
        <font-awesome-icon :icon="['fas', 'trash']" />
      </button>
    </td>
  </tr>
</template>

<script>
export default {
  props: ["product"],
  methods: {
    addToCart() {
      this.$store.commit("addToCart", this.product);
    },
    removeFromCart() {
      if (this.product.quantity !== 1) {
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
    deleteFromCart() {
      this.$swal({
        icon: "warning",
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Delete it!",
        showCancelButton: true,
        text: "Are you sure you want to remove from cart ?",
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
    },
  },
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
img {
  width: 300px;
}

button {
  display: inline-block;
}

.btn {
  height: 30px;
  width: 30px;
  border: none;
  color: white;
  font-weight: bold;
  font-size: 1.15rem;
  border-radius: 5px;
  cursor: pointer;
  overflow: hidden;
}

.btn svg {
  color: #fff;
}

.button-cart {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
