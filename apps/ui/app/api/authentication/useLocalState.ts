import { useCallback, useEffect, useState } from 'react';

export function useLocalState<T>(key: string) {
  const [value, setValue] = useState<T | undefined>(() => {
    const json = localStorage.getItem(key);
    if (json === null) {
      return undefined;
    }
    return JSON.parse(json) as T;
  });

  const remove = useCallback(() => {
    localStorage.removeItem(key);
    setValue(undefined);
  }, [key]);

  const set = useCallback(
    (newValue: T) => {
      console.log('set', newValue);
      const jsonValue = JSON.stringify(newValue);
      const currentJson = localStorage.getItem(key);

      // Sprawdź czy wartość się rzeczywiście zmienia
      if (currentJson === jsonValue) {
        return;
      }

      localStorage.setItem(key, jsonValue);
      setValue(newValue);
    },
    [key]
  );

  useEffect(() => {
    const observeLocalStorage = (event: StorageEvent) => {
      if (event.key === key) {
        console.log('observeLocalStorage from other tab/window', event.key);
        const json = event.newValue;
        if (json === null) {
          setValue(undefined);
        } else {
          setValue(JSON.parse(json) as T);
        }
      }
    };
    window.addEventListener('storage', observeLocalStorage);
    return () => {
      window.removeEventListener('storage', observeLocalStorage);
    };
  }, [key]);

  return {
    value,
    set,
    remove,
  };
}
