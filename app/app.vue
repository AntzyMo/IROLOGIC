<script setup lang="ts">
  useSeoMeta({
    title: 'IROLOGIC.｜色彩练习'
  })

  useHead({
    link: [
      { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' }
    ]
  })
</script>

<template>
  <main>
    <HeroSection />
    <section id="practice" aria-label="色彩练习">
      <PracticeSection />
    </section>
    <ColourRulesReference />
    <SiteFooter />
  </main>
</template>
