<template>
  <header id="header">
    <nav id="nav" class="container">
      <div class="nav-left">
        <router-link to="/" class="logo-brand-box"
          ><font-awesome-icon class="logo-brand" :icon="['fas', 'dragon']"
        /></router-link>
        <router-link :class="{ active: $route.name === 'Home' }" to="/"
          ><font-awesome-icon
            :icon="['fas', 'home']"
            style="padding-right: 5px"
          />Home</router-link
        >
        <router-link :class="{ active: $route.name === 'About' }" to="/about"
          ><font-awesome-icon
            :icon="['fas', 'address-card']"
            style="padding-right: 5px"
          />About</router-link
        >
        <router-link
          :class="{ active: $route.name === 'Products' }"
          to="/products"
          ><font-awesome-icon
            :icon="['fas', 'shop']"
            style="padding-right: 5px"
          />Products</router-link
        >
        <router-link :class="{ active: $route.name === 'Cart' }" to="/cart"
          ><font-awesome-icon
            :icon="['fas', 'cart-shopping']"
            style="padding-right: 5px"
          />Cart
          <span v-if="cart_quantity" class="quantity-cart"
            >({{ cart_quantity }})</span
          >
        </router-link>
        <router-link :class="{ active: $route.name === 'Chart' }" to="/chart"
          ><font-awesome-icon
            :icon="['fas', 'chart-simple']"
            style="padding-right: 5px"
          />Chart</router-link
        >
      </div>
      <div class="nav-right">
        <div v-if="!user">
          <router-link
            :class="{ active: $route.name === 'Signup' }"
            to="/signup"
            ><font-awesome-icon
              :icon="['fas', 'user-plus']"
              style="padding-right: 5px"
            />Sign Up</router-link
          >
          <router-link
            :class="{ active: $route.name === 'Signin' }"
            to="/signin"
            ><font-awesome-icon
              :icon="['fas', 'user']"
              style="padding-right: 5px"
            />Sign In</router-link
          >
        </div>
        <div class="user-box" v-else>
          <div class="user-box-child" style="user-select: none">
            <div class="avatar-user">
              <img
                :src="accountUser.avatar"
                alt=""
                width="30"
                height="30"
                style="object-fit: cover; border-radius: 50%"
              />
            </div>
            <div class="name-user">
              {{ accountUser.userName }}
            </div>
            <div class="icon-user">
              <font-awesome-icon
                :icon="['fas', 'caret-down']"
                style="padding-right: 5px; color: #333"
              />
            </div>
          </div>
          <ul>
            <li>
              <router-link class="out" to="/orders"
                ><font-awesome-icon
                  :icon="['fas', 'file-invoice-dollar']"
                  style="padding-right: 5px"
                />My Orders</router-link
              >
            </li>
            <!-- <li>
              <router-link class="out" to="/"
                ><font-awesome-icon
                  :icon="['fas', 'user-pen']"
                  style="padding-right: 5px"
                />Edit Profile</router-link
              >
            </li>
            <li>
              <router-link to="/"
                ><font-awesome-icon
                  :icon="['fas', 'key']"
                  style="padding-right: 5px"
                />Change Password</router-link
              >
            </li> -->
            <li>
              <a @click="logOut" class="out" to="/signin"
                ><font-awesome-icon
                  :icon="['fas', 'power-off']"
                  style="padding-right: 5px"
                />Log Out</a
              >
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <nav id="nav-mobile">
      <a class="logo-menu-box" @click="openModalMenuMobile"
        ><font-awesome-icon class="logo-menu" :icon="['fas', 'bars']"
      /></a>
      <router-link to="/" class="logo-brand-box"
        ><font-awesome-icon class="logo-brand" :icon="['fas', 'dragon']"
      /></router-link>
      <router-link to="/cart" class="logo-cart-box"
        ><font-awesome-icon class="logo-cart" :icon="['fas', 'shopping-cart']"
      /></router-link>
      <ul
        class="nav-mobile"
        :class="{ show: menuMobileIsOpen }"
        @click="openModalMenuMobile"
      >
        <li class="nav-mobile-item">
          <router-link :class="{ active: $route.name === 'Home' }" to="/"
            ><font-awesome-icon
              :icon="['fas', 'home']"
              style="padding-right: 5px"
            />Home</router-link
          >
        </li>
        <li class="nav-mobile-item">
          <router-link :class="{ active: $route.name === 'About' }" to="/about"
            ><font-awesome-icon
              :icon="['fas', 'address-card']"
              style="padding-right: 5px"
            />About</router-link
          >
        </li>
        <li class="nav-mobile-item">
          <router-link
            :class="{ active: $route.name === 'Products' }"
            to="/products"
            ><font-awesome-icon
              :icon="['fas', 'shop']"
              style="padding-right: 5px"
            />Products</router-link
          >
        </li>
        <li class="nav-mobile-item" v-if="!user">
          <router-link
            :class="{ active: $route.name === 'Signup' }"
            to="/signup"
            ><font-awesome-icon
              :icon="['fas', 'user-plus']"
              style="padding-right: 5px"
            />Sign Up</router-link
          >
        </li>
        <li class="nav-mobile-item" v-if="!user">
          <router-link
            :class="{ active: $route.name === 'Signin' }"
            to="/signin"
            ><font-awesome-icon
              :icon="['fas', 'user']"
              style="padding-right: 5px"
            />Sign In</router-link
          >
        </li>
        <li class="nav-mobile-item" v-if="user">
          <router-link
            :class="{ active: $route.name === 'Orders' }"
            to="/orders"
            ><font-awesome-icon
              :icon="['fas', 'file-invoice-dollar']"
              style="padding-right: 5px"
            />Orders</router-link
          >
        </li>
        <li class="nav-mobile-item" v-if="user">
          <a @click="logOut" class="out" to="/signin"
            ><font-awesome-icon
              :icon="['fas', 'power-off']"
              style="padding-right: 5px"
            />Log Out</a
          >
        </li>
      </ul>
    </nav>
  </header>
  <router-view class="container view" />
  <FooterComponent class="text-white" />
