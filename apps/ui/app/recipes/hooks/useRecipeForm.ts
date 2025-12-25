import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Recipe, RecipeSchema } from '@recepturomat/data-model';

export function useRecipeForm(recipe: Recipe | undefined) {
  const { register, control, setValue, handleSubmit } = useForm<Recipe>({
    resolver: zodResolver(RecipeSchema),
    values: recipe,
    reValidateMode: 'onBlur',
  });

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  return {
    register,
    control,
    setValue,
    onSubmit,
  };
}

