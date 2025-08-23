interface Plant {
    id: number;
    name: string;
    // Add other properties as needed
}

// This function will be stringified and run in the worker context
const workerCode = () => {
    self.onmessage = (event: MessageEvent) => {
        const plants: Plant[] = event.data;
        for (const plant of plants) {
            // Do something with each plant, e.g., log or process
            // postMessage({ id: plant.id, name: plant.name });
        }
        // Optionally, notify completion
        self.postMessage({ status: 'done' });
    };
};

// Helper to create the worker
export function createPlantWorker(): Worker {
    const code = workerCode.toString();
    const blob = new Blob([`(${code})()`], { type: 'application/javascript' });
    return new Worker(URL.createObjectURL(blob));
}