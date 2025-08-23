export function loadWorld(container: HTMLDivElement) {
    const canvas = document.createElement("canvas");
    canvas.id = "world";
    canvas.width = 1500;
    canvas.height = 1500;
    container.appendChild(canvas);
}