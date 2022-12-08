<template>
  <span class="loader text-center"></span>
</template>
<script></script>
<style scoped>
.loader {
  font-size: 48px;
  color: #fff;
  display: inline-block;
  font-family: Arial, Helvetica, sans-serif;
  font-weight: 400;
  position: relative;
  padding: 20px 15px;
}
.loader:before {
  content: "";
  animation: 2s print linear alternate infinite;
}

@keyframes blink {
  0% {
    visibility: hidden;
  }
  100% {
    visibility: visible;
  }
}
@keyframes print {
  0% {
    content: "L";
  }
  10% {
    content: "Lo";
  }
  20% {
    content: "Loa";
  }
  30% {
    content: "Load";
  }
  40% {
    content: "Loadi";
  }
  50% {
    content: "Loadin";
  }
  60% {
    content: "Loading";
  }
  70% {
    content: "Loading.";
  }
  80% {
    content: "Loading..";
  }
  90%,
  100% {
    content: "Loading...";
  }
}
</style>
