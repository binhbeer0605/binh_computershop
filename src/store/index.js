import axios from "axios";
import { createStore } from "vuex";
import { APIURL } from "@/constant";

function getUserIdInUse() {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user) {
    return user.id;
  }
}

function updateUserCartDataBase(cart) {
  const userId = getUserIdInUse();

  if (userId) {
    axios.patch(`${APIURL}/users/${userId}`, {
      listCart: cart,
    });
  }
}

function updateUserFavoriteDataBase(like) {
  const userId = getUserIdInUse();

  if (userId) {
    axios.patch(`${APIURL}/users/${userId}`, {
      listFavorite: like,
    });
  }
}

function updateProductFavoriteDataBase(product) {
  const userId = getUserIdInUse();

  if (userId) {
    axios.patch(`${APIURL}/products/${product.id}`, {
      userLike: product.userLike,
    });
  }
}

export default createStore({
  state: {
    cart: [],
    like: [],
    product: null,
  },
  getters: {
    productQuantity: (state) => (product) => {
      const item = state.cart.find((i) => i.id === product.id);

      if (item) return item.quantity;
      else return null;
    },

    cartQuantity: (state) => {
      return state.cart.reduce((sum, item) => {
        return sum + item.quantity;
      }, 0);
    },

    cartItems: (state) => {
      return state.cart;
    },

    cartTotal: (state) => {
      return state.cart.reduce((acc, prev) => {
        if (
          new Date() >= new Date(prev.saleFrom) &&
          new Date() <= new Date(prev.saleTo)
        ) {
          return (
            (acc + prev.price - (prev.price * prev.saleOff) / 100) *
            prev.quantity
          );
        }
        return acc + prev.price * prev.quantity;
      }, 0);
    },
  },
  mutations: {
    addToFavorite(state, product) {
      const user = getUserIdInUse();
      if (user) {
        let item = state.like.find((i) => i === product.id);

        if (item) {
          state.like = state.like.filter((i) => i !== item);
          product.userLike = product.userLike.filter(
            (i) => i !== getUserIdInUse()
          );
        } else {
          state.like.push(product.id);
          product.userLike.push(getUserIdInUse());
        }
        updateUserFavoriteDataBase(state.like);
        updateProductFavoriteDataBase(product);
      } else {
        alert("Please login to like product!");
      }
    },

    addToCart(state, product) {
      let item = state.cart.find((i) => i.id === product.id);

      if (product.inStock > 0) {
        if (item && item.inStock > 0) {
          item.quantity++;
          item.inStock--;
          product.inStock--;
        } else if (item && item.inStock < 1) {
          alert("Out of stock");
        } else {
          product.inStock--;
          state.cart.push({ ...product, quantity: 1 });
        }
      } else {
        alert("Out of stock");
      }

      updateUserCartDataBase(state.cart);
    },

    removeFromCart(state, product) {
      let item = state.cart.find((i) => i.id === product.id);

      if (item) {
        item.quantity--;
        item.inStock++;
        product.inStock++;
      }

      updateUserCartDataBase(state.cart);
    },

    deleteFromCart(state, product) {
      const item = state.cart.find((i) => i.id === product.id);
      if (item) {
        if (item.inStock !== 1) {
          product.inStock = item.inStock;
        } else {
          product.inStock++;
        }
      }
      state.cart = state.cart.filter((i) => i.id !== product.id);
      updateUserCartDataBase(state.cart);
    },

    clearCart(state) {
      state.cart = [];
      updateUserCartDataBase(state.cart);
    },

    async updateCart(state) {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user) {
        const userId = user.id;

        await axios
          .get(`${APIURL}/users/${userId}`)
          .then((response) => (state.cart = response.data.listCart));
      }
    },

    async updateFavorite(state) {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user) {
        const userId = user.id;

        await axios
          .get(`${APIURL}/users/${userId}`)
          .then((response) => (state.like = response.data.listFavorite));
      }
    },

    setProduct(state, productResponse) {
      state.product = productResponse;
    },
  },
  actions: {
    async fetchProduct({ commit }, { id }) {
      let result;

      await fetch("http://localhost:3000/products/" + id)
        .then((res) => res.json())
        .then((data) => (result = data));
      commit("setProduct", result);
    },
  },
  modules: {},
});
