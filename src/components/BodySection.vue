<template>
    <div class="w-full flex">
        <SIdebar :history="history"/>
        <div class="min-h-screen flex flex-col w-full ml-[240px]">
            <h2 class="w-fit font-bold text-[24px] p-3">ArticleGPT</h2>
            
            <div v-if="generatedContent.length" class="w-full">
                <GeneratedContent :contents="generatedContent"></GeneratedContent>
                <div v-if="loading" class="w-full">
                    <Loader />
                </div>
            </div>
            <div v-else class="w-full h-[calc(100vh-148px)]">
                <Title />
            </div>

            <div class="fixed left-[240px] right-0 bottom-0 z-10 pt-2 pb-14 bg-[#FBFCFA]">
                <form @submit="handleSubmit" action="" class="max-w-[1024px] w-full mx-auto">
                    <div class="flex gap-x-7 w-full">
                        <div class="w-full">
                            <label class="inline-block mb-3" for="">Article Keyword</label>
                            <div class="w-full relative">
                                <input v-model="keyword" type="text" class="rounded-lg w-full bg-white border p-4" placeholder="Enter keyword that can be used to Generate your article">
                                <button :disabled="loading || keyword.length < 3" class="top-[calc((100%-42px)/2)] absolute right-2 w-[42px] h-[42px] bg-[#00b7eb] hover:bg-[#2d3a6b] rounded text-white"><font-awesome-icon v-if="!loading" icon="fa-solid fa-arrow-up"/><font-awesome-icon v-else icon="fa-solid fa-spinner" spin></font-awesome-icon></button>
                            </div>
                        </div>
                        <div class="w-[240px]">
                            <label class="inline-block mb-3" for="">Keyword Density</label>
                            <select v-model="density" class="rounded-lg bg-white border p-4 w-full">
                                <option value="5">2% - 5%</option>
                                <option value="10">5% - 10%</option>
                                <option value="20">10% - 20%</option>
                                <option value="50">20% - 50%</option>
                                <option value="100">50% - 100%</option>
                            </select>
                        </div>
                        <div class="w-[240px]">
                            <label class="inline-block mb-3" for="">Author's Tone</label>
                            <select v-model="tone" class="rounded-lg bg-white border p-4 w-full">
                                <option value="narrative">Narrative</option>
                                <option value="professional">Professional</option>
                                <option value="playful">Playful</option>
                                <option value="sad">Sad</option>
                                <option value="authoritative">Authoritative</option>
                                <option value="emotional">Emotional</option>
                                <option value="happy">Happy</option>
                                <option value="inspiring">Inspiring</option>
                            </select>
                        </div>
                    </div>
                </form>
                <div v-if="error" class="mx-auto mt-3 w-full rounded max-w-[500px] p-3 border border-red-700 bg-red-100 text-[13px]">An error occured: {{ error }}</div>
                <div v-if="loading" class="mx-auto w-fit text-[12px]">Generating Response...</div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import Title from './Title.vue';
    import SIdebar from './SIdebar.vue';
    import {ref} from "vue"
    import {generatePrompt, generateContent} from "../utils/helpers"
    import GeneratedContent from './GeneratedContent.vue';
    import Loader from './Loader.vue';

    const keyword = ref("")
    const density = ref("50")
    const tone = ref("narrative")

    const error = ref(null)
    const loading = ref(false)


    const generatedContent = ref([])
    const history = ref([])

    const handleSubmit = async (e) => {
        e.preventDefault()
        error.value = null
        loading.value = true
        const prompt = generatePrompt(keyword.value, parseInt(density.value), tone.value)
        // console.log(keyword.value, density.value, tone.value)
        // console.log(generatePrompt(keyword.value, parseInt(density.value), tone.value))
        console.log(prompt)
        const data = await generateContent(prompt)

        if(data.success) {
            console.log(data)
            if(data.output){
                generatedContent.value.push({
                    input: keyword.value,
                    output: data.output
                })
                history.value.push(keyword.value)
            }
            loading.value = false
        }

        if(data.error){
            console.log(data)
            error.value = data.error
            loading.value = false
        }

    }
</script>