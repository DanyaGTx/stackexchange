<template>
  <div class="w-full text-center bg-white shadow-box-shadow-element p-4">
    <div class="mb-[10px] text-left relative">
      <label
        class="absolute z-10 top-[50%] translate-y-[-50%] left-[40px]"
        for="dateFrom"
        >Date From:</label
      >
      <input
        id="dateFrom"
        :value="filters.fromdate"
        type="date"
        class="datepicker relative text-[16px] bg-mainLightGray border rounded-[14px] px-6 py-3 outline-none w-full text-right pl-10"
        @input="updateFilterField('fromdate', $event.target.value)"
      />
    </div>
    <div class="mb-[10px] text-left relative">
      <label
        class="min-w-[80px] absolute z-10 top-[50%] translate-y-[-50%] left-[40px]"
        for="dateTo"
        >Date To:</label
      >
      <input
        id="dateTo"
        :value="filters.todate"
        type="date"
        placeholder="Date to"
        class="text-[16px] relative bg-mainLightGray border rounded-[14px] px-6 py-3 outline-none w-full text-right pl-10"
        @input="updateFilterField('todate', $event.target.value)"
      />
    </div>
    <div class="mb-[10px] w-full">
      <input
        :value="filters.tagged"
        class="text-[16px] bg-mainLightGray border rounded-[14px] px-6 py-3 outline-none w-full"
        type="text"
        placeholder="Tagged"
        @input="updateFilterField('tagged', $event.target.value)"
      />
    </div>

    <div class="flex w-full gap-3 mt-5">
      <button
        class="py-3 px-4 rounded-[14px] font-bold bg-transparent w-[125px] border border-mainGray text-mainGray hover:bg-mainLightGray transition ease-in"
        @click="clearFilters"
      >
        Clear
      </button>
      <button
        :class="{ isFiltersLoading: 'opacity-5' }"
        class="py-3 px-4 rounded-[14px] font-bold bg-accentSun w-[125px] hover:bg-[#fcbb0a] hover:shadow-box-shadow-element transition ease-in"
        @click="acceptFilters"
      >
        Save Filters
      </button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  filters: {
    type: Object,
    default: () => ({
      tagged: '',
      fromdate: '',
      todate: '',
      sortType: '',
    }),
  },
})

const emit = defineEmits({
  'update-filters': null,
  'accept-filters': null,
  'clear-filters': null,
})

const updateFilterField = (fieldName, fieldValue) => {
  emit('update-filters', { fieldName, fieldValue })
}

const acceptFilters = () => {
  emit('accept-filters')
}

const clearFilters = () => {
  emit('clear-filters')
}
</script>

<style>
.filters__popup {
  position: absolute;
  right: 0px;
  margin-top: 10px;
  background: #fff;
  border-radius: 14px;
  overflow: hidden;
  max-width: 300px;
  filter: drop-shadow(2px 14px 34px rgba(41, 63, 141, 0.08));
}

input[type='date']::-webkit-calendar-picker-indicator {
  position: absolute;
  -webkit-appearance: none;
  background-image: url('../assets/calendar-icon.svg');
  background-size: 30px 30px;
  left: 10px;
  padding-left: 10px;
  background-position: right center;
  background-repeat: no-repeat;
  appearance: none;
  -webkit-appearance: none;
}
</style>
