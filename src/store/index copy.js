import { createStore } from "vuex";

function updateLocalStorage(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

export default createStore({
  state: {
    cart: [],
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
        if (prev.description.isSale) {
          return (
            (acc + prev.price - (prev.price * prev.description.saleOff) / 100) *
            prev.quantity
          );
        }
        return acc + prev.price * prev.quantity;
      }, 0);
    },
  },
  mutations: {
    addToCart(state, product) {
      let item = state.cart.find((i) => i.id === product.id);

      if (item) {
        item.quantity++;
      } else {
        state.cart.push({ ...product, quantity: 1 });
      }

      updateLocalStorage(state.cart);
    },

    removeFromCart(state, product) {
      let item = state.cart.find((i) => i.id === product.id);

      if (item) {
        item.quantity--;
      }

      updateLocalStorage(state.cart);
    },

    deleteFromCart(state, product) {
      state.cart = state.cart.filter((i) => i.id !== product.id);
      updateLocalStorage(state.cart);
    },

    updateCartFromLocalStorage(state) {
      const cart = localStorage.getItem("cart");

      if (cart) {
        state.cart = JSON.parse(cart);
      }
    },
    setProduct(state, productResponse) {
      state.product = productResponse;
    },
  },
  actions: {
    async fetchProduct({ commit }, { id }) {
      const res = await fetch("http://localhost:3000/products/" + id);
      const data = await res.json();
      commit("setProduct", data);
    },
  },
  modules: {},
});
