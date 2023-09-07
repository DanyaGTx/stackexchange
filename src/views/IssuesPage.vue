<template>
  <div class="w-full max-w-[1280px] m-auto pb-[100px]">
    <div class="ml-[165px] max-[620px]:ml-[120px]">
      <div
        class="flex justify-between items-center relative border border-b-mainLightGray border-t-0 border-r-0 border-l-0 py-10 pb-8 pl-8 max-[900px]:block max-[620px]:pl-4 max-[420px]:py-3"
      >
        <h1
          class="text-4xl font-bold max-[620px]:text-4xl max-[420px]:text-3xl"
        >
          All Questions
        </h1>
        <div
          class="flex w-full max-w-[400px] items-center max-[1300px]:mr-[10px] max-[900px]:mt-4 max-[620px]:flex-col-reverse max-[620px]:items-start"
        >
          <div ref="filtersRef" class="relative min-[900px]:ml-auto">
            <div
              class="ml-auto mr-[15px] cursor-pointer select-none flex items-center text-xl font-bold"
              @click="showMoreFilters = !showMoreFilters"
            >
              <img
                class="min-w-[30px]"
                width="30"
                height="30"
                src="../assets/filters-icon.svg"
                alt="filters"
              />
              <span>Filters</span>
            </div>
            <div>
              <Transition>
                <div v-show="showMoreFilters" class="filters__popup">
                  <FiltersComponent
                    :filters="filters"
                    @update-filters="updateFilterField"
                    @accept-filters="acceptFilters"
                    @clear-filters="clearFilters"
                  />
                </div>
              </Transition>
            </div>
          </div>
          <div class="w-full max-w-[270px] ml-5 max-[620px]:ml-0">
            <SortTypeComponent
              :sort-type="filters.sortType"
              @update-sort-type="updateSortType"
            />
          </div>
        </div>
      </div>
      <div
        v-infinite-scroll="handleScroll"
        :infinite-scroll-disabled="isLoading || errorMessage"
      >
        <IssueItem
          v-for="issue in issues"
          :key="issue.question_id"
          :open-issue="openIssue"
          :issue="issue"
          @selected-tag="selectTag"
        />
        <div v-show="hasIssues" class="text-center">
          <img
            class="m-auto"
            src="../assets/no-data-found.png"
            alt="Nothing found"
          />
          <span>Nothing to found!</span>
        </div>
        <div v-if="isLoading" class="absolute left-[50%] mt-4">
          <img class="m-auto w-16" src="../assets/loader.gif" alt="" />
        </div>
        <div v-if="errorMessage" class="text-red-500 text-sm text-center">
          {{ errorMessage }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { api } from '../api/api'
import { computed, onMounted, ref, watch } from 'vue'
import { onClickOutside } from '@vueuse/core'
import { toastOptions } from '../constants'
import { useRoute, useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'

import FiltersComponent from '../components/FiltersComponent.vue'
import IssueItem from '../components/IssueItem.vue'
import SortTypeComponent from '../components/SortTypeComponent.vue'
import convertDateToUnix from '../utils/convertDateToUnix'
import debounce from 'lodash.debounce'

const router = useRouter()
const route = useRoute()

const issues = ref([])
const isLoading = ref(false)
const errorMessage = ref('')
const showMoreFilters = ref(false)
const filtersRef = ref(null)

const toast = useToast()

const filters = ref({
  tagged: route.query.tagged,
  fromdate: route.query.fromdate,
  todate: route.query.todate,
  sortType: route.query.sortType,
})

const updateSortType = (sort) => {
  filters.value.sortType = sort
}

const selectTag = (tag) => {
  filters.value.tagged = tag
  acceptFilters()
}

const updateFilterField = ({ fieldName, fieldValue }) => {
  filters.value[fieldName] = fieldValue
}

const clearFilters = () => {
  filters.value.tagged = ''
  filters.value.fromdate = ''
  filters.value.todate = ''
}

const props = defineProps({
  searchValue: {
    type: String,
    default: '',
  },
})

onClickOutside(filtersRef, (event) => {
  console.log(event.target)
  showMoreFilters.value = false
})

const fetchIssuesWithScrolling = async () => {
  try {
    isLoading.value = true
    const { data } = await api.questions.getIssues()
    console.log(data.items)
    issues.value.push(...data.items)
  } catch (error) {
    errorMessage.value = error
  } finally {
    isLoading.value = false
  }
}

const getIssuesWithFilters = async () => {
  try {
    isLoading.value = true
    const { data } = await api.questions.getIssuesWithSort({
      tagged: filters.value.tagged,
      sort: filters.value.sortType,
      fromdate:
        filters.value.fromdate && convertDateToUnix(filters.value.fromdate),
      todate: filters.value.todate && convertDateToUnix(filters.value.todate),
      intitle: props.searchValue,
    })
    issues.value = data.items
  } catch (error) {
    toast.error('Error: ' + error, toastOptions)
  } finally {
    isLoading.value = false
  }
}

const getIssuesWithSearch = async (search) => {
  try {
    isLoading.value = true
    const { data } = await api.questions.getIssuesWithSearch(search)
    issues.value = data.items
  } catch (error) {
    toast.error('Error: ' + error, toastOptions)
  } finally {
    isLoading.value = false
  }
}

const getIssues = async () => {
  try {
    isLoading.value = true
    const { data } = await api.questions.getIssues()
    issues.value = data.items
  } catch (error) {
    toast.error('Error: ' + error, toastOptions)
  } finally {
    isLoading.value = false
  }
}

const openIssue = (id) => {
  router.push({
    name: 'question-details',
    params: { id },
  })
}

const handleScroll = async () => {
  if (!props.searchValue && !isLoading.value) {
    await fetchIssuesWithScrolling()
  }
}

const acceptFilters = async () => {
  try {
    const queryParams = {
      path: '/',
      query: {},
    }
    queryParams.query.tagged = filters.value.tagged || queryParams.query.tagged
    queryParams.query.sort = filters.value.sortType || queryParams.query.sort
    queryParams.query.fromdate =
      filters.value.fromdate || queryParams.query.fromdate
    queryParams.query.todate = filters.value.todate || queryParams.query.todate

    await getIssuesWithFilters()
    router.push(queryParams)
    showMoreFilters.value = false
    window.scrollTo(0, 0)
  } catch (error) {
    toast.error('Error: ' + error, toastOptions)
  }
}

const hasIssues = computed(() => {
  return !isLoading.value && !issues.value.length && !errorMessage.value
})

watch(
  () => props.searchValue,
  debounce(async (searchQuery) => {
    if (props.searchValue) {
      await getIssuesWithSearch(searchQuery)
    } else {
      await getIssues()
    }
  }, 1000)
)

watch(
  () => filters.value.sortType,
  async (filters) => {
    await acceptFilters()
  }
)

onMounted(async () => {
  const { query } = router.currentRoute.value
  filters.value.tagged = query.tagged || filters.value.tagged
  filters.value.sortType = query.sort || filters.value.sortType
  filters.value.fromdate = query.fromdate || filters.value.fromdate
  filters.value.todate = query.todate || filters.value.todate

  await acceptFilters()
  if (props.searchValue) {
    await getIssuesWithSearch(props.searchValue)
  }
})
</script>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.2s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.filters__popup {
  position: absolute;
  right: 0;
  margin-top: 10px;
  background: #fff;
  border-radius: 14px;
  overflow: hidden;
  min-width: 300px;
  filter: drop-shadow(2px 14px 34px rgba(41, 63, 141, 0.08));
}

@media (max-width: 620px) {
  .filters__popup {
    left: 0px;
  }
}
</style>
