export type Ingredient = {
  name: string;
  amount: number;
  unit: 'g' | 'ml' | 'pcs';
  recipeId?: string;
};

export type IngredientListEntry = Pick<Ingredient, 'name' | 'unit'>;
