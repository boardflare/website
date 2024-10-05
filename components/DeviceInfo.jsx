import { useEffect, useState } from 'react';

export function DeviceInfo() {
    const [supportsF16, setSupportsF16] = useState(false);

    useEffect(() => {
        const fetchDeviceInfo = async () => {
            const adapter = await navigator.gpu.requestAdapter();
            const supportsF16 = adapter?.features.has('shader-f16');
            setSupportsF16(supportsF16);
            console.log('supportsF16', supportsF16);
        };

        fetchDeviceInfo();
    }, []);

    return (
        <div>
            <p>
                {supportsF16 ? 'WebGPU with shader-f16 is supported in this browser' : <span>WebGPU with shader-f16 is <strong>NOT</strong> supported in this browser</span>}
            </p>
        </div>
    );
};