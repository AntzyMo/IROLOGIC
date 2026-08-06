<script setup lang="ts">
  const ogImage = 'https://irologic.antzy.me/og.png'

  useSeoMeta({
    title: 'IROLOGIC.｜色彩练习',
    description: '通过观察与作答，理解光色与颜料混色关系的互动色彩练习。',
    ogTitle: 'IROLOGIC.｜色彩练习',
    ogDescription: '通过观察与作答，理解光色与颜料混色关系的互动色彩练习。',
    ogType: 'website',
    ogImage,
    ogImageWidth: 1200,
    ogImageHeight: 630,
    ogImageAlt: 'IROLOGIC 色彩练习 —— 通过观察，理解色彩。',
    twitterCard: 'summary_large_image',
    twitterTitle: 'IROLOGIC.｜色彩练习',
    twitterDescription: '通过观察与作答，理解光色与颜料混色关系的互动色彩练习。',
    twitterImage: ogImage
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
    <SiteFooter />
  </main>
</template>
