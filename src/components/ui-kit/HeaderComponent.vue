<template>
  <div
    ref="filterRef"
    :class="{ 'border-x-indigo-500 border-2': isFilterTransparent }"
    class="w-full m-auto border-b-mainLightGray p-[10px] sticky top-0 flex items-center bg-white border z-10"
  >
    <div
      class="max-h-[80px] flex items-center m-auto max-w-[1280px] justify-between w-full"
    >
      <div class="flex gap-20">
        <div class="mt-[-5px]">
          <router-link to="/">
            <img
              class="min-w-[133px] h-[26px]"
              width="133"
              height="26"
              src="../../assets/logo-stackoverflow.png"
              alt="Logo"
            />
          </router-link>
        </div>
        <div
          class="min-w-fit flex gap-10 font-FivoSans font-bold max-[1100px]:hidden"
        >
          <router-link :to="{ name: 'about' }">About</router-link>
          <router-link to="/products">Products</router-link>
          <router-link to="/teams">For Teams</router-link>
        </div>
      </div>

      <div class="w-full max-w-[500px] relative max-[1100px]:max-w-none ml-5">
        <input
          v-model="searchString"
          type="text"
          class="text-[16px] bg-mainLightGray border rounded-[14px] px-6 py-3 outline-none w-full"
          placeholder="Search"
          :suffix-icon="Search"
          @input="$emit('search-value', searchString)"
        />
        <img
          class="absolute top-[50%] right-6 translate-y-[-50%]"
          src="../../assets/icon_serch.png"
          alt="search"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { Search } from '@element-plus/icons-vue'
import { ref } from 'vue'

const searchString = ref('')

const emit = defineEmits({ 'search-value': String })
</script>

<style></style>
