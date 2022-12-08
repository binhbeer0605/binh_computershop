<template>
  <div>
    <div class="about-parent">
      <div class="about-son">
        <div class="about-container">
          <div class="about-left" :class="{ show: isShow }">
            <div class="about-img"></div>
            <div class="about-info-author-mobile" v-if="isShow">
              <h3>Contact Author</h3>
              <ul>
                <li>
                  <a href="https://facebook.com/bang.6599" target="_blank">
                    <font-awesome-icon :icon="['fab', 'facebook']" />
                    bang.6599
                  </a>
                </li>
                <li>
                  <a href="mailto: binh18102015@gmail.com">
                    <font-awesome-icon :icon="['fas', 'envelope']" />
                    binh18102015@gmail.com
                  </a>
                </li>
                <li>
                  <a href="tel: +84834981315">
                    <font-awesome-icon :icon="['fas', 'phone']" />
                    +84 834 981 315
                  </a>
                </li>
              </ul>
              <h3>Github</h3>
              <ul>
                <li>
                  <a href="https://github.com/binhbeer0605" target="_blank">
                    <font-awesome-icon :icon="['fab', 'github']" />
                    binhbeer0605
                  </a>
                </li>
              </ul>
            </div>
            <div class="about-info">
              <table>
                <tr>
                  <td>ID</td>
                  <td>501210026</td>
                </tr>
                <tr>
                  <td>Fullname</td>
                  <td>Nguyen Thanh Binh</td>
                </tr>
                <tr>
                  <td>Day of birth</td>
                  <td>May, 06 1999</td>
                </tr>
              </table>
            </div>
            <div class="about-circle1">
              <div class="about-circle" @click="showMore()">
                <span v-if="!isShow">show</span>
                <span v-else>hide</span>
              </div>
            </div>
          </div>
          <div class="about-right" :class="{ show: isShow }">
            <div class="about-up">
              <h3>This Websites</h3>
              <p>
                Made with
                <a href="https://vuejs.org/guide/introduction.html">Vue.js</a>
              </p>
              <h3>Languages</h3>
              <span class="progress">
                <span
                  class="progress1"
                  style="background-color: #41b883; width: 74%"
                ></span>
                <span
                  class="progress1"
                  style="background-color: #f1e05a; width: 23%"
                ></span>
                <span
                  class="progress1"
                  style="background-color: #ccc; width: 3%"
                ></span>
              </span>
              <ul>
                <li><span class="progress-detail vue"></span> Vue</li>
                <li>
                  <span class="progress-detail javascript"></span> Javascript
                </li>
                <li><span class="progress-detail other"></span> Other</li>
              </ul>
              <div class="info-author-mobile"></div>
            </div>
            <div class="about-down">
              <h3>Contact Author</h3>
              <ul>
                <li>
                  <a href="https://facebook.com/bang.6599" target="_blank">
                    <font-awesome-icon :icon="['fab', 'facebook']" />
                    bang.6599
                  </a>
                </li>
                <li>
                  <a href="mailto: binh18102015@gmail.com">
                    <font-awesome-icon :icon="['fas', 'envelope']" />
                    binh18102015@gmail.com
                  </a>
                </li>
                <li>
                  <a href="tel: +84834981315">
                    <font-awesome-icon :icon="['fas', 'phone']" />
                    +84 834 981 315
                  </a>
                </li>
              </ul>
              <h3>Github</h3>
              <ul>
                <li>
                  <a href="https://github.com/binhbeer0605" target="_blank">
                    <font-awesome-icon :icon="['fab', 'github']" />
                    binhbeer0605
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isShow: false,
    };
  },
  methods: {
    showMore() {
      this.isShow = !this.isShow;
    },
  },
};
</script>

<style scoped>
ul {
  list-style: none;
}

/** End Generl **/

/*** Start about-Parent & about-Son ***/

.about-parent {
  margin: 100px auto 0;
  width: 100%;
  padding: 30px 0;
  background-image: linear-gradient(
    to right,
    #55338d,
    #773c98,
    #9846a2,
    #b751aa,
    #d65db1
  );
  border-radius: 5px;
  box-shadow: 23px 27px 28px -20px rgba(0, 0, 0, 0.75);
  height: calc(100vh - 100px);
  user-select: none;
}

.about-parent .about-son {
  width: 100%;
  max-width: 900px;
  height: 100%;
  padding: 0 55px;
  margin: 0 auto;
  background-image: linear-gradient(
    to right,
    #2c73d2,
    #6d6fd2,
    #9869cc,
    #ba63c1,
    #d65db1
  );
  overflow: hidden;
  border-radius: 5px;
  box-shadow: 0px 1px 25px 0px rgba(50, 50, 50, 0.91);
}

.about-parent .about-son .about-container {
  height: 100%;
  position: relative;
  right: -30px;
  margin: 0 auto;
  max-width: 700px;
}

/*** End about-Parent & about-Son ****/

/*** Start about-Left ****/

.about-parent .about-son .about-left,
.about-parent .about-son .about-right {
  display: inline-block;
}

