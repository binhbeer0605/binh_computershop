<template>
  <div v-if="products.length">
    <div class="row filter-options">
      <div class="col-5">
        <span class="title">Sort By</span>
        <span @click="sortBy('name')"
          >Name
          <font-awesome-icon v-if="sortAtoZ" :icon="['fas', 'arrow-up-a-z']" />
          <font-awesome-icon v-else :icon="['fas', 'arrow-down-a-z']" />
        </span>
        <span @click="sortBy('price')"
          >Price
          <font-awesome-icon v-if="sortLowToHigh" :icon="['fas', 'arrow-up']" />
          <font-awesome-icon v-else :icon="['fas', 'arrow-down']"
        /></span>
        <span @click="showAllProducts">All</span>
      </div>
      <div class="col-4">
        <div class="search">
          <input
            @keyup.enter="changeKeyWords()"
            type="text"
            placeholder="Search"
            v-model="keyWordsInput"
          />
          <button class="button-search" @click="changeKeyWords">
            <font-awesome-icon :icon="['fas', 'search']" />
          </button>
          <!-- search history -->
          <div v-if="historyKeyWords.length" class="header__search-history">
            <h3 class="header__search-history-heading">Search History</h3>
            <ul class="header__search-history-list">
              <li
                class="header__search-history-item"
                v-for="(historyKeyWord, index) in historyKeyWords
                  .slice()
                  .reverse()"
                :key="index"
              >
                <a href="">{{ historyKeyWord }}</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="col-3">
        <div
          class="pagination-container pagination-container-top"
          v-if="totalPage !== 0"
        >
          <button :disabled="isFirstPage" class="prev" @click="prevPage">
            Prev
          </button>
          <button :disabled="isLastPage" class="next" @click="nextPage">
            Next
          </button>
          <p>page {{ currentPage }} / {{ totalPage }} pages</p>
        </div>
      </div>
    </div>

    <div class="row filter-options-mobile">
      <div class="col-4">
        <font-awesome-icon
          :icon="['fas', 'search']"
          @click="openSearchMobile"
          :class="{ active: isOpenSearchMobile }"
        />
        <div class="search" :class="{ active: isOpenSearchMobile }">
          <input
            @keyup.enter="changeKeyWords()"
            type="text"
            placeholder="Search"
            v-model="keyWordsInput"
          />
          <button class="button-search" @click="changeKeyWords">
            <font-awesome-icon :icon="['fas', 'search']" />
          </button>
          <!-- search history -->
          <div v-if="historyKeyWords.length" class="header__search-history">
            <h3 class="header__search-history-heading">Search History</h3>
            <ul class="header__search-history-list">
              <li
                class="header__search-history-item"
                v-for="(historyKeyWord, index) in historyKeyWords
                  .slice()
                  .reverse()"
                :key="index"
              >
                <a href="">{{ historyKeyWord }}</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="col-4 pagination-mobile">
        <button :disabled="isFirstPage" class="prev" @click="prevPage">
          <font-awesome-icon :icon="['fas', 'circle-arrow-left']" />
        </button>
        <div>
          <span>{{ currentPage }}</span>
          <span>/</span>
          <span>{{ totalPage }}</span>
        </div>
        <button :disabled="isLastPage" class="next" @click="nextPage">
          <font-awesome-icon :icon="['fas', 'circle-arrow-right']" />
        </button>
      </div>

      <div class="col-4">
        <font-awesome-icon
          :icon="['fas', 'filter']"
          @click="openFilterMobile"
          :class="{ active: isOpenFilterMobile }"
        />
        <div class="filter" :class="{ active: isOpenFilterMobile }">
          <span class="filter-by">Sort By</span>
          <span @click="sortBy('name')"
            >Name
            <font-awesome-icon
              v-if="sortAtoZ"
              :icon="['fas', 'arrow-up-a-z']"
            />
            <font-awesome-icon v-else :icon="['fas', 'arrow-down-a-z']" />
          </span>
          <span @click="sortBy('price')"
            >Price
            <font-awesome-icon
              v-if="sortLowToHigh"
              :icon="['fas', 'arrow-up']" />
            <font-awesome-icon v-else :icon="['fas', 'arrow-down']"
          /></span>
        </div>
      </div>
    </div>

    <ProductDescriptionDrawer
      :product="product"
      :active="active.product_drawer"
      @close-product-drawer="closeProductDrawer()"
    />
    <div v-if="productsAfterSearch.length" class="row mt-5 mb-5 list-product">
      <ProductSummaryCard
        v-for="product in paginateProduct"
        :key="product.id"
        :product="product"
        class="col-xl-3 col-lg-6 col-md-6 col-sm-12 mb-5"
        @view-product="viewProduct($event)"
      />
    </div>
    <div v-else class="box">
      <div class="error-message">
        <div class="icon">
          <font-awesome-icon :icon="['fas', 'face-sad-cry']" />
        </div>
        Products Not Found. Please try again
        <font-awesome-icon class="heart" :icon="['fas', 'heart']" />
      </div>
    </div>
    <!-- Pagination -->
    <div class="pagination-container" v-if="totalPage !== 0">
      <button :disabled="isFirstPage" class="prev" @click="prevPage">
        Prev
      </button>
      <button :disabled="isLastPage" class="next" @click="nextPage">
        Next
      </button>
      <p>Page {{ currentPage }} / {{ totalPage }} Pages</p>
    </div>
  </div>
  <div v-else>
    <LoadingComponent />
  </div>
