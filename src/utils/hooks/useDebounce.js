/**
 * Credit: https://usehooks.com/useDebounce/
 * A hook that allows to debounce any fast changing value.
 * @param {*} value – value to debounce.
 * @param {number} [delay=0] – delay in milliseconds.
 */

import { useEffect, useState } from 'react';

const useDebounce = (value, delay = 0) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => setDebouncedValue(value), delay);

        return () => clearTimeout(handler);
    }, [value, delay]);

    return debouncedValue;
};

export default useDebounce;
