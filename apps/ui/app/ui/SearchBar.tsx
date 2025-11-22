import { Button } from '@ui/forms/Button';
import { FaCircleXmark } from 'react-icons/fa6';
import { ChangeEventHandler, useCallback, useState } from 'react';

export type SearchBarProps = { searchQuery?: string | undefined, update: (query: string) => void }

export const SearchBar = ({searchQuery, update}: SearchBarProps) =>  {
  const [value, setValue] = useState(searchQuery ?? '');

  const onChanged: ChangeEventHandler<HTMLInputElement> = useCallback((event) => {
    setValue(event.target.value);
  }, []);

  return (
    <div className="flex flex-col m-4 pb-4">
      <h1 className="text-3xl pb-4 font-bold">Receptury</h1>
      <div className="join w-full">
        <input
          type="text"
          value={value}
          onChange={onChanged}
          placeholder="Szukaj"
          className="input input-bordered join-item"
        />
        <Button className="btn-secondary join-item">
          <FaCircleXmark />
        </Button>
      </div>
    </div>
  );
}
