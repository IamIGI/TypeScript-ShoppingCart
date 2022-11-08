import { useState, useEffect } from 'react';

//This T is taking given type from where useLocalStorage where called,
//for example: useLocalStorage<CartItem[]>("shopping-cart", []); , so the "T" === <CartItem[]>
export function useLocalStorage<T>(key: string, initialValue: T | (() => T)) {
    const [value, setValue] = useState<T>(() => {
        const jsonValue = localStorage.getItem(key);
        if (jsonValue != null) return JSON.parse(jsonValue);
        if (typeof initialValue === 'function') {
            return (initialValue as () => T)();
        } else {
            return initialValue;
        }
    });

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    return [value, setValue] as [typeof value, typeof setValue];
}
