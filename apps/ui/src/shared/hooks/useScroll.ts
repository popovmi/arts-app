import { useEffect } from 'react';

export const useScroll = (selector: string, callback: () => void) => {
    let lastScrollTop = 0;

    useEffect(() => {
        const elem: Element = document.querySelector(selector)!;

        const scrollListener = (event: Event) => {
            const scrollHeight = elem.scrollHeight;
            const scrollTop = elem.scrollTop;
            const clientHeight = elem.clientHeight;
            const diff = Math.floor(scrollHeight - (scrollTop + clientHeight));
            if (diff < 10 && scrollTop > lastScrollTop) {
                lastScrollTop = scrollTop;
                callback();
            }
        };

        elem.addEventListener('scroll', scrollListener);

        return () => elem.removeEventListener('scroll', scrollListener);
    }, []);
};
