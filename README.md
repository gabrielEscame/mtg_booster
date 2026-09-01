# MTG 3D Booster Experience

A work-in-progress interactive web experience inspired by Magic: The Gathering.

As a TCG player, one of my favorite parts of opening a new set is the experience of opening a booster pack: revealing the cards one by one, discovering a new world, and hoping to find something special.

The idea behind this project is to bring that experience to the web — creating an interactive booster-opening experience where the interface, 3D elements, animations, lighting and visual effects all contribute to the feeling of opening a physical pack.

This is also a personal project created to bring together two things I enjoy: **3D/creative work and frontend development**. It is an opportunity to deepen my knowledge of **Three.js, React Three Fiber and GSAP**, while exploring how 3D, shaders, motion and interaction can be used to create more expressive web experiences.

## Current state

The project is still a work in progress and hasn't been deployed yet.

Here's a snapshot of the current experience:

https://github.com/user-attachments/assets/2b2ff6c0-c9ba-48be-b54e-396802b4e3ce

> The experience is actively being developed, so visuals and interactions are subject to change.

## Design & UI

The UX/UI was designed from scratch in **Figma**, with inspiration from the official Magic: The Gathering promotional website for *The Hobbit* set.

The project has its own interface and visual direction, while using some visual references from the original site, including elements such as imagery and typography.

Reference:

https://magic.wizards.com/en/products/the-hobbit

## Tech & tools

- **React + TypeScript** — application and component architecture
- **Three.js** — 3D rendering and WebGL
- **React Three Fiber** — integrating Three.js with React
- **Drei** — Three.js/R3F helpers and utilities
- **GSAP** — animations and scroll-driven transitions
- **Blender** — modeling and preparing the 3D assets
- **Photoshop** — textures, masks and material maps
- **GLSL** — custom shader logic and effects
- **Figma** — UX/UI design and prototyping

### Custom 3D & shader work

The 3D assets are modeled and prepared in Blender and then imported into the web experience through GLTF/GLB.

I'm also experimenting with custom shaders in Three.js. For example, the foil effect on the cards is implemented directly in code using a texture mask combined with view-angle calculations to create an animated holographic/rainbow effect.

## Goals

- Explore creative applications of Three.js on the web
- Improve my understanding of shaders and WebGL
- Experiment with 3D lighting and VFX
- Create more expressive and interactive frontend experiences
- Combine frontend development with 3D and motion design
- Recreate the feeling of opening a physical TCG booster pack in an interactive web experience

## Status

**Work in progress**
