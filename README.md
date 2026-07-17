<p align="center">
  <img src="./public/logo.svg" width="96" alt="IROLOGIC logo">
</p>

<h1 align="center">IROLOGIC.</h1>

<p align="center">An interactive colour practice for understanding light and pigment mixing through observation and answers.</p>

<p align="center">
  <a href="./README.zh.md">简体中文</a>
</p>

<p align="center">
  <a href="#features">Features</a> ·
  <a href="#colour-rules">Colour Rules</a> ·
  <a href="#contributing">Contributing</a>
</p>

---

IROLOGIC turns fundamental colour theory into a focused interactive exercise. Each visit produces a question about additive or subtractive mixing. Once an answer is selected, the six-colour wheel animates the recipe and its result, helping learners connect colour names with the relationships between them.

## Why IROLOGIC?

**IROLOGIC** combines **IRO** and **LOGIC**. `IRO` (いろ) is the Japanese word for “colour”, while `LOGIC` represents reasoning. The name reflects the project’s purpose: go beyond memorising colour-mixing results by understanding the rules through observation, choices, and feedback.

## Features

### Interactive practice

- Random questions drawn from light and pigment colour recipes.
- Two question directions: identify a mixing result or work backwards from a target colour.
- Immediate feedback, including correct and incorrect selections with a short explanation.
- Move directly to the next question after completing one.

### Visual learning

- A six-colour reference wheel with fixed positions for red, yellow, green, cyan, blue, and magenta.
- Animated links, glow effects, and labels reveal the correct recipe after answering.
- Covers the essential RGB additive and CMY subtractive mixing rules.
- Respects the system “reduce motion” preference to limit animation.

## Colour Rules

| System | Recipe | Result |
| --- | --- | --- |
| Light (additive) | Red + Green | Yellow |
| Light (additive) | Green + Blue | Cyan |
| Light (additive) | Red + Blue | Magenta |
| Pigment (subtractive) | Yellow + Cyan | Green |
| Pigment (subtractive) | Cyan + Magenta | Blue |
| Pigment (subtractive) | Magenta + Yellow | Red |

## Tech Stack

- [Nuxt 4](https://nuxt.com/) — application framework
- [Vue 3](https://vuejs.org/) + TypeScript — component model and type safety
- [Tailwind CSS 4](https://tailwindcss.com/) — utility-first styling
- [Motion for Vue](https://motion.dev/) — colour-wheel animations
- [Mori UI](https://moriui.antzy.me) — interaction components
- [Vitest](https://vitest.dev/) — unit and component testing

## Contributing

Suggestions and contributions are welcome.

1. Fork this repository.
2. Create a branch: `git checkout -b feature/your-feature`.
3. Make your changes, then run `pnpm test:run` and `pnpm typecheck`.
4. Commit your work and open a Pull Request.

## License

This project is released under the [MIT License](./LICENSE).

---

If this exercise is helpful, please consider giving the repository a Star.
