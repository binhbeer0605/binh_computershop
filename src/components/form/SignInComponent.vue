<template>
  <form @submit.prevent="submitFormLogin" class="form" id="form-2">
    <h3 class="heading">Sign In</h3>

    <div class="spacer"></div>

    <div class="form-group">
      <label for="username" class="form-label">User Name</label>
      <input
        type="text"
        placeholder="Ex: ronal7.portugal"
        class="form-control"
        v-model="loginForm.userName"
        @keyup.enter="submitFormLogin()"
      />
      <span class="form-message"></span>
    </div>

    <div class="form-group">
      <label for="password" class="form-label">Password</label>
      <input
        type="password"
        placeholder="Enter Password"
        class="form-control"
        v-model="loginForm.password"
        @keyup.enter="submitFormLogin()"
      />
      <span class="form-message"></span>
    </div>

    <button type="submit" class="form-submit">Sign Up</button>
  </form>
</template>

<script>
import { ref, reactive } from "vue";
import axios from "axios";
import { APIURL } from "@/constant";
export default {
  setup() {
    const user = ref([]);
    const loginForm = reactive({
      userName: "",
      password: "",
    });

    return { loginForm, user };
  },
  methods: {
    async submitFormLogin() {
      const { data } = await axios.get(`${APIURL}/users`);
      const { userName, password } = this.loginForm;
      let result = 0;

      data.forEach((element) => {
        if (element.userName === userName && element.password === password) {
          localStorage.setItem("user", JSON.stringify(element));
          result++;
          window.location.href = "http://localhost:8080/products";
        }
      });
      if (!result) {
        alert("Login failed!");
        this.$router.push("/signin");
      }
    },
  },
};
</script>

<style scoped>
.form {
  width: 360px;
  padding: 32px 24px;

  background: #fff;
  border-radius: 2px;
  margin-top: 100px;
  align-self: center;
  box-shadow: 0 0 5px 0 #4ff48a;
}
.form .heading {
  text-align: center;
  font-size: 2rem;
}
.form .desc {
  text-align: center;
  color: #636d77;
  font-size: 1.6rem;
  font-weight: lighter;
  line-height: 2.4rem;
  margin-top: 16px;
  font-weight: 300;
}

.form-group {
  display: flex;
  margin-bottom: 16px;
  flex-direction: column;
}

.form-label,
.form-message {
  text-align: left;
}

.form-label {
  font-weight: 700;
  padding-bottom: 6px;
  line-height: 1.8rem;
  font-size: 1.4rem;
}

.form-control {
  height: 40px;
  padding: 8px 12px;
  border: 1px solid #b3b3b3;
  border-radius: 3px;
  outline: none;
  font-size: 1.4rem;
}

.form-control:hover {
  border-color: #1dbfaf;
}

.form-group.invalid .form-control {
  border-color: #c31432;
}

.form-group.invalid .form-message {
  color: #c31432;
}

.form-message {
  font-size: 1.2rem;
  line-height: 1.6rem;
  padding: 4px 0 0;
}

.form-submit {
  outline: none;
  background-color: #1dbfaf;
  margin-top: 12px;
  padding: 12px 16px;
  font-weight: 600;
  color: #fff;
  border: none;
  width: 100%;
  font-size: 14px;
  border-radius: 8px;
  cursor: pointer;
}

.form-submit:hover {
  background-color: #1ac7b6;
}

.spacer {
  margin-top: 36px;
}

@media screen and (max-width: 720px) {
  .form {
    max-height: calc(100vh - 100px);
  }
}
</style>
