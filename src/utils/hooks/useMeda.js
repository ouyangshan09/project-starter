import { useEffect, useState } from 'react';

/**
 * 查询CSS Media状态
 * @param {string} query
 * @param {boolean} defaultState [default: false]
*/
const useMedia = (query, defaultState = false) => {
    const [state, setState] = useState(defaultState);

    useEffect(() => {
        let mounted = true;
        const mql = window.matchMedia(query);
        const onChange = () => {
            if (!mounted) {
                return;
            }
            setState(!!mql.matches);
        };

        mql.addEventListener(onChange);
        setState(mql.matches);

        return () => {
            mounted = false;
            mql.removeEventListener(onChange);
        }
    }, [query]);

    return state;
}

export default useMedia;
