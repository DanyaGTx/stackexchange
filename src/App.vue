<template>
  <div class="w-full m-auto">
    <HeaderComponent @search-value="updateSearchValue" />
    <div class="max-w-[1280px] m-auto">
      <SideBarComponent @update-filters="updateFilters" />
    </div>
    <router-view :filters="filters" :search-value="searchValue" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import HeaderComponent from './components/ui-kit/HeaderComponent.vue'
import SideBarComponent from './components/ui-kit/SideBarComponent.vue'

const searchValue = ref('')

const updateSearchValue = (value) => {
  searchValue.value = value
}
</script>
