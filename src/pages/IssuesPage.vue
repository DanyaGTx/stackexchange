<template>
  <div ref="filterRef" :class="{'border-x-indigo-500 border-2': isFilterTransparent}" class="max-w-[1200px] w-full m-auto rounded-[6px] mb-[100px] p-[10px] sticky top-0 flex items-center bg-white shadow-box-shadow-element">
    <el-input
      class="max-w-[200px] h-[60px] p-[10px] w-full text-[16px]"
      v-model="searchString"
      placeholder="Search..."
      :suffix-icon="Search"
    />
    <FiltersComponent :filters="filters" @update-filters="updateFilterField" @accept-filters="acceptFilters" />
  </div>
  <div class="max-w-[1200px] m-auto pb-[50px]" v-infinite-scroll="handleScroll" :infinite-scroll-disabled="isLoading || errorMessage">
    <IssueItem v-for="issue in filteredIssues" :key="issue.question_id" :openIssue="openIssue" :issue="issue" />
    <div class="text-center" v-show="hasIssues">Nothing to found!</div>
    <div class="text-center" v-if="isLoading">
      <h3>LOADING...</h3>
      <img class="m-auto w-20" src="../assets/loader.gif" alt="">
    </div>
    <div v-if="errorMessage" class="text-red-500 text-sm text-center">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script setup>
import { ElInput } from 'element-plus'

import { onMounted, onUnmounted, ref, computed, watch } from "vue";

import { Search } from '@element-plus/icons-vue'

import { useToast } from "vue-toastification";

import { useRouter,useRoute } from 'vue-router'

import { api } from '../api/api.js'

import IssueItem from "../components/IssueItem.vue";

import FiltersComponent from "../components/FiltersComponent.vue";

const router = useRouter()
const route = useRoute()

const toast = useToast();
const issues = ref([]);
const filterRef = ref(null);
const page = ref(1);
const perPage = ref(10)

const isLoading = ref(false);

const searchString = ref("");
const errorMessage = ref("");

const filters = ref({
tagged: route.query.tagged,
fromdate: route.query.fromdate,
todate: route.query.todate,
sortType: route.query.sortType,
})

const isFilterTransparent = ref(false)

const updateFilterField = ({ fieldName, fieldValue }) => {
filters.value[fieldName] = fieldValue
}

const fetchIssues = async () => {
isLoading.value = true;
try {
  const { data } = await api.questions.getIssuesWithSort( { 'fromdate': filters.value.fromdate, 'todate' : filters.value.todate ,'page' : page.value, 'pagesize' : perPage.value, 'sort' : filters.value.sortType , 'tagged': filters.value.tagged, 'site' : 'stackoverflow' } )
  issues.value.push(...data.items);
} catch(error) {
  errorMessage.value = error
} finally {
  isLoading.value = false;
}
};


const getIssuesWithSort = async () => {
isLoading.value = true
try {
const { data } = await api.questions.getIssuesWithSort({
  fromdate: filters.value.fromdate,
  todate: filters.value.todate,
  page: filters.value.page,
  pagesize: filters.value.perPage,
  sort: filters.value.sortType,
  tagged: filters.value.tagged,
  site: 'stackoverflow',
})
issues.value = data.items
} catch (error) {
  toast.error('Error: ' + error, toastOptions)
}
isLoading.value = false
}

const toastOptions = {
  position: 'top-center',
  timeout: 2000,
  pauseOnHover: false,
  closeOnClick: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  hideProgressBar: false,
  closeButton: 'button',
  icon: true,
  rtl: false
}

const openIssue = ( id ) => {
  router.push( {
    name: 'question-details',
    params: { id }
  } )
}

const handleScroll = () => {
if (!searchString.value && !isLoading.value) {
  page.value += 1;
  fetchIssues();
}
};

const acceptFilters = () => {
try {
    getIssuesWithSort();
    router.push( {
      path: `/questions`,
      query: {
        tagged: filters.value.tagged,
        sort: filters.value.sortType,
        fromdate: filters.value.fromdate,
        todate: filters.value.todate,
      }
  } )
  window.scrollTo(0,0);
} catch(error) {
  toast.error("Error: " + error, toastOptions);
}
}

const filterScroll = () => {
if (filterRef.value.getBoundingClientRect().top === 0) {
  isFilterTransparent.value = true;
} else {
  isFilterTransparent.value = false;
}
};

const hasIssues = computed(() => {
return !isLoading.value && !filteredIssues.value.length && !errorMessage.value
})

watch(() => searchString.value, () => {
isFilterTransparent.value = false;
});

watch(() => filters.value.sortType, async () => {
await getIssuesWithSort()
acceptFilters()
});

const filteredIssues = computed(() => {
return searchString.value ? issues.value.filter((issue) => issue.title.toLowerCase().includes(searchString.value.toLowerCase())) : issues.value;
});

onMounted(() => {
document.addEventListener("scroll", filterScroll);
});
onUnmounted(() => {
document.removeEventListener("scroll", filterScroll);
});
</script>
>