</template>

<script>
import axios from "axios";
import { APIURL } from "../constant";
import { ref, computed } from "vue";
import ProductSummaryCard from "../components/products/ProductSummaryCard.vue";
import ProductDescriptionDrawer from "../components/products/ProductDescriptionDrawer.vue";
import LoadingComponent from "../components/loadding/LoadingComponent.vue";

export default {
  name: "HomeView",
  components: {
    ProductSummaryCard,
    ProductDescriptionDrawer,
    LoadingComponent,
  },
  setup() {
    const products = ref([]); // danh sách sản phẩm
    const product = ref(null); // 1 sản phẩm
    const active = ref({
      product_drawer: false,
    }); // active === true để xem chi tiết sản phẩm
    const keyWords = ref(""); // keyWords dùng để search sp khi bấm vào nút
    const historyKeyWords = ref([]);
    const keyWordsInput = ref(""); // keyWordsInput thay đổi khi nhập vào ô input

    const min = ref(0); // dùng cho phần trang
    const max = ref(4); // dùng cho phần trang
    const itemPerPage = max.value;
    const currentPage = ref(1);
    const totalPage = ref(null);

    const isOpenSearchMobile = ref(false);
    const isOpenFilterMobile = ref(false);

    const loadData = async () => {
      const { data } = await axios.get(`${APIURL}/products`);
      products.value = data;
      totalPage.value = Math.ceil(products.value.length / itemPerPage);
    };
    loadData(); // loadData từ server

    // phân trang
    const productsAfterSearch = computed(() => {
      return products.value.filter((product) =>
        product.name.toLowerCase().includes(keyWords.value.toLowerCase())
      );
    });

    // phân trang
    const paginateProduct = computed(() => {
      return productsAfterSearch.value.slice(min.value, max.value);
    });

    function updateTotalPage() {
      totalPage.value = Math.ceil(
        productsAfterSearch.value.length / itemPerPage
      );

      currentPage.value = 1;
    }

    const sortLowToHigh = ref(true);
    const sortAtoZ = ref(true);

    function sortBy(option) {
      if (option === "price") {
        if (sortLowToHigh.value) {
          products.value.sort((a, b) => {
            return a.price - (a.price * a.description.saleOff) / 100 >
              b.price - (b.price * b.description.saleOff) / 100
              ? 1
              : -1;
          });
        } else {
          products.value.sort((b, a) => {
            return a.price - (a.price * a.description.saleOff) / 100 >
              b.price - (b.price * b.description.saleOff) / 100
              ? 1
              : -1;
          });
        }
        sortLowToHigh.value = !sortLowToHigh.value;
      } else {
        if (sortAtoZ.value) {
          products.value.sort((a, b) => {
            return a[option] > b[option] ? 1 : -1;
          });
        } else {
          products.value.sort((b, a) => {
            return a[option] > b[option] ? 1 : -1;
          });
        }
        sortAtoZ.value = !sortAtoZ.value;
      }
    }

    // func cập nhật value trong input tìm kiếm
    function changeKeyWords() {
      keyWords.value = keyWordsInput.value;
      if (keyWords.value) {
        historyKeyWords.value.push(keyWords.value);
      }
      // cập nhật lại tổng số trang mỗi lần search
      updateTotalPage();
    }

    function showAllProducts() {
      keyWordsInput.value = "";
      keyWords.value = keyWordsInput.value;

      // cập nhật lại tổng số trang mỗi lần search
      updateTotalPage();
    }

    // kiểm tra có phải trang đầu tiên hay không
    const isFirstPage = computed(() => {
      if (currentPage.value === 1) return true;
      return false;
    });

    // kiểm tra có phải trang cuối cùng hay không
    const isLastPage = computed(() => {
      if (currentPage.value === totalPage.value) return true;
      return false;
    });

    // func chuyển sang trang tiếp theo
    function nextPage() {
      min.value += itemPerPage;
      max.value += itemPerPage;
      currentPage.value++;
    }

    // func chuyển sang trang trước đó
    function prevPage() {
      min.value -= itemPerPage;
      max.value -= itemPerPage;
      currentPage.value--;
    }

    return {
      products,
      product,
      active,
      paginateProduct,
      productsAfterSearch,
      changeKeyWords,
      keyWords,
      keyWordsInput,
      historyKeyWords,
      showAllProducts,
      currentPage,
      totalPage,
      isFirstPage,
      isLastPage,
      nextPage,
      prevPage,
      sortBy,
      sortLowToHigh,
      sortAtoZ,
      isOpenSearchMobile,
      isOpenFilterMobile,
    };
  },
  methods: {
    viewProduct(product) {
      this.product = product;
      this.active.product_drawer = !this.active.product_drawer;
    },
    closeProductDrawer() {
      this.active.product_drawer = !this.active.product_drawer;
    },
    openSearchMobile() {
      this.isOpenSearchMobile = !this.isOpenSearchMobile;
      this.isOpenFilterMobile = false;
    },
    openFilterMobile() {
      this.isOpenFilterMobile = !this.isOpenFilterMobile;
      this.isOpenSearchMobile = false;
    },
  },
};
</script>

<style>
.search {
  padding: 10px 0;
  display: flex;
  position: relative;
}

.search input {
  width: 100%;
  height: 45px;
  padding: 5px 15px;
  outline: none;

  border: 1px solid;
  border-image-slice: 1;
  border-image-source: linear-gradient(to right bottom, #4ff48a, #1fe4ec);

  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  background-color: rgba(255, 101, 51, 0.1);
  font-family: "JetBrains Mono";
}

.search input:focus {
  box-shadow: 0px 0px 15px #4ff48a;
}

.search .button-search {
  min-width: 100px;
  height: 45px;
  background-image: linear-gradient(to right bottom, #4ff48a, #1fe4ec);
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  border: none;
  cursor: pointer;
}

.search .button-search:hover,
.search .button-search:hover svg {
  filter: brightness(120%);
  color: #333;
}

.search .button-search svg {
  color: #fff;
  font-size: 20px;
}

.header__search-history {
  position: absolute;
  top: calc(100% + 2px);
  left: 0;
  width: calc(100% - 16px);
  background-color: #fff;
  border-radius: 3px;
  box-shadow: 0 0 3px #ccc;
  display: none;
  overflow: hidden;
  z-index: 11;
}

.search input:focus ~ .header__search-history {
  display: block;
}

.header__search-history-heading {
  margin: 6px 12px;
  font-size: 1.4rem;
  color: #999;
  font-weight: 400;
  user-select: none;
}

.header__search-history-list {
  list-style: none;
  padding-left: 0;
  margin: 6px 0 0;
}

.header__search-history-item {
  height: 38px;
  padding: 0 16px;
}

.header__search-history-item:hover {
  background-color: #fafafa;
}

.header__search-history-item a {
  text-decoration: none;
  color: var(--text-color);
  font-size: 1.4rem;
  line-height: 38px;
  display: block;
}

.filter-options {
  width: 100%;
  background-color: #ebebeb;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  border-radius: 5px;
}

.filter-options .title {
  background-color: transparent;
}

.filter-options span {
  padding: 10px 20px;
  margin: 0 5px;
  background: #fff;
  user-select: none;
  border-radius: 5px;
}

.filter-options span:not(.title):hover {
  cursor: pointer;
  box-shadow: 0 0 5px #333;
}

.product-cards-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.pagination-container {
  text-align: center;
  padding: 10px 0px;
  margin-right: 12px;
}

.pagination-container.pagination-container-top p {
  color: #333;
}

.pagination-container p {
  color: #fff;
  padding: 5px;
}

.pagination-container button {
  display: inline-block;
  padding: 10px 15px;
  color: #333;
  margin: 0 5px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
}

.pagination-container button {
  background-image: linear-gradient(to right bottom, #4ff48a, #1fe4ec);
}

.pagination-container button:not(:disabled):hover {
  filter: brightness(150%);
}

.pagination-container button:disabled {
  cursor: not-allowed;
  opacity: 0.65;
}

.row.list-product {
  margin-left: -15px;
  margin-right: 0;
}

.row.filter-options-mobile {
  height: 50px;
  background-color: #ebebeb;
  align-items: center;
  border-radius: 5px;
  border: 1px solid #ccc;

  position: relative;
}

.row.filter-options-mobile .col-4 {
  text-align: center;
  border-left: 1px solid #ccc;
}

.pagination-mobile {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.pagination-mobile p {
  display: flex;
  align-items: center;
}

.pagination-mobile button {
  border: none;
  outline: none;
  background-color: transparent;
}

.row.filter-options-mobile svg {
  color: #333;
  font-size: 3rem;
}

.row.filter-options-mobile svg.active,
.row.filter-options-mobile .pagination-mobile button svg {
  font-size: 3rem;
  color: #4ff48a;
}

.row.filter-options-mobile .pagination-mobile button:disabled svg {
  color: #808080;
}

@media screen and (max-width: 1199.5px) {
  .row.filter-options {
    display: none;
  }

  .search,
  .filter {
    background-color: #ebebeb;
    padding: 0;
    visibility: hidden;
    opacity: 0;
    border-radius: 5px;
    z-index: 100;

    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    transition: all linear 0.3s;
  }

  .filter,
  .filter span {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .filter span {
    padding: 10px 30px;
    background-color: #ccc;
    border-radius: 5px;
    margin: 0 5px;
  }

  .filter span.filter-by {
    background-color: #ebebeb;
  }

  .row.filter-options-mobile .filter span svg {
    color: #333;
    font-size: 1.3rem;
  }

  .search input {
    border: none;
    border-image-slice: none;
    border-image-source: none;
    width: 60%;
  }

  .search button {
    width: 40%;
  }

  .search.active,
  .filter.active {
    top: 50px;
    visibility: visible;
    opacity: 1;
  }

  .row.list-product {
    margin-top: 7rem !important;
  }

  button.button-search svg {
    color: #fff !important;
  }

  .card-img-top {
    overflow: hidden;
    width: 100%;
    max-height: 178.83px;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
  }
}

@media screen and (min-width: 1200px) {
  .row.filter-options-mobile {
    display: none;
  }
}
</style>
