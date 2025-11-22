import { useCallback, useEffect, useState } from 'react';

export function useLocalState<T>(key: string) {
  const [value, setValue] = useState<T | undefined>(undefined);

  const remove = useCallback(() => {
    localStorage.removeItem(key);
    setValue(undefined);
  }, [key]);

  const set = useCallback(
    (value: T) => {
      setValue(undefined);
      localStorage.setItem(key, JSON.stringify(value));
    },
    [key]
  );

  const readValue = useCallback(() => {
    const json = localStorage.getItem(key);
    try {
      setValue(json ? JSON.parse(json) : undefined);
    } catch {
      remove();
    }
  }, [key, remove]);

  useEffect(() => {
    const observeLocalStorage = (event: StorageEvent) => {
      if (event.key === key) {
        readValue();
      }
    };
    readValue();
    window.addEventListener('storage', observeLocalStorage);
    return () => {
      window.removeEventListener('storage', observeLocalStorage);
    };
  }, [key, readValue]);

  return {
    value,
    set,
    remove,
  };
}
