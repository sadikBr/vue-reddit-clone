<template>
  <div class="loading">
    <img
      src="https://i.pinimg.com/originals/3e/f0/e6/3ef0e69f3c889c1307330c36a501eb12.gif"
      alt="loading spinner"
    />
  </div>
</template>

<script setup></script>

<style scoped>
.loading {
  display: none;
  align-items: center;
  justify-content: center;
}

.loading img {
  width: 10%;
  object-fit: cover;
}

.show-loading {
  display: flex;
}
</style>
