import { useLayoutEffect, useState } from 'react';

type ScreenSize = [number, number];

export const useMediaQuery = () => {
    const [screenSize, setScreenSize] = useState<ScreenSize>([0, 0]);

    useLayoutEffect(() => {
        const updateScreenSize = () => setScreenSize([window.innerWidth, window.innerHeight]);

        window.addEventListener('resize', updateScreenSize);

        updateScreenSize();
        return () => window.removeEventListener('resize', updateScreenSize);
    }, []);

    return screenSize;
};
