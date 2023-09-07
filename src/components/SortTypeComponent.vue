<template>
  <div class="sort relative">
    <div
      class="flex items-center justify-end gap-3 max-[620px]:justify-start max-[620px]:mb-3"
    >
      <b class="font-light text-mainGray max-[480px]:hidden">Sort by:</b>
      <span
        ref="sortBySelect"
        :class="{ selectActive: isSelectAcitve }"
        class="select bg-mainLightGray border rounded-[14px] px-6 py-3 outline-none w-full font-medium cursor-pointer max-w-[192px]"
        @click="isSelectAcitve = !isSelectAcitve"
        >{{ formattedSortType }}</span
      >
    </div>
    <div v-show="isSelectAcitve" class="sort__popup">
      <ul>
        <li
          v-for="item in sortOptions"
          :key="item.value"
          :class="{ active: sortType === item.value }"
          @click="setSortType(item.value)"
        >
          {{ item.label }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { onClickOutside } from '@vueuse/core'
const isSelectAcitve = ref(false)
const sortBySelect = ref(null)
const setSortType = (sortType) => {
  emit('update-sort-type', sortType)
  isSelectAcitve.value = false
}
const sortOptions = [
  {
    value: 'activity',
    label: 'Activity',
  },
  {
    value: 'creation',
    label: 'Creation',
  },
  {
    value: 'votes',
    label: 'Votes',
  },
]

const props = defineProps({
  sortType: {
    type: String,
    default: 'activity',
  },
})

const formattedSortType = computed(() => {
  return props.sortType.charAt(0).toUpperCase() + props.sortType.slice(1)
})

const emit = defineEmits({ 'update-sort-type': String })

onClickOutside(sortBySelect, (event) => {
  isSelectAcitve.value = false
})
</script>

<style>
.select {
  appearance: none;
  background-image: url('../assets/arrow-select.svg');
  background-repeat: no-repeat;
  background-position: right 16px center;
}

.selectActive {
  background-image: url('../assets/arrow-select-close.svg');
}

.sort__label {
  display: flex;
  align-items: center;
}

.sort__popup {
  position: absolute;
  right: 0;
  margin-top: 10px;
  background: #fff;
  border-radius: 14px;
  overflow: hidden;
  width: 190px;
  filter: drop-shadow(2px 14px 34px rgba(41, 63, 141, 0.08));
}

.sort__popup ul {
  overflow: hidden;
}

.sort__popup ul li.active,
.sort__popup ul li:hover {
  background-color: #eceef0;
  font-weight: 700;
  color: #151515;
}

.sort__popup ul :first-child {
  border-radius: 14px 14px 0 0;
}

.sort__popup ul li {
  padding: 12px 17px;
  cursor: pointer;
  font-size: 16px;
  line-height: 26px;
  transition: all 0.2s ease;
}
</style>