</template>

<script>
import { ref } from "vue";
import FooterComponent from "@/components/main/FooterComponent.vue";
export default {
  components: {
    FooterComponent,
  },
  setup() {
    const accountUser = ref([]);
    const menuMobileIsOpen = ref(false);
    const user = localStorage.getItem("user");
    const handle = () => {
      if (user) {
        accountUser.value = JSON.parse(user);
      }
    };

    handle();

    function openModalMenuMobile() {
      menuMobileIsOpen.value = !menuMobileIsOpen.value;
    }

    return { accountUser, user, openModalMenuMobile, menuMobileIsOpen };
  },
  methods: {
    logOut() {
      const isConfirm = confirm("Are you sure you want to log out?");
      console.log(isConfirm);
      if (isConfirm) {
        localStorage.removeItem("user");
        this.$swal.fire({
          icon: "success",
          title: "Log out successful!",
        });
        setTimeout(
          () => (window.location.href = "http://localhost:8080/signin"),
          1500
        );
      }
    },
  },
  mounted() {
    this.$store.commit("updateCart");
    this.$store.commit("updateFavorite");
  },
  computed: {
    cart_quantity() {
      return this.$store.getters.cartQuantity;
    },
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800&display=swap");
#app {
  font-family: "JetBrains Mono", monospace;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

body {
  background-image: linear-gradient(to bottom right, #090a30, #0c0832);
}

#header {
  height: 100px;
  width: 100%;
  background-image: linear-gradient(
    to bottom right,
    #242663,
    #2d3399,
    #8e45d2,
    #ebabf6
  );
  vertical-align: middle;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 999;
}

#nav {
  background-color: transparent;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

#nav-mobile {
  height: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
  align-items: center;

  position: relative;
  z-index: 1000;
}

#nav-mobile .nav-mobile {
  list-style: none;
  padding-left: 0;
  width: 100%;
  background-color: #fff;
  height: auto;

  position: absolute;
  top: 100px;
  left: -100%;

  transition: left linear 0.3s;
}

