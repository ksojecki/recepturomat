import { Button } from '@ui/forms/Button';
import { FaCircleXmark } from 'react-icons/fa6';
import { ChangeEventHandler, useCallback, useState } from 'react';
import { useTranslation } from '../i18n';

export type SearchBarProps = { searchQuery?: string | undefined, update: (query: string) => void }

export const SearchBar = ({searchQuery, update}: SearchBarProps) =>  {
  const [value, setValue] = useState(searchQuery ?? '');
  const t = useTranslation();

  const onChanged: ChangeEventHandler<HTMLInputElement> = useCallback((event) => {
    setValue(event.target.value);
  }, []);

  return (
    <div className="flex flex-col m-4 pb-4">
      <h1 className="text-3xl pb-4 font-bold">{t('recipes.title')}</h1>
      <div className="join w-full">
        <input
          type="text"
          value={value}
          onChange={onChanged}
          placeholder={t('recipes.search')}
          className="input input-bordered join-item"
        />
        <Button className="btn-secondary join-item">
          <FaCircleXmark />
        </Button>
      </div>
    </div>
  );
}
