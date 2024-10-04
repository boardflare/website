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
            <p><b>{supportsF16 ? 'This computer should work with Local GPT' : 'This computer will NOT work with Local GPT'}</b></p>
        </div>
    );
};