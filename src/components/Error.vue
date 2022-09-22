<template>
  <div class="error">{{ props.error }}</div>
</template>

<script setup>
const props = defineProps({
  error: String,
});
</script>

<style scoped>
.error {
  position: absolute;
  top: 15%;
  left: 0;
  padding: 1rem;
  background: rgb(28, 40, 83);
  color: whitesmoke;
  border-top-right-radius: 0.25rem;
  border-bottom-right-radius: 0.25rem;
  transform: translateX(-100%);
}

.show-error {
  animation: show-error 5s ease-in-out forwards;
}

@keyframes show-error {
  5% {
    transform: translateX(0);
  }
  95% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-100%);
  }
}
</style>
