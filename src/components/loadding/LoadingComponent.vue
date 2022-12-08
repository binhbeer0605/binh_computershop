<template>
  <div class="loading">
    <span class="loader"></span>
  </div>
</template>

<style scoped>
.loading {
  text-align: center;
  position: relative;
  top: 100px;
  bottom: 50%;
  left: 0;
  right: 0;
  height: calc(100vh - 100px);
}
.loader {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: inline-block;
  position: relative;
  border: 3px solid;
  border-color: #fff #fff transparent;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
  top: 25%;
}
.loader::after {
  content: "";
  box-sizing: border-box;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  border: 3px solid;
  border-color: transparent #ff3d00 #ff3d00;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  animation: rotationBack 0.5s linear infinite;
  transform-origin: center center;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes rotationBack {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(-360deg);
  }
}
</style>
