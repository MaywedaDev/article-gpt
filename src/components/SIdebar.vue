<template>
    <div class="fixed top-0 left-0 w-[240px] h-screen p-4 bg-[#301934] flex flex-col p-3">
        <div class="mt-5">
            <button class="p-3 rounded w-full flex justify-center items-center gap-3 bg-[#00b7eb] text-white"><span>New Content</span><font-awesome-icon icon="fa-solid fa-pen-to-square" /></button>
        </div>

        <div class="w-full bg-[#ffffff67] h-px my-6"></div>
        <div v-if="props.history.length" class="w-full">
            <span class="text-[13px] text-white">History :</span>
            <ul class="my-6 space-y-4 text-white text-[14px]">
                <li v-for="item of props.history" class="p-3 border-b border-[#ffffff67] whitespace-nowrap overflow-hidden text-ellipsis">{{ item }}</li>
            </ul>
        </div>
        <h2 class="text-right text-white font-bold text-[20px] mt-auto">ArticleGPT</h2>
    </div>
</template>

<script setup>
    const props = defineProps({
        history: Array
    })
</script>