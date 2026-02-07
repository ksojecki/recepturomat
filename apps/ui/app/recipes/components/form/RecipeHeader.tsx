import { Link, useNavigate } from 'react-router';
import { FaArrowLeft, FaArrowUp, FaFloppyDisk, FaCircleXmark } from 'react-icons/fa6';
import { UseFormRegister } from 'react-hook-form';
import { Recipe } from '@recepturomat/data-model';
import { Button } from '@ui/forms/Button.tsx';
import { useTranslation } from '../../../i18n';

interface RecipeHeaderProps {
  recipeId: string | undefined;
  register: UseFormRegister<Recipe>;
}

export function RecipeHeader({ recipeId, register }: RecipeHeaderProps) {
  const navigate = useNavigate();
  const t = useTranslation();

  return (
    <div className="flex flex-col pb-4">
      <div className="flex flex-row space-x-1">
        <Button onClick={() => navigate(-1)}>
          <FaArrowLeft />
        </Button>
        <Link className={'btn'} to="/">
          <FaArrowUp />
        </Link>
        <input
          {...register('name')}
          className="input join-item flex-grow"
          placeholder={t('recipeForm.title')}
        />
        <Link className="btn join-item" to={`/recipe/${recipeId}/`}>
          {t('recipes.cancel')}
          <FaCircleXmark />
        </Link>
        <Button type="submit" className="btn btn-success join-item">
          {t('recipes.save')}
          <FaFloppyDisk />
        </Button>
      </div>
    </div>
  );
}

