<template>
  <div class="box">
    <div class="error-message">
      <div class="icon">
        <font-awesome-icon :icon="['fas', 'screwdriver-wrench']" />
      </div>
      This page is updating!!! Please come back later
      <font-awesome-icon class="heart" :icon="['fas', 'heart']" />
    </div>
  </div>
</template>

<style>
.box {
  width: 100%;
  height: calc(100vh - 120px);
  position: relative;
}
.error-message {
  text-align: center;
  color: #fec321;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.icon svg {
  font-size: 100px;
  padding: 20px;
  color: #fec321;
}

svg.heart {
  color: #dc3545;
}
</style>
