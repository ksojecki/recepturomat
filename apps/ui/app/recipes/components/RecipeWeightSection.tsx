import { UseFormRegister } from 'react-hook-form';
import { Recipe } from '@recepturomat/data-model';

interface RecipeWeightSectionProps {
  register: UseFormRegister<Recipe>;
}

export function RecipeWeightSection({ register }: RecipeWeightSectionProps) {
  return (
    <div className="flex flex-col space-y-2">
      <label className="input flex flex-grow w-full">
        <span className="label">Waga produktu</span>
        <input {...register('defaultWeight')} placeholder="Nowa waga" />
        <span className="label">g</span>
      </label>
    </div>
  );
}

