<template>
  <div
    class="w-[165px] border border-b-mainLightGray border-t-0 border-l-0 min-h-screen fixed top-[75px] pt-[50px] font-FivoSans max-[1300px]:pl-2 max-[620px]:w-[120px] max-[420px]:top-[40px]"
  >
    <div class="mb-8">
      <router-link
        class="text-xl font-medium"
        :class="{
          'router-link-exact-active': $route.path.includes('questions'),
        }"
        :to="{ name: 'questions' }"
      >
        Questions
      </router-link>
    </div>

    <router-link
      class="text-xl font-medium"
      :class="{
        'router-link-exact-active': $route.path.includes('about'),
      }"
      :to="{ name: 'about' }"
    >
      About
    </router-link>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
defineEmits({ 'update-filters': Object })
</script>

<style scoped>
.router-link-exact-active {
  display: flex;
  position: relative;
  width: fit-content;
}

.router-link-exact-active::after {
  left: 50%;
  transform: translateX(-50%);
  bottom: 0;
  position: absolute;
  display: block;
  content: '';
  width: 100%;
  height: 5px;
  background-color: #ffd842;
}
</style>
