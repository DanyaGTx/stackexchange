<template>
  <div class="p-8 border-b border-mainLightGray max-[620px]:pl-4">
    <div class="flex items-center justify-between max-[720px]:block">
      <div class="flex items-center justify-start gap-4">
        <img
          class="rounded-full"
          width="25"
          height="25"
          :src="props.issue.owner?.profile_image"
        />
        <h3 class="mr-[5px] leading-8 text-[16px] text-mainDarkest font-medium">
          {{ props.issue.owner.display_name }}
        </h3>
      </div>
      <div class="flex gap-3 max-[620px]:flex-col">
        <p class="text-mainGray">
          Answers:
          <span class="font-bold text-mainDarkest">
            {{ props.issue.answer_count }}
          </span>
        </p>
        <p class="text-mainGray">
          Votes:
          <span class="font-bold text-mainDarkest">
            {{ props.issue.score }}
          </span>
        </p>
        <div class="flex items-center text-mainGray gap-1">
          Views:
          <p class="font-bold text-mainDarkest flex">
            <span v-if="props.issue.view_count > 1000">🔥</span>
            {{ props.issue.view_count }}
          </p>
        </div>
      </div>
    </div>

    <h2
      class="text-[20px] my-6 text-mainDarkest font-bold cursor-pointer pr-2 break-all inline-block"
      @click="props.openIssue(props.issue.question_id)"
    >
      {{ props.issue.title }}
    </h2>

    <div class="flex items-end justify-between">
      <div
        class="flex items-center justify-between w-full mt-[10px] max-[720px]:block"
      >
        <div class="flex items-center gap-2 flex-wrap">
          <p
            v-for="(tag, id) in props.issue.tags"
            :key="id"
            class="p-[5px] text-xs py-2.5 px-3.5 rounded-[14px] font-bold text-mainDarkest bg-mainLightGray hover:bg-gray-300 cursor-pointer"
            @click="selectTag(tag)"
          >
            {{ tag.toUpperCase() }}
          </p>
        </div>
        <div class="flex items-center min-w-max max-[720px]:mt-2">
          <p class="text-[#93999F]">
            {{ convertDate(props.issue.creation_date) }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { convertDate } from '../utils/convertDate.js'

const props = defineProps({
  issue: {
    type: Object,
    required: true,
  },
  openIssue: {
    type: Function,
    required: true,
  },
})

const emit = defineEmits({
  'selected-tag': String,
})

const selectTag = (tag) => {
  emit('selected-tag', tag)
}
</script>
