<template>
  <form @submit.prevent="submitFormPay" action="" id="form-pay">
    <div class="row">
      <div class="col-lg-6 col-12">
        <h2 class="text-center text-uppercase mb-5">personal information</h2>
        <div class="row">
          <div class="col-lg-6 col-12" v-if="form.userName">
            <div class="form-group">
              <label for="username" class="form-label">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                class="form-control"
                v-model="form.userName"
                :readonly="form.userName ? form.userName : false"
              />
            </div>
          </div>
          <div class="col-lg-6 col-12">
            <div class="form-group" :class="{ invalid: errorMessage.fullName }">
              <label for="fullname" class="form-label"
                >Fullname
                <span class="message-error">{{
                  errorMessage.fullName
                }}</span></label
              >
              <input
                type="text"
                id="fullname"
                name="fullname"
                class="form-control"
                v-model="form.fullName"
                @blur="handleValidateFullName()"
                @input="handleClearErrorFullName()"
              />
            </div>
          </div>
          <div
            :class="{ 'col-lg-6 col-12': !form.userName, col: form.userName }"
          >
            <div
              class="form-group"
              :class="{ invalid: errorMessage.phoneNumber }"
            >
              <label for="phone" class="form-label"
                >Phone number
                <span class="message-error">{{
                  errorMessage.phoneNumber
                }}</span></label
              >
              <input
                type="text"
                id="phone"
                name="phone"
                class="form-control"
                v-model="form.phoneNumber"
                @blur="handleValidatePhoneNumber()"
                @input="handleClearErrorPhoneNumber()"
              />
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <div class="form-group" :class="{ invalid: errorMessage.address }">
              <label for="address" class="form-label"
                >Address
                <span class="message-error">{{
                  errorMessage.address
                }}</span></label
              >
              <input
                type="text"
                id="address"
                name="address"
                class="form-control"
                v-model="form.address"
                @blur="handleValidateAddress()"
                @input="handleClearErrorAddress()"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-6 col-12" v-if="showTable">
        <h2 class="text-center text-uppercase mb-5">
          Information shopping cart
        </h2>
        <table id="table-cart">
          <PayItemCartComponent
            v-for="product in products"
            :key="product.id"
            :product="product"
          />
        </table>
        <table id="table-cart-mobile">
          <PayItemCartComponent
            v-for="product in products"
            :key="product.id"
            :product="product"
          />
        </table>
      </div>
    </div>
    <div class="row">
      <div class="col-6 offset-3 text-center mt-5">
        <button class="button">Submit</button>
      </div>
    </div>
  </form>
</template>

<script>
import { APIURL } from "@/constant";
import axios from "axios";
import PayItemCartComponent from "@/components/pay/PayItemCartComponent.vue";
import { reactive } from "vue";
export default {
  components: {
    PayItemCartComponent,
  },
  setup() {
    const errorMessage = reactive({
      fullName: "",
      address: "",
      phoneNumber: "",
    });
    const form = reactive({
      userName: "",
      fullName: "",
      address: "",
      phoneNumber: "",
    });

    (function enterValueForm() {
      const userStorage = JSON.parse(localStorage.getItem("user"));

      if (userStorage) {
        form.userName = userStorage.userName;
        form.fullName = userStorage.fullName;
        form.address = userStorage.address;
        form.phoneNumber = userStorage.phoneNumber;
      }
    })();

    function handleValidateFullName() {
      if (form.fullName) {
        errorMessage.fullName = "";
      } else {
        errorMessage.fullName = "Fullname cannot empty";
      }
    }

    function handleValidateAddress() {
      if (form.address) {
        errorMessage.address = "";
      } else {
        errorMessage.address = "Address cannot empty";
      }
    }

    function handleValidatePhoneNumber() {
      if (form.phoneNumber) {
        errorMessage.phoneNumber = "";
      } else {
        errorMessage.phoneNumber = "Phone Number cannot empty";
      }
    }

    function handleClearErrorFullName() {
      errorMessage.fullName = "";
    }

    function handleClearErrorAddress() {
      errorMessage.address = "";
    }

    function handleClearErrorPhoneNumber() {
      errorMessage.phoneNumber = "";
    }

    return {
      form,
      errorMessage,
      handleValidateFullName,
      handleValidateAddress,
      handleValidatePhoneNumber,
      handleClearErrorFullName,
      handleClearErrorAddress,
      handleClearErrorPhoneNumber,
    };
  },
  methods: {
    async submitFormPay() {
      if (this.form.fullName && this.form.phoneNumber && this.form.address) {
        await axios
          .post(`${APIURL}/orders`, {
            id: "",
            ...this.form,
            dateOrder: new Date(),
            isShip: true,
            cart: this.products,
            totalCart: this.$store.getters.cartTotal,
          })
          .then((response) => {
            response.data.cart.forEach((element) => {
              axios.patch(`${APIURL}/products/${element.id}`, {
                inStock: element.inStock,
              });
            });
          })
          .then(() => {
            this.$store.commit("clearCart");
            if (JSON.parse(localStorage.getItem("user"))) {
              this.$router.push("/orders");
            } else {
              this.$router.push("/orders-no-account");
            }
          })
          .catch((err) => console.log(err));
      } else {
        this.$swal.fire({
          icon: "error",
          title: "Please enter all feild!",
          timer: 1000,
        });
      }
    },
  },
  computed: {
    showTable() {
      // Nếu mảng sản phẩm có độ dài bằng 0 thì không showTable
      if (this.$store.state.cart.length === 0) {
        return false;
      }
      return true;
    },
    products() {
      return this.$store.getters.cartItems;
    },
  },
};
</script>

<style scoped>
#form-pay {
  background-color: #fff;
}
.form-label {
  color: #2c3e50;
  font-weight: bold;
}

.form-label span {
  font-weight: 500;
}

input.form-control {
  padding: 10px;
  margin-bottom: 10px;
  outline: none;
  border: none;
  border-radius: 0;
  border-bottom: 1px #333;
  border-bottom-style: dashed;

  font-size: 1.3rem;
}

input.form-control:focus {
  box-shadow: none;
}

/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type="number"] {
  -moz-appearance: textfield;
}

span.message-error {
  font-style: italic;
}

.form-group.invalid label {
  color: red;
}

.form-group.invalid input {
  border-color: red;
}
</style>
