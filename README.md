# MTG 3D Booster Experience

A work-in-progress interactive web experience inspired by Magic: The Gathering.

This is a personal project created to bring together two things I enjoy: **3D/creative work and frontend development**. The goal is to explore how movement, 3D elements, shaders, lighting and interaction can be used to create a more expressive web experience.

The project is also a way for me to deepen my knowledge of **Three.js, React Three Fiber and GSAP**, while experimenting with creative frontend techniques.

## Current state

The project is still a work in progress and hasn't been deployed yet.

Here's a snapshot of the current experience:

![Current state](./docs/wip.gif)

> The experience is actively being developed, so visuals and interactions are subject to change.

## Tech & tools

- **React + TypeScript** — application and component architecture
- **Three.js** — 3D rendering and WebGL
- **React Three Fiber** — integrating Three.js with React
- **Drei** — Three.js/R3F helpers and utilities
- **GSAP** — animations and scroll-driven transitions
- **Blender** — modeling and preparing the 3D assets
- **Photoshop** — textures, masks and material maps
- **GLSL** — custom shader logic and effects

### Custom 3D & shader work

The 3D assets are modeled and prepared in Blender and then imported into the web experience through GLTF/GLB.

I'm also experimenting with custom shaders in Three.js. For example, the foil effect on the cards is implemented directly in code using a texture mask combined with view-angle calculations to create an animated holographic/rainbow effect.

## Goals

- Explore creative applications of Three.js on the web
- Improve my understanding of shaders and WebGL
- Experiment with 3D lighting and VFX
- Create more expressive and interactive frontend experiences
- Combine traditional frontend development with 3D and motion design

## Status

**Work in progress**