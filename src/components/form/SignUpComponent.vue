<template>
  <form @submit.prevent="submit" class="form" id="form-1">
    <h3 class="heading">Sign Up</h3>

    <div class="spacer"></div>

    <div class="form-group" :class="{ invalid: errorMessage.userName }">
      <label for="username" class="form-label">User Name</label>
      <input
        id="username"
        name="username"
        type="text"
        placeholder="Ex: ronal7.portugal"
        class="form-control"
        v-model="form.userName"
        @blur="handleValidateUserName()"
        @input="handleClearErrorUserName()"
      />
      <span class="form-message">{{ errorMessage.userName }}</span>
    </div>

    <div class="form-group" :class="{ invalid: errorMessage.password }">
      <label for="password" class="form-label">Password</label>
      <input
        id="password"
        name="password"
        type="password"
        placeholder="Enter Password"
        class="form-control"
        v-model="form.password"
        @blur="handleValidatePassword()"
        @input="handleClearErrorPassword()"
      />
      <span class="form-message">{{ errorMessage.password }}</span>
    </div>

    <div class="form-group" :class="{ invalid: errorMessage.repeatPassword }">
      <label for="password_confirmation" class="form-label"
        >Repeat Password</label
      >
      <input
        id="password_confirmation"
        name="password_confirmation"
        placeholder="Enter Repeat Password"
        type="password"
        class="form-control"
        v-model="form.repeatPassword"
        @blur="handleValidateRepeatPassword()"
        @input="handleClearErrorRepeatPassword()"
      />
      <span class="form-message">{{ errorMessage.repeatPassword }}</span>
    </div>

    <div class="form-group">
      <label for="avatar" class="form-label">Avatar</label>
      <input type="file" name="avatar" id="avatar" @change="onChange" />
      <img id="photo-preview" :src="form.avatar" />
    </div>

    <button type="submit" class="form-submit">Sign Up</button>
  </form>
</template>

<script>
import { reactive } from "vue";
import axios from "axios";
import { APIURL } from "@/constant";
export default {
  setup() {
    const errorMessage = reactive({
      userName: "",
      password: "",
      repeatPassword: "",
      avatar: "",
    });
    const form = reactive({
      userName: "",
      password: "",
      repeatPassword: "",
      listFavorite: [],
      listCart: [],
      avatar: undefined,
    });

    function onChange(event) {
      if (event.target.files[0].size <= 3170344) {
        const reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
        reader.onload = () => {
          form.avatar = reader.result;
        };
      } else {
        alert("Photo size is too large. Please choose another photo");
      }
    }

    function handleValidateUserName() {
      if (form.userName === "") {
        errorMessage.userName = "Username cannot empty";
      } else {
        errorMessage.userName = "";
      }
    }

    function handleValidatePassword() {
      if (form.password === "") {
        errorMessage.password = "Password cannot empty";
      } else {
        errorMessage.password = "";
      }
    }

    function handleValidateRepeatPassword() {
      if (form.repeatPassword === "") {
        errorMessage.repeatPassword = "Repeat Password cannot empty";
      } else if (form.repeatPassword !== form.password) {
        errorMessage.repeatPassword = "Password Repeat is incorrect";
      } else {
        errorMessage.repeatPassword = "";
      }
    }

    function handleClearErrorUserName() {
      errorMessage.userName = "";
    }

    function handleClearErrorPassword() {
      errorMessage.password = "";
    }

    function handleClearErrorRepeatPassword() {
      errorMessage.repeatPassword = "";
    }

    return {
      errorMessage,
      form,
      onChange,
      handleValidateUserName,
      handleValidatePassword,
      handleValidateRepeatPassword,
      handleClearErrorUserName,
      handleClearErrorPassword,
      handleClearErrorRepeatPassword,
    };
  },
  methods: {
    async submit() {
      const { userName, password, repeatPassword, avatar } = this.form;
      let result = true;
      if (!userName || !password || !repeatPassword || !avatar) {
        alert("Please enter all feild!");
        return;
      }

      const { data } = await axios.get(`${APIURL}/users`);

      data.forEach((element) => {
        if (element.userName.toLowerCase() === userName.toLowerCase()) {
          result = false;
        }
      });

      // giả sử nếu mỗi đối tượng có id, nếu id đã có rồi thì nó chỉ update còn chưa có thì thêm vào
      if (result) {
        const { id } = this.$route.params;
        if (id) {
          await axios.put(`${APIURL}/users/${id}`, this.form);
        } else {
          await axios.post(`${APIURL}/users`, this.form);
          alert("Register successful!");
          this.$router.push("/signin");
        }
      } else {
        alert("User Name already exist!");
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
