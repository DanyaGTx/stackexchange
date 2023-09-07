<template>
  <div class="max-w-[1280px] m-auto">
    <div class="ml-[165px] max-[620px]:ml-[120px] max-[420px]:mt-3">
      <div
        class="px-8 pt-10 pb-9 border-b border-mainLightGray max-[620px]:px-4 max-[620px]:pt-2 max-[420px]:pb-2"
      >
        <button
          class="flex justify-center items-center py-3 px-4 rounded-[14px] text-center font-bold bg-transparent w-[125px] border border-mainGray text-mainDarkest hover:bg-mainLightGray transition ease-in"
          @click="goBack"
        >
          <img
            class="translate-y-[1px] translate-x-[-10px]"
            src="../assets/arrow-back.svg"
            alt="back-icon"
          />
          <span class="translate-x-[-5px]">Back</span>
        </button>
        <h1
          class="font-bold text-mainDarkest text-[46px] mt-10 max-[620px]:text-3xl max-[420px]:text-2xl max-[420px]:mt-5"
        >
          Issue #{{ $route.params.id }}
        </h1>
      </div>

      <IssueItem
        v-for="issue in issueDetails"
        :key="issue.question_id"
        :issue="issue"
        @selected-tag="selectTag"
      />
      <div
        v-if="answers.length"
        v-infinite-scroll="handleScroll"
        class="px-8 mt-10 max-[620px]:px-4 max-[420px]:px-2"
        :infinite-scroll-disabled="isLoading"
      >
        <h2 class="mb-[20px] text-2xl font-bold text-mainDarkest">Answers</h2>
        <IssueAnswer
          v-for="answer in answers"
          :key="answer.owner.account_id"
          :answer="answer"
        />
      </div>
      <div v-else-if="!answers.length && !isLoading">
        <div class="text-center text-[20px]">
          <img
            class="m-auto"
            src="../assets/no-data-found.png"
            alt="Nothing found"
          />
          <span> Ooops! No answers yet </span>
        </div>
      </div>
      <div v-if="isLoading" class="text-center">
        <img class="m-auto w-16" src="../assets/loader.gif" alt="" />
      </div>
      <div v-if="errorMessage" class="text-red-500 text-sm text-center">
        {{ errorMessage }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { api } from '../api/api'
import { onMounted, ref } from 'vue'
import { toastOptions } from '../constants'
import { useRoute, useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import IssueAnswer from '../components/IssueAnswer.vue'
import IssueItem from '../components/IssueItem.vue'
const toast = useToast()
const route = useRoute()

const router = useRouter()
const isLoading = ref(false)

const answers = ref([])
const issueDetails = ref([])
const pageSize = ref(3)

const errorMessage = ref('')

const getIssueAnswer = async (id, size) => {
  console.log(size)
  try {
    isLoading.value = true
    const { data } = await api.answers.getIssueAnswer(id, String(size))
    answers.value = data.items
  } catch (error) {
    toast.error('Error: ' + error, toastOptions)
  } finally {
    isLoading.value = false
    pageSize.value += 3
  }
}

const handleScroll = async () => {
  if (!isLoading.value) {
    await getIssueAnswer(route.params.id, pageSize.value)
  }
}

const goBack = () => {
  if (history.state.back) {
    router.go(-1)
  } else {
    router.push({
      name: 'questions',
    })
  }
}

const getIssueInfo = async (id) => {
  try {
    isLoading.value = true
    const { data } = await api.questions.getIssuesById(id)
    issueDetails.value = data.items
  } catch (error) {
    toast.error('Error: ' + error, toastOptions)
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  getIssueAnswer(route.params.id, pageSize.value)
  getIssueInfo(route.params.id)
})
</script>