#nav-mobile .nav-mobile.show {
  left: 0;
}

#nav-mobile .nav-mobile::before {
  content: "";
  background-color: rgba(124, 124, 124, 0.55);
  position: fixed;
  top: 100px;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: -1;

  display: none;
  transition: display linear 0.3s;
}

#nav-mobile .nav-mobile.show::before {
  display: block;
}

#nav-mobile .nav-mobile .nav-mobile-item {
  border-bottom: 1px solid #333;
}

#nav-mobile .nav-mobile:last-child {
  border-bottom: none;
}

#nav-mobile .nav-mobile .nav-mobile-item a {
  display: block;
  padding: 30px;
}

#nav-mobile .nav-mobile .nav-mobile-item a,
#nav-mobile .nav-mobile .nav-mobile-item svg {
  color: #333;
  font-size: 1.3rem;
}

#nav-mobile .nav-mobile .nav-mobile-item a.active {
  background-color: #4ff48a;
  color: #282c79;
}

#nav-mobile .nav-mobile .nav-mobile-item a.active svg {
  color: #282c79;
}

#nav-mobile a svg {
  font-size: 3rem;
  color: #fff;
}

#nav-mobile a svg.logo-brand {
  font-size: 4rem;
}

#nav .nav-left {
  display: flex;
  align-items: center;
}

#nav .nav-right {
  display: flex;
  align-items: center;
}

#nav .nav-left .logo-brand-box {
  display: flex;
  align-items: center;
}

#nav .nav-left .logo-brand {
  color: #fff;
  font-size: 4rem;
}

#nav a {
  text-decoration: none;
  font-size: 1.25rem;
  display: inline-block;
  padding: 0 20px;
  border-radius: 5px;
  line-height: 95px;
  color: #ddd;
  background: linear-gradient(to right bottom, #4ff48a, #1fe4ec);
  background-clip: text;
  font-weight: 700;
}

#nav a svg {
  color: #ddd;
}

#nav a.active {
  color: transparent;
  border-bottom: 5px solid;
  border-image-slice: 1;
  border-image-source: linear-gradient(to right bottom, #4ff48a, #1fe4ec);
}

#nav a.active svg,
#nav a:hover svg {
  color: #4ff48a;
}

#nav .nav-right a svg {
  color: #333;
}
#nav .nav-right a.active svg,
#nav .nav-right a:hover svg {
  color: #242663;
}

#nav a:hover {
  color: transparent;
}

#nav .user-box {
  min-width: 170px;
  background-color: #fff;
  color: #333;
  position: relative;
  padding: 5px;
  border-radius: 20px;
  font-weight: 800;
  font-size: 2rem;
  box-shadow: 0 0 5px #333;
}

#nav .user-box-child {
  display: flex;
  justify-content: space-between;
}

#nav .user-box a {
  color: #333;
}

#nav .user-box:hover {
  box-shadow: 0 0 5px #4ff48a;
}

#nav .user-box:hover ul {
  display: block;
}

#nav .user-box ul {
  list-style: none;
  color: #333;
  min-width: 170px;
  background-image: linear-gradient(to right bottom, #4ff48a, #1fe4ec);
  padding-left: 0;
  border-radius: 5px;
  position: absolute;
  top: 40px;
  left: 0;
  right: 0;
  display: none;
  animation: fadeIn 0.5s linear;
  transition: all 0.5s linear;

  box-shadow: 0 0 5px #333;
}

#nav .user-box li:not(:first-child) {
  width: 100%;
  border-top: 1px solid #333;
}

#nav .user-box li a {
  display: block;
  color: #333;
  padding: 5px 10px;
  line-height: 3.6rem;
  cursor: pointer;
}

.quantity-cart {
  color: #fec321;
}

.view {
  margin-top: 100px;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@media screen and (max-width: 996px) {
  #nav {
    display: none;
  }

  ::-webkit-scrollbar {
    width: 0;
    height: 0;
    /* Chiều rộng vùng chứa scrollbar */
  }
}

@media screen and (min-width: 997px) {
  #nav-mobile {
    display: none;
  }
}
</style>
