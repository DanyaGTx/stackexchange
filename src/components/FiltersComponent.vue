<template>
  <div>
    <el-select class="m-2" placeholder="Filters" size="large">
      <div class="text-center bg-[#f5f7fa]">
        <div>
          <el-option class="bg-[#f5f7fa]" value="fromdate">
            <h3>From date</h3>
          </el-option>
          <el-date-picker
            class="ml-[20px]"
            :model-value="filters.fromdate"
            @update:model-value="updateFilterField('fromdate', $event)"
            type="date"
            value-format="X"
            placeholder="Pick a day"
          />
        </div>
        <div>
          <el-option class="bg-[#f5f7fa]" value="todate">
            <h3>To date</h3>
          </el-option>
          <el-date-picker
            class="ml-[20px]"
            :model-value="filters.todate"
            @update:model-value="updateFilterField('todate', $event)"
            type="date"
            value-format="X"
            placeholder="Pick a day"
          />
        </div>
        <el-option value="tagged">
          <h3>Tagged</h3>
        </el-option>
        <div>
          <el-input @input="updateFilterField('tagged', $event)" :model-value="filters.tagged" class="max-w-[100px]" />
        </div>
        <el-button
          el-button
          class="m-[10px]"
          @click="acceptFilters"
          type="success"
          plain
          >Save filters</el-button
        >
      </div>
    </el-select>
    <el-select
      @update:model-value="updateFilterField('sortType', $event)"
      :model-value="filters.sortType"
      class="m-2"
      placeholder="Sort by"
      size="large"
      >
      <el-option
        v-for="item in sortOptions"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
  </div>
</template>

<script setup>
import { ElInput,ElSelect,ElOption,ElButton,ElDatePicker } from 'element-plus'

const sortOptions = [
    {
      value: 'activity',
      label: 'activity',
    },
    {
      value: 'creation',
      label: 'creation',
    },
    {
      value: 'votes',
      label: 'votes',
    },
  ]

const emit = defineEmits({ 'update-filters': null, 'accept-filters': null })


const updateFilterField = (fieldName, fieldValue) => {
  emit('update-filters', { fieldName, fieldValue })
}

const acceptFilters = () => {
  emit('accept-filters')
}

const props = defineProps({
  filters: {
    type: Object,
    default: () => ({
      tagged: '',
      fromdate: '',
      todate: '',
      sortType: '',

    })
  }
});

</script>

<style lang="scss" scoped></style>