.about-parent .about-son .about-right {
  opacity: 0;
  right: 0;
  transform: translate(-50%, -50%);
  transition: all linear 0.2s;
}

.about-parent .about-son .about-right.show {
  right: 55px;
  opacity: 1;
  transform: translate(0, -50%);
  transition: all linear 0.5s;
}

.about-parent .about-son .about-left {
  left: 50%;
  transform: translate(-50%, -50%);
  transition: all linear 0.3s;
}

.about-parent .about-son .about-left.show {
  left: 0;
  transform: translate(0, -50%);
  transition: all linear 0.5s;
}

.about-parent .about-son .about-left {
  width: 310px;
  height: 350px;
  overflow: hidden;
  position: relative;
  top: 50%;
  z-index: 333;
  border-radius: 5px;
  box-shadow: 0px 1px 22px 0px rgba(50, 50, 50, 0.65);
}

.about-parent .about-son .about-left .about-img {
  background-image: url("https://scr.vn/wp-content/uploads/2020/07/H%C3%ACnh-n%E1%BB%81n-m%C3%A0u-%C4%91en-ch%E1%BA%A5t.jpg");
  background-size: cover;
  width: 100%;
  height: 50%;
}

.about-info-author-mobile {
  width: 100%;
  height: 50%;
  display: none;
  overflow: hidden;
  background-image: linear-gradient(
    to right,
    #845ec2,
    #7464c8,
    #6169cd,
    #4b6ed0,
    #2c73d2
  );
  padding: 15% 5%;
}

.about-info-author-mobile h3 {
  color: #fff;
}

.about-info-author-mobile a,
.about-info-author-mobile a svg {
  color: #242663;
}

.about-parent .about-son .about-left .about-info {
  width: 100%;
  height: 50%;
  overflow: hidden;
  background-image: linear-gradient(
    to right,
    #845ec2,
    #7464c8,
    #6169cd,
    #4b6ed0,
    #2c73d2
  );
  padding: 15% 5%;
}

.about-parent .about-son .about-left .about-info table tr td {
  color: #ccc;
}

.about-parent .about-son .about-left .about-info table tr td:last-child {
  font-weight: 600;
  color: #fff;
  width: 55%;
}

.about-left .about-circle1 {
  width: 81px;
  height: 81px;
  position: absolute;
  top: 50%;
  right: 50%;
  transform: translate(50%, -50%);
  background-color: #55338d;
  border-radius: 50%;
  font-size: 12px;
  margin: 0 auto;
  text-align: center;
  box-shadow: 0px 1px 25px 0px rgba(50, 50, 50, 0.51);
  display: flex;
  align-items: center;
}

.about-left .about-circle1:hover {
  box-shadow: 0px 1px 25px 0px #4df390;
  cursor: pointer;
}

.about-left .about-circle1 .about-circle {
  border: 3px solid #4df390;
  width: 70px;
  height: 70px;
  border-radius: 50%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
}

.about-left .about-circle1 .about-circle span {
  display: block;
  font-size: 7.5px;
  text-transform: uppercase;
  font-weight: bold;
}

.about-left .about-circle1 .about-circle span {
  color: #fff;
  font-size: 14.5px;
  padding: 3px;
}

/*** End about-Left ***/

/*== Start about-Right ==*/

.about-parent .about-son .about-right {
  width: 380px;
  position: relative;
  top: 50%;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0px 1px 25px 0px rgba(50, 50, 50, 0.91);
}

.about-parent .about-son .about-right .about-up {
  width: 100%;
  height: 50%;
  background-image: linear-gradient(
    to about-right top,
    #ecf0f1,
    #e7f5f4,
    #e6faf1,
    #eefde8,
    #fefedf
  );
  padding: 40px 40px 0 80px;
  border-radius: 5px 5px 0 0;
}

.about-parent .about-son .about-right .about-up .progress-detail {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  display: inline-block;
}

.progress-detail.vue {
  background-color: #41b883;
}

.progress-detail.javascript {
  background-color: #f1e05a;
}

.progress-detail.other {
  background-color: #ccc;
}

.about-son .about-right .about-down {
  width: 100%;
  height: 50%;
  padding: 10px 0 40px 80px;
}

.about-son .about-right .about-down svg,
.about-son .about-right .about-down a {
  color: #2c3e50;
  font-size: 1.4rem;
}

.about-son .about-right .about-down a:hover {
  color: #55338d;
  font-weight: 700;
}

/*== End about-Right ==*/

/* Animation */

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@media screen and (max-width: 996px) {
  .about-parent {
    background-image: none;
  }

  .about-parent .about-son {
    padding: 0;
  }

  .about-parent .about-son .about-container {
    right: 0;
  }

  .about-info-author-mobile {
    display: block;
  }

  .about-parent .about-son .about-left {
    left: 50%;
    transform: translate(-50%, -50%);
    height: 400px;
  }

  .about-parent .about-son .about-left.show {
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .about-parent .about-son .about-right {
    display: none;
  }
}

@media screen and (min-width: 997px) {
}
</style>
