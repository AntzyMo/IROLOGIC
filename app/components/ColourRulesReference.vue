<script setup lang="ts">
  import { computed, shallowRef } from 'vue'
  import { Card, CardContent, CardHeader, CardTitle } from 'moriui'
  import type { ColourId, System } from '~/types/practice'

  import { colourLabels, recipesFor } from '~/data/colourRules'

  const system = shallowRef<System>('light')
  const recipes = computed(() => recipesFor(system.value))
  const firstRecipe = computed(() => recipes.value[0]!)
  const swatches: Record<ColourId, string> = {
    red: '#ff5c49',
    green: '#b9dd32',
    blue: '#647eff',
    yellow: '#f5ca3e',
    cyan: '#57d4df',
    magenta: '#c36bd4'
  }
  const demoStyle = computed(() => ({
    '--input-one': swatches[firstRecipe.value.inputs[0]],
    '--input-two': swatches[firstRecipe.value.inputs[1]],
    '--result': swatches[firstRecipe.value.result]
  }))
  const materialClass = computed(() => system.value === 'light'
    ? 'rounded-full [mix-blend-mode:multiply] [filter:saturate(1.2)_brightness(1.08)] [box-shadow:0_0_1.5rem_color-mix(in_srgb,currentColor_40%,transparent)]'
    : 'rounded-[49%_51%_44%_56%_/_53%_40%_60%_47%] [filter:saturate(.88)_contrast(1.04)] [box-shadow:inset_.4rem_-.4rem_.8rem_rgb(0_0_0_/_8%)]')
</script>

<template>
  <section
    class="rules-reference w-[min(100%_-_40px,1180px)] mx-auto py-28 max-[720px]:w-[min(100%_-_28px,1180px)] max-[720px]:py-20"
    :data-system="system"
    aria-labelledby="rules-reference-title"
  >
    <p class="m-0 text-[.82rem] tracking-[.1em] text-[rgb(32_34_44_/_58%)]">
      02 / 规律与速查
    </p>
    <h2 id="rules-reference-title" class="my-4 text-[clamp(2.8rem,5vw,5rem)] tracking-[-.06em]">
      色彩规律速查
    </h2>
    <SystemSwitch v-model:system="system" />
    <div
      class="rule-demo relative my-8 min-h-48"
      :style="demoStyle"
      :aria-label="`${system === 'light' ? '光' : '颜料'}混色演示`"
    >
      <span class="absolute top-2 left-[calc(50%_-_7rem)] block w-28 aspect-square opacity-[.82] text-[var(--input-one)] bg-current" :class="materialClass" />
      <span class="absolute top-2 left-1/2 block w-28 aspect-square opacity-[.82] text-[var(--input-two)] bg-current" :class="materialClass" />
      <span class="absolute top-16 left-[calc(50%_-_3.5rem)] block w-28 aspect-square opacity-[.82] text-[var(--result)] bg-current" :class="materialClass" />
    </div>
    <div class="grid grid-cols-3 gap-4 max-[720px]:grid-cols-1">
      <Card
        v-for="recipe in recipes"
        :key="recipe.inputs.join('-')"
        data-recipe-card
        class="border-[rgb(32_34_44_/_12%)] bg-[rgb(255_255_255_/_45%)]"
      >
        <CardHeader>
          <CardTitle>{{ recipe.inputs.map(id => colourLabels[id]).join(' + ') }} → {{ colourLabels[recipe.result] }}</CardTitle>
        </CardHeader>
        <CardContent>
          <p class="m-0 leading-[1.65] text-[rgb(32_34_44_/_65%)]">
            {{ recipe.explanation }}
          </p>
        </CardContent>
      </Card>
    </div>
  </section>
</template>
