import { useEffect, useRef, useState } from 'react';

const useScroll = ref => {
    if (process.env.NODE_ENV === 'development') {
        if (typeof ref !== 'object' || typeof ref.current === 'undefined') {
            console.error('`useScroll` expect a single ref argument');
        }
    }

    const frame = useRef(0);
    const [state, setState] = useState({x: 0, y: 0});

    useEffect(() => {
        const hanlder = () => {
            cancelAnimationFrame(frame.current);
            
            frame.current = requestAnimationFrame(() => {
                if (ref.current) {
                    setState({
                        x: ref.current.scrollLeft,
                        x: ref.current.scrollTop,
                    });
                }
            });
        }

        if (ref.current) {
            ref.current.addEventListener('scroll', hanlder, {
                capture: false,
                passive: true,
            });
        }

        return () => {
            if (frame.current) {
                cancelAnimationFrame(frame.current);
            }

            if (ref.current) {
                ref.current.removeEventListener('scroll', hanlder);
            }
        }
    }, [ref.current]);

    return state;
}

export default useScroll;
