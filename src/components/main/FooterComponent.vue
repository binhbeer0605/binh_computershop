<template>
  <div id="footer">
    <div class="container text-center">
      <font-awesome-icon
        :icon="['fab', 'facebook']"
        style="padding-right: 5px"
      />
      <font-awesome-icon
        :icon="['fab', 'instagram']"
        style="padding-right: 5px"
      />
      <font-awesome-icon
        :icon="['fab', 'youtube']"
        style="padding-right: 5px"
      />
      <font-awesome-icon
        :icon="['fab', 'pinterest']"
        style="padding-right: 5px"
      />
      <font-awesome-icon
        :icon="['fab', 'twitter']"
        style="padding-right: 5px"
      />
      <font-awesome-icon
        :icon="['fab', 'linkedin']"
        style="padding-right: 5px"
      />
      <br />
      <p class="opacity">
        Powered by
        <a href="https://facebook/bang.6599" style="color: #4ff48a"
          >Bình BeEr</a
        >
      </p>
    </div>
  </div>
</template>
<style>
#footer {
  border-top: 5px solid #4ff48a;
  padding: 50px 0;
}
#footer a,
#footer svg {
  color: #fff;
  font-size: 2rem;
}
#footer a:hover,
#footer svg:hover {
  opacity: 0.4;
}
</style>
