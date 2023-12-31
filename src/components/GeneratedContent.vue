<template>
    <div class="w-full max-w-[900px] mx-auto space-y-28 my-32 mb-[180px]">
        <div v-for="content of props.contents" class="w-full space-y-10">
            <div class="w-full space-y-4">
                <div class="w-full flex gap-5">
                    <span>Input:</span>
                    <div class="w-full" v-html="content.input"></div>
                </div>
                <!-- <button><font-awesome-icon icon="fa-solid fa-pem"></font-awesome-icon></button> -->
            </div>
            <div class="w-full flex gap-5">
                <span>Output:</span>
                <p class="w-full whitespace-pre-line">{{ content.output }}</p>
            </div>
        </div>
    </div>
</template>

<script setup>
    const props = defineProps({
        contents: {
            type: Array,
            required: true
        }
    })
</script>