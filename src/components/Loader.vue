<template>
    <div class="w-full max-w-[900px] mx-auto animate-pulse">
        <div class="w-full space-y-10">
            <div class="w-full space-y-4">
                <div class="w-full flex gap-5">
                    <span class="inline-block rounded-2xl h-[20px] w-[100px] bg-slate-300"></span>
                    <div class="rounded-2xl h-[20px] w-[400px]  bg-slate-300"></div>
                </div>
            </div>
            <div class="w-full flex gap-5">
                <span class="inline-block rounded-2xl h-[20px] w-[100px]  bg-slate-300"></span>
                <div class="w-full space-y-3">
                    <p v-for="num in 8" :key="num" class="w-full bg-slate-300 rounded-2xl h-[20px]"></p>
                </div>
            </div>
        </div>
    </div>
</template>