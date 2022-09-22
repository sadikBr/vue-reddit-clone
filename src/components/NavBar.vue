<template>
  <header>
    <div class="container">
      <h1 class="logo">Reddit</h1>

      <nav>
        <slot></slot>
        <!-- <ul>
          <li>Register</li>
          <li>Login</li>
        </ul> -->
      </nav>
    </div>
  </header>
</template>

<script setup></script>

<style scoped>
header {
  width: 100%;
  padding: 0.5rem;
  background: #000a29;
  box-shadow: 0 0 20px 15px #000a29;
}

.container {
  width: 80%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

nav {
  display: flex;
  align-items: center;
  gap: 3rem;
}

ul {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

ul li {
  list-style: none;
  cursor: pointer;
}
</style>
