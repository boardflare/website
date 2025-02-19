import { useState, useEffect, useRef, useCallback } from 'react'

export function Sentiworker() {

    // Keep track of the classification result and the model loading status.
    const [result, setResult] = useState(null);
    const [ready, setReady] = useState(null);

    // Create a reference to the worker object.
    const worker = useRef(null);

    // We use the `useEffect` hook to set up the worker as soon as the `App` component is mounted.
    useEffect(() => {
        if (!worker.current) {
            // Create the worker if it does not yet exist.
            worker.current = new Worker(new URL('@/components/worker.js', import.meta.url), {
                type: 'module'
            });
        }

        // Create a callback function for messages from the worker thread.
        const onMessageReceived = (e) => {
            switch (e.data.status) {
                case 'initiate':
                    setReady(false);
                    break;
                case 'ready':
                    setReady(true);
                    break;
                case 'complete':
                    setResult(e.data.output[0])
                    break;
            }
        };

        // Attach the callback function as an event listener.
        worker.current.addEventListener('message', onMessageReceived);

        // Define a cleanup function for when the component is unmounted.
        return () => worker.current.removeEventListener('message', onMessageReceived);
    });

    const classify = useCallback((text) => {
        if (worker.current) {
            worker.current.postMessage({ text });
        }
    }, []);
    return (
        <main className="flex flex-col items-center justify-center p-10">
            <input
                type="text"
                className="w-full max-w-lg p-2 border border-gray-300 rounded mb-4"
                placeholder="Enter text here"
                onInput={e => {
                    classify(e.target.value);
                }}
            />

            {ready !== null && (
                <pre className="bg-gray-100 p-2 rounded">
                    {
                        (!ready || !result) ? 'Loading...' : JSON.stringify(result, null, 2)}
                </pre>
            )}
        </main>
    )
}