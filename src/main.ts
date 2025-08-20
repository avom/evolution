import './style.css'
import typescriptLogo from './typescript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.ts'
import { loadWorld } from './components/world/world.ts'
import { WorldRenderer } from './render/WorldRenderer.ts'
import { World } from './engine/World.ts'

// document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
//   <div>
//     <a href="https://vite.dev" target="_blank">
//       <img src="${viteLogo}" class="logo" alt="Vite logo" />
//     </a>
//     <a href="https://www.typescriptlang.org/" target="_blank">
//       <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
//     </a>
//     <h1>Vite + TypeScript</h1>
//     <div class="card">
//       <button id="counter" type="button"></button>
//     </div>
//     <p class="read-the-docs">
//       Click on the Vite and TypeScript logos to learn more
//     </p>
//   </div>
// `

// setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)

const app = document.querySelector<HTMLDivElement>('#app');
if (app) {
  loadWorld(app);
  const canvas = document.getElementById("world") as HTMLCanvasElement;
  const renderer = new WorldRenderer(canvas);
  const world = new World({ width: canvas.width, height: canvas.height });
  setInterval(() => {
    renderer.render(world);
  }, 1000 / 30);
}


