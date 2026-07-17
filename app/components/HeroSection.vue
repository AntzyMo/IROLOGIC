<template>
  <section class="hero-section relative min-h-svh w-[min(100%_-_40px,1180px)] mx-auto max-[720px]:w-[min(100%_-_28px,1180px)]">
    <nav class="hero-nav flex items-center justify-between py-7 tracking-[.08em]" aria-label="主导航">
      <strong class="text-[1.05rem]">IROLOGIC.</strong>
      <span class="text-[.9rem] text-[rgb(32_34_44_/_65%)]">色彩练习</span>
    </nav>
    <div class="hero-copy relative z-1 max-w-152 pt-[clamp(4rem,12vh,8rem)] max-[720px]:pt-14">
      <p class="eyebrow m-0 mb-4 text-[.9rem] tracking-[.12em] text-[rgb(32_34_44_/_65%)]">
        互动色彩笔记
      </p>
      <h1 class="m-0 text-[clamp(3.4rem,8vw,7.25rem)] leading-[.94] tracking-[-.075em]">
        通过观察，<br>理解色彩。
      </h1>
      <p class="hero-description my-8 max-w-108 text-[1.05rem] leading-[1.75] text-[rgb(32_34_44_/_72%)]">
        让红、绿、蓝相遇，也看看颜料会带来怎样的变化。
      </p>
      <a class="inline-flex rounded-full bg-[var(--ink)] px-[1.15rem] py-[.8rem] text-[var(--paper)] no-underline" href="#practice">开始练习 ↓</a>
    </div>
    <div class="hero-orbs absolute right-[clamp(-8rem,-3vw,-2rem)] bottom-[clamp(3rem,5vw,6rem)] w-[min(58vw,620px)] aspect-square max-[720px]:right-0 max-[720px]:bottom-6 max-[720px]:w-[90vw] max-[720px]:opacity-[.78]" aria-hidden="true">
      <span class="absolute top-[4%] left-[18%] z-0 w-[56%] aspect-square rounded-full bg-[var(--red)] [mix-blend-mode:multiply] [filter:saturate(1.2)_brightness(1.08)] [box-shadow:0_0_0_0_rgb(255_92_73_/_52%)] transition-[scale,filter,box-shadow] duration-[260ms] ease-out [will-change:translate,scale,filter,box-shadow] animate-hero-orb-red hover:z-2 hover:scale-[1.06] hover:[filter:saturate(1.35)_brightness(1.14)] hover:[box-shadow:0_0_2rem_.6rem_rgb(255_92_73_/_52%)] hover:[animation-play-state:paused] motion-reduce:animate-none motion-reduce:transition-none motion-reduce:[will-change:auto]" />
      <span class="absolute right-[3%] bottom-[13%] z-0 w-[56%] aspect-square rounded-full bg-[var(--green)] [mix-blend-mode:multiply] [filter:saturate(1.2)_brightness(1.08)] [box-shadow:0_0_0_0_rgb(185_221_50_/_48%)] transition-[scale,filter,box-shadow] duration-[260ms] ease-out [will-change:translate,scale,filter,box-shadow] animate-hero-orb-green hover:z-2 hover:scale-[1.06] hover:[filter:saturate(1.35)_brightness(1.14)] hover:[box-shadow:0_0_2rem_.6rem_rgb(185_221_50_/_48%)] hover:[animation-play-state:paused] motion-reduce:animate-none motion-reduce:transition-none motion-reduce:[will-change:auto]" />
      <span class="absolute bottom-[2%] left-[2%] z-0 w-[56%] aspect-square rounded-full bg-[var(--blue)] [mix-blend-mode:multiply] [filter:saturate(1.2)_brightness(1.08)] [box-shadow:0_0_0_0_rgb(100_126_255_/_48%)] transition-[scale,filter,box-shadow] duration-[260ms] ease-out [will-change:translate,scale,filter,box-shadow] animate-hero-orb-blue hover:z-2 hover:scale-[1.06] hover:[filter:saturate(1.35)_brightness(1.14)] hover:[box-shadow:0_0_2rem_.6rem_rgb(100_126_255_/_48%)] hover:[animation-play-state:paused] motion-reduce:animate-none motion-reduce:transition-none motion-reduce:[will-change:auto]" />
    </div>
  </section>
</template>
