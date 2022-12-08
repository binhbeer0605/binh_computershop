<template>
  <div>
    <b-carousel
      controls
      indicators
      v-model="slide"
      :interval="3500"
      background="#e1e1e1"
      img-width="1000"
      img-height="500"
      @sliding-end="endSlide"
      @sliding-start="initCarousel"
      style="text-shadow: 2px 3px 3px #222222"
    >
      <b-carousel-slide
        text="A journey of a thousands mile starts with a single step."
        img-src="https://picsum.photos/1000/500/?image=55"
        caption="The Alchemist"
      >
      </b-carousel-slide>

      <b-carousel-slide img-src="https://picsum.photos/1000/500/?image=56">
        <h2>Love For All, Hatred For None</h2>
      </b-carousel-slide>

      <b-carousel-slide
        img-src="https://picsum.photos/1000/500/?image=57"
      ></b-carousel-slide>

      <b-carousel-slide>
        <template v-slot:img>
          <img
            class="d-block img-fluid w-100"
            src="https://picsum.photos/1000/500/?image=55"
            width="1000"
            height="500"
            alt="Atomic Habits"
          />
        </template>
      </b-carousel-slide>

      <b-carousel-slide caption="Life Quote" img-alt="Life Quote" img-blank>
        <p>The last mile is always the least crowded.</p>
      </b-carousel-slide>
    </b-carousel>
  </div>
</template>

<script>
export default {
  name: "ImgCarousel",
  data() {
    return {
      slide: 0,
      sliding: null,
    };
  },
  methods: {
    initCarousel() {
      this.sliding = true;
    },
    endSlide() {
      this.sliding = false;
    },
  },
};
</script>
