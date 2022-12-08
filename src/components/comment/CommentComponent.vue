<template>
  <div class="col-lg-6 col-12 comment-box" v-if="comments">
    <h2 class="pb-5 title">Enter your comment</h2>
    <form class="mb-5" @submit.prevent="submitComment" action="">
      <div class="formgroup" id="message-form">
        <textarea id="message" name="message" v-model="commentForm.comment" />
        <button class="button button-comment">Comment</button>
      </div>
    </form>
    <div v-if="comments.length">
      <h2 class="pb-5 title">All of comment</h2>
      <div class="comment-all">
        <div
          class="row"
          v-for="comment in comments"
          :key="comment.id"
          style="margin-bottom: 10px; align-items: center"
        >
          <div class="col-2 comment-user-img">
            <img :src="comment.user.avatar" alt="" />
          </div>
          <div class="col-10 comment-info">
            <h3 class="comment-user-name">{{ comment.user.userName }}</h3>
            <p class="comment-content">{{ comment.comment }}</p>
            <a href="" :title="filterDate(comment.dateComment)">{{
              filterDateMain(comment.dateComment)
            }}</a>
          </div>
        </div>
      </div>
    </div>
  </div>
  <CommentLoaddingComponent class="col-6" v-else />
</template>

<script>
import { ref, reactive } from "vue";
import { APIURL } from "@/constant";
import axios from "axios";
import CommentLoaddingComponent from "@/components/loadding/CommentLoaddingComponent.vue";
export default {
  props: ["product"],
  components: {
    CommentLoaddingComponent,
  },
  setup(props) {
    const userStorage = JSON.parse(localStorage.getItem("user"));
    const user = ref();
    const comments = ref();
    if (userStorage) {
      user.value = userStorage;
    }
    const commentForm = reactive({
      comment: "",
    });

    async function getComments() {
      let { data } = await axios.get(`${APIURL}/comments`);
      if (data) {
        data = data.filter((item) => item.idProduct == props.product.id);
        data.sort((a, b) => {
          return new Date(a.dateComment) - new Date(b.dateComment) ? -1 : 1;
        });
        comments.value = data;
      }
    }

    getComments();

    return { commentForm, user, comments, getComments };
  },
  watch: {
    $route() {
      this.updatePage(this.$route.params.id);
    },
  },
  methods: {
    async submitComment() {
      const { comment } = this.commentForm;
      if (!this.user) {
        alert("Please login to comment!");
        this.$router.push("/signin");
        return;
      }
      if (!comment) {
        alert("Your comment is currently empty");
        return;
      }
      const { id } = this.$route.params;
      await axios.post(`${APIURL}/comments`, {
        ...this.commentForm,
        user: this.user,
        idProduct: id,
        dateComment: new Date(),
      });
    },
    filterDate(value) {
      const date = new Date(value);
      const minute = date.getMinutes();
      const hour = date.getHours();
      const weekDays = date.toLocaleString("eng", { weekday: "long" });
      const day = date.getDate();
      const month = date.toLocaleString("eng", { month: "long" });
      const year = date.getFullYear();
      return `${weekDays}, ${day} ${month} ${year} at ${hour}:${minute}`;
    },
    filterDateMain(value) {
      let timeAgo = Math.ceil((new Date() - new Date(value)) / 60000);
      if (timeAgo <= 1) {
        return `1 minute ago`;
      }
      if (timeAgo > 1 && timeAgo < 60) {
        return `${timeAgo} minutes ago`;
      }
      if (timeAgo >= 60 && timeAgo < 1440) {
        timeAgo = Math.round(timeAgo / 60);
        return `${timeAgo} hours ago`;
      }
      if (timeAgo >= 1440 && timeAgo < 2880) {
        return `1 day ago`;
      }
      if (timeAgo >= 2880) {
        timeAgo = Math.round(timeAgo / 60 / 24);
        return `${timeAgo} days ago`;
      }
    },
    updatePage() {
      this.getComments();
    },
  },
};
</script>

<style scoped>
.comment-box,
.enter-comment-box {
  padding: 20px 15px;
}

.comment-user-img img {
  width: 75px;
  height: 75px;
  box-shadow: 0 0 3px #4ff48a;
  border-radius: 50%;
  object-fit: cover;
}

.comment-info {
  width: 80%;
  background-color: #ebebeb50;
  padding: 10px 10px 10px 20px;
  border-radius: 35px 15px 35px 0px;
}

.comment-user-name {
  color: #4ff48a;
  font-size: 2rem;
}

.comment-content {
  color: #fff;
  font-size: 1.4rem;
}

.formgroup {
  width: 100%;
  min-height: 116px;
  background-color: #fff;
  border-radius: 5px;
  position: relative;
}

button.button-comment {
  position: absolute;
  top: 0;
  right: 0;

  min-width: 30%;
  min-height: 100%;
  border: none;
  padding: 10px;
  background-image: linear-gradient(to right bottom, #4ff48a, #1fe4ec);
  border: none;
  color: #333;
  font-weight: bold;
  font-size: 1.15rem;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  cursor: pointer;
  filter: brightness(90%);
}

textarea {
  display: block;
  height: 116px;
  resize: none;
  overflow: auto;
}

textarea {
  width: 70%;
  border: none;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  outline: none;
  padding: 10px;
  font-size: 1em;
  color: #676767;
  transition: border 0.5s;
  border: solid 3px #4ff48a;
}

textarea:focus {
  box-shadow: 0 0 20px #4ff48a;
}

.comment-all {
  overflow-y: auto;
  max-height: 300px;
  width: 100%;
  border: 1px solid #fff;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 0 5px #fff;
}

.comment-all::-webkit-scrollbar {
  width: 10px;
  height: 0;
  /* Chiều rộng vùng chứa scrollbar */
}

.comment-all::-webkit-scrollbar-track {
  background: #2d3399;
  border-radius: 5px;
  /* Màu nền ngoài của thanh scrollbar */
}

.comment-all::-webkit-scrollbar-thumb {
  background-color: #4ff48a;
  /* Màu của thanh cuộn (scroll thumb) */
  border-radius: 10px;
  /* Bo góc scroll thumb */
  border: 3px solid #2d3399;
  /* Không hỗ trợ padding, margin, transition nên dùng viền cùng màu nên để padding scroll thumb */
}

.comment-all::-webkit-scrollbar-thumb:hover {
  filter: brightness(150%);
  /* Hiệu ứng di chuột đổi màu*/
}

@media screen and (max-width: 500px) {
  .comment-user-img img {
    width: 40px;
    height: 40px;
  }

  .comment-user-name {
    font-size: 1.6rem;
  }

  .comment-content {
    font-size: 1rem;
  }

  .comment-info a {
    font-size: 1rem;
    padding: 0;
  }
}

@media screen and (min-width: 500px) and (max-width: 768px) {
  .comment-user-img img {
    width: 60px;
    height: 60px;
  }
}
</style>
