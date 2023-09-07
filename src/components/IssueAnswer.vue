<template>
  <div class="border-b border-slate mb-[20px] bg-white rounded-[6px]">
    <div class="flex items-center gap-3 mb-6">
      <img class="w-20 rounded-full" :src="answer.owner.profile_image" />
      <div>
        <h1 class="text-base font-medium">
          {{ answer.owner.display_name }}
        </h1>
        <h3 class="text-base text-mainGray">
          Reputation {{ answer.owner.reputation }}
        </h3>
      </div>
    </div>
    <div class="pr-[10px]">
      <p id="break-answer" v-html="answer.body"></p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  answer: {
    type: Object,
    required: true,
  },
})
</script>
<style scoped>
#break-answer :deep(*) {
  word-break: break-all;
  white-space: normal;
}
</style>
