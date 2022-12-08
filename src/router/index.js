import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import AboutView from "../views/AboutView.vue";
import ProductsView from "../views/ProductsView.vue";
import CartView from "../views/CartView.vue";
import ProductDetailView from "../views/ProductDetailView.vue";
import SignUpView from "../views/SignUpView.vue";
import SignInView from "../views/SignInView.vue";
import PageNotFound from "../views/PageNotFound.vue";
import PayView from "../views/PayView.vue";
import OrdersView from "../views/OrdersView.vue";
import OrderNoAccountView from "../views/OrderNoAccountView.vue";
import ChartView from "../views/ChartView.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomeView,
    meta: {
      title: "Home",
    },
  },
  {
    path: "/about",
    name: "About",
    component: AboutView,
    meta: {
      title: "About",
    },
  },
  {
    path: "/products",
    name: "Products",
    component: ProductsView,
    meta: {
      title: "Products",
    },
  },
  {
    path: "/product/:id",
    name: "product",
    component: ProductDetailView,
    meta: {
      title: "Product Detail",
    },
  },
  {
    path: "/cart",
    name: "Cart",
    component: CartView,
    meta: {
      title: "Cart",
    },
  },
  {
    path: "/signup",
    name: "Signup",
    component: SignUpView,
    meta: {
      title: "Sign Up",
    },
  },
  {
    path: "/signin",
    name: "Signin",
    component: SignInView,
    meta: {
      title: "Sign In",
    },
  },
  {
    path: "/pay",
    name: "Pay",
    component: PayView,
    meta: {
      title: "Pay",
    },
  },
  {
    path: "/orders",
    name: "Orders",
    component: OrdersView,
    meta: {
      title: "Orders",
    },
  },
  {
    path: "/orders-no-account",
    name: "Order",
    component: OrderNoAccountView,
    meta: {
      title: "Order",
    },
  },
  {
    path: "/chart",
    name: "Chart",
    component: ChartView,
    meta: {
      title: "Chart",
    },
  },
  {
    path: "/:pathMathch(.*)*",
    component: PageNotFound,
    meta: {
      title: "404",
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to) => {
  document.title = `${to.meta.title}`;
});

export default router;
