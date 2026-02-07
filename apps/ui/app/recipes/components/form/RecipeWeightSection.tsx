import { UseFormRegister } from 'react-hook-form';
import { Recipe } from '@recepturomat/data-model';
import { useTranslation } from '../../../i18n';

interface RecipeWeightSectionProps {
  register: UseFormRegister<Recipe>;
}

export function RecipeWeightSection({ register }: RecipeWeightSectionProps) {
  const t = useTranslation();

  return (
    <div className="flex flex-col space-y-2">
      <label className="input flex flex-grow w-full">
        <span className="label">{t('recipeForm.productWeight')}</span>
        <input {...register('defaultWeight')} placeholder={t('recipes.newWeight')} />
        <span className="label">{t('units.g')}</span>
      </label>
    </div>
  );
}

