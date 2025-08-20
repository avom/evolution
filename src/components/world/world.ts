export function loadWorld(container: HTMLDivElement) {
    const canvas = document.createElement("canvas");
    canvas.id = "world";
    canvas.width = 1000;
    canvas.height = 1000;
    container.appendChild(canvas);
}