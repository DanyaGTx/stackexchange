<template>
  <div class="max-w-[1200px] m-auto">
      <el-button @click="goBack" class="mb-[30px] bg-slate-50">Back</el-button>
      <div class="bg-white rounded-[6px] p-[12px] mb-[10px] shadow-box-shadow-element" v-for="issue in issueDetails" :key="issue.question_id">
          <h3>Issue # {{$route.params.id}}</h3>
          <h2 class="text-[20px] text-black pr-2 break-words inline-block">{{ issue.title }}</h2>
            <div class="flex gap-2 mt-[10px] flex-wrap">
              <p v-for="(tag, id) in issue.tags" :key="id" class="border-2 border-[#6D8E99] px-[10px] bg-[#F7FDFF] rounded-[16px]">{{ tag }}</p>
            </div>
          <div class="flex items-end justify-between">
            <div class="mt-[5px]"> 
              <p class="issue-information">{{ issue.answer_count }} answers</p>
              <p class="issue-information">{{ issue.view_count }} views</p>
              <p class="issue-information">{{ issue.score }} votes</p>
            </div>
            <div>
              <div class="flex items-end justify-end">
                <h1 class="mr-[5px]">{{ issue.owner.display_name }}</h1>
                <img
                  class="w-[30px]"
                  :src="issue.owner.profile_image"
                />
              </div>
              <p class="issue-information">{{ convertDate(issue.creation_date) }}</p>
            </div>
          </div>
      </div>
      <div v-if="answers.length">
          <h2 class="mb-[20px] text-[30px]">Answers:</h2>
          <div class="border-2 border-slate p-[20px] mb-[20px] bg-white rounded-[6px] shadow-box-shadow-element" v-for="answer in answers">
              <div>
                  <h1 class="text-[20px]">{{answer.owner.display_name}}</h1>
                  <img class="w-20" :src="answer.owner.profile_image">
                  <h3 class="font-bold mb-[20px]">Reputation: {{answer.owner.reputation}}</h3>
              </div>
              <div class="pr-[10px]">
                  <p>{{htmlToFormattedText(answer.body)}}</p>
                  <p v-html="answer.body"></p>
              </div>
          </div>
      </div>
      <div v-else class="text-center text-[20px] mt-[30px]" v-if="issueDetails.length">ooops. No answers yet :(</div>
      <div class="text-center text-[20px]" v-show="!issueDetails.length">Nothing to found</div>
      <div class="text-center" v-if="isLoading">
          <h3>LOADING...</h3>
          <img class="m-auto w-20" src="../assets/loader.gif" alt="">
      </div>
  </div>
</template>

<script setup>
import { onMounted,ref } from 'vue';

import { useRouter,useRoute } from 'vue-router'

import { useToast } from "vue-toastification";

import { ElButton } from 'element-plus';

import htmlToFormattedText from "html-to-formatted-text";

import { api } from '../api/api';

import { convertDate } from '../utils/index.js'

const toast = useToast();
const route = useRoute()

const router = useRouter()
const isLoading = ref(false);

const answers = ref([])
const issueDetails = ref([])
const toastOptions = {
    position: 'top-center',
    timeout: 3000,
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

const getIssueAnswer = async (id) => {
  isLoading.value = true;
  try {
      const { data } = await api.answers.getIssueAnswer(id)
      answers.value = data.items;
    } catch(error) {
      isLoading.value = false;
      toast.error("Error: " + error, toastOptions);
    }
  isLoading.value = false;
}


const goBack = () => {
if(history.state.back){ 
  router.go(-1) 
} else {
  router.push( {
      name: 'questions',
  })
}
}

const getIssueInfo = async (id) => {
  isLoading.value = true;
  try {
      const { data } = await api.questions.getIssuesById(id)
      issueDetails.value = data.items;
    } catch(error) {
      isLoading.value = false;
      toast.error("Error: " + error, toastOptions);
    }
  isLoading.value = false;
}

onMounted(() => {
  getIssueAnswer(route.params.id)
  getIssueInfo(route.params.id)
})
</script>
