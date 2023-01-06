<template>
  <div
    class="bg-white rounded-[6px] p-[12px] mb-[10px] shadow-box-shadow-element"
  >
    <h2
      class="text-[20px] text-link cursor-pointer pr-2 break-all inline-block"
      @click="props.openIssue(props.issue.question_id)"
    >
      {{ props.issue.title }}
    </h2>
    <div class="flex gap-2 mt-[10px] flex-wrap">
      <p
        v-for="(tag, id) in props.issue.tags"
        :key="id"
        class="border-2 border-[#6D8E99] px-[10px] bg-[#F7FDFF] rounded-[16px]"
      >
        {{ tag }}
      </p>
    </div>
    <div class="flex items-end justify-between">
      <div class="mt-[5px]">
        <p>{{ props.issue.answer_count }} answers</p>
        <p>{{ props.issue.view_count }} views</p>
        <p>{{ props.issue.score }} votes</p>
      </div>
      <div>
        <div class="flex items-end justify-end">
          <h1 class="mr-[5px]">{{ props.issue.owner.display_name }}</h1>
          <img class="w-[30px]" :src="props.issue.owner.profile_image" />
        </div>
        <p>{{ convertDate(props.issue.creation_date) }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { convertDate } from "../utils";

const props = defineProps({
  issue: {
    type: Object,
    required: true,
  },
  openIssue: {
    type: Function,
    required: true,
  },

});

</script>
