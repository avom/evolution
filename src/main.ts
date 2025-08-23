import './style.css'
import typescriptLogo from './typescript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.ts'
import { loadWorld } from './components/world/world.ts'
import { WorldRenderer } from './render/WorldRenderer.ts'
import { World } from './engine/World.ts'
import { buildWorld } from './engine/WorldBuilder.ts'


const app = document.querySelector<HTMLDivElement>('#app');
if (app) {
  loadWorld(app);
  const canvas = document.getElementById("world") as HTMLCanvasElement;
  const renderer = new WorldRenderer(canvas); 
  const world = buildWorld(canvas.width, canvas.height);
  const startTime = performance.now();

  let frame = 0;
  setInterval(() => {
    const t0 = performance.now();
    world.update((t0 - startTime) / 1000);

    const t = performance.now();
    renderer.render(world);

    if (frame++ % 30 === 0) {
      console.log("Updating world with", world.plants.length, "plants in ", performance.now() - t0, "ms");
      console.log("Rendering world with", world.plants.length, "plants in ", performance.now() - t, "ms");
    }
  }, 1000 / 30);
}


