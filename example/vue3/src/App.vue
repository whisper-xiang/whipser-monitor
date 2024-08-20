<script setup lang="ts">
// import HelloWorld from './components/HelloWorld.vue'
// import About from './components/About.vue';
</script>

<template>
  <!-- <HelloWorld msg="Vite + Vue" />
  <About /> -->

  <nav>

    <router-link to="/">

      <el-button>Home </el-button>
    </router-link>

    <router-link to="/about">
      <el-button>about </el-button>
    </router-link>
  </nav>

  <div style="margin-top: 50px;">
    <router-view />
  </div>

</template>

<style scoped></style>
