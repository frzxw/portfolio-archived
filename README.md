# Portfolio (2025, archived)

The first version of my portfolio site, kept for reference. The current site is [frzxw.me](https://frzxw.me)
([source](https://github.com/frzxw/portfolio)).

## What it was

A single-page portfolio with sections for experience, research, projects, apps, open source and personal projects,
driven by a typed content file (`content/portfolio.ts`, validated by `content/schema.ts`). The hero had a physics-driven
3D lanyard badge built with React Three Fiber and Rapier, and the site had a light and dark theme without a flash on
load.

## Stack

Next.js (App Router), React, TypeScript, Tailwind CSS, Framer Motion, React Three Fiber, Drei, Rapier and next-themes.

## Run it locally

```sh
npm ci
npm run dev      # http://localhost:3000
npm run build && npm start
```
