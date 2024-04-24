import { useState, useEffect, useRef, useCallback } from 'react'

export function Senticsv() {

    const [result, setResult] = useState([]);
    const [ready, setReady] = useState(null);
    const [file, setFile] = useState(null);
    const worker = useRef(null);

    useEffect(() => {
        if (!worker.current) {
            worker.current = new Worker(new URL('@/components/worker.js', import.meta.url), {
                type: 'module'
            });
        }

        const onMessageReceived = (e) => {
            switch (e.data.status) {
                case 'initiate':
                    setReady(false);
                    break;
                case 'ready':
                    setReady(true);
                    break;
                case 'complete':
                    setResult(prevResults => [...prevResults, { text: e.data.text, output: e.data.output[0] }]);
                    break;
            }
        };

        worker.current.addEventListener('message', onMessageReceived);

        return () => worker.current.removeEventListener('message', onMessageReceived);
    });

    const classify = useCallback((texts) => {
        if (worker.current) {
            texts.forEach((text, index) => worker.current.postMessage({ text, index }));
        }
    }, []);

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
            const lines = e.target.result.split('\n');
            classify(lines);
        };
        reader.readAsText(file);
    };

    return (
        <main className="flex flex-col items-center justify-center p-10">
            <input
                type="file"
                accept=".csv"
                onChange={handleFileUpload}
            />

            {ready !== null && (
                <table className="bg-gray-100 p-2 rounded">
                    <thead>
                        <tr>
                            <th>Original Text</th>
                            <th>Text</th>
                            <th>Result</th>
                        </tr>
                    </thead>
                    <tbody>
                        {result.map((res, index) => (
                            <tr key={index}>
                                <td>{res.text}</td>
                                <td>{res.output.label}</td>
                                <td>{res.output.score}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </main>
    )
}