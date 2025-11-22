import { Recipe } from '@recepturomat/data-model';

export const MockOfRecipes: Recipe[] = [
  {
    "name": "Krem waniliowy bazowy",
    "recipeId": "base-cream-vanilla",
    "defaultWeight": 500,
    "ingredients": [
      { "name": "Mleko", "amount": 400, "unit": "ml" },
      { "name": "Żółtka", "amount": 80, "unit": "g" },
      { "name": "Cukier", "amount": 80, "unit": "g" },
      { "name": "Mąka ziemniaczana", "amount": 20, "unit": "g" },
      { "name": "Laska wanilii", "amount": 1, "unit": "pcs" }
    ]
  },
  {
    "name": "Krem czekoladowy bazowy",
    "recipeId": "base-cream-chocolate",
    "defaultWeight": 600,
    "ingredients": [
      { "name": "Śmietanka 30%", "amount": 300, "unit": "ml" },
      { "name": "Mleko", "amount": 200, "unit": "ml" },
      { "name": "Czekolada 70%", "amount": 150, "unit": "g" },
      { "name": "Cukier", "amount": 60, "unit": "g" }
    ]
  },
  {
    "name": "Biszkopt bazowy",
    "recipeId": "base-sponge",
    "defaultWeight": 800,
    "ingredients": [
      { "name": "Jajka", "amount": 200, "unit": "g" },
      { "name": "Cukier", "amount": 180, "unit": "g" },
      { "name": "Mąka pszenna", "amount": 180, "unit": "g" },
      { "name": "Mąka ziemniaczana", "amount": 40, "unit": "g" }
    ]
  },
  {
    "name": "Ganache czekoladowy",
    "recipeId": "base-ganache",
    "defaultWeight": 400,
    "ingredients": [
      { "name": "Czekolada 60–70%", "amount": 200, "unit": "g" },
      { "name": "Śmietanka 30%", "amount": 200, "unit": "ml" }
    ]
  },
  {
    "name": "Kruche ciasto bazowe",
    "recipeId": "base-shortcrust",
    "defaultWeight": 600,
    "ingredients": [
      { "name": "Mąka pszenna", "amount": 300, "unit": "g" },
      { "name": "Masło", "amount": 200, "unit": "g" },
      { "name": "Cukier puder", "amount": 80, "unit": "g" },
      { "name": "Jajko", "amount": 1, "unit": "pcs" }
    ]
  },

  ////////////////////////////////////////////////////////////////////////////
  // DESERY
  ////////////////////////////////////////////////////////////////////////////

  {
    "name": "Tarta cytrynowa",
    "recipeId": "dessert-lemon-tart",
    "defaultWeight": 900,
    "ingredients": [
      { "name": "Kruche ciasto (bazowe)", "amount": 400, "unit": "g", "recipeId": "base-shortcrust" },
      { "name": "Masło", "amount": 120, "unit": "g" },
      { "name": "Cukier", "amount": 150, "unit": "g" },
      { "name": "Sok z cytryn", "amount": 150, "unit": "ml" },
      { "name": "Jajka", "amount": 120, "unit": "g" }
    ]
  },
  {
    "name": "Monoporcja czekoladowa z ganache",
    "recipeId": "dessert-choco-monop",
    "defaultWeight": 200,
    "ingredients": [
      { "name": "Ganache czekoladowy", "amount": 80, "unit": "g", "recipeId": "base-ganache" },
      { "name": "Biszkopt", "amount": 40, "unit": "g", "recipeId": "base-sponge" },
      { "name": "Czekolada 70%", "amount": 20, "unit": "g" },
      { "name": "Śmietanka 30%", "amount": 60, "unit": "ml" }
    ]
  },
  {
    "name": "Sernik klasyczny",
    "recipeId": "dessert-cheesecake-classic",
    "defaultWeight": 1500,
    "ingredients": [
      { "name": "Twaróg mielony", "amount": 1000, "unit": "g" },
      { "name": "Cukier", "amount": 250, "unit": "g" },
      { "name": "Jajka", "amount": 200, "unit": "g" },
      { "name": "Masło", "amount": 80, "unit": "g" },
      { "name": "Mąka pszenna", "amount": 30, "unit": "g" }
    ]
  },
  {
    "name": "Brownie czekoladowe",
    "recipeId": "dessert-brownie",
    "defaultWeight": 900,
    "ingredients": [
      { "name": "Masło", "amount": 150, "unit": "g" },
      { "name": "Czekolada 70%", "amount": 200, "unit": "g" },
      { "name": "Cukier", "amount": 200, "unit": "g" },
      { "name": "Mąka pszenna", "amount": 100, "unit": "g" },
      { "name": "Jajka", "amount": 150, "unit": "g" }
    ]
  },
  {
    "name": "Tiramisu",
    "recipeId": "dessert-tiramisu",
    "defaultWeight": 800,
    "ingredients": [
      { "name": "Mascarpone", "amount": 400, "unit": "g" },
      { "name": "Śmietanka 30%", "amount": 200, "unit": "ml" },
      { "name": "Cukier", "amount": 80, "unit": "g" },
      { "name": "Biszkopty podłużne", "amount": 150, "unit": "g" },
      { "name": "Kawa espresso", "amount": 80, "unit": "ml" }
    ]
  },
  {
    "name": "Panna cotta malinowa",
    "recipeId": "dessert-panna-cotta-raspberry",
    "defaultWeight": 300,
    "ingredients": [
      { "name": "Śmietanka 30%", "amount": 200, "unit": "ml" },
      { "name": "Cukier", "amount": 40, "unit": "g" },
      { "name": "Żelatyna", "amount": 6, "unit": "g" },
      { "name": "Maliny", "amount": 80, "unit": "g" }
    ]
  },
  {
    "name": "Beza pavlova mini",
    "recipeId": "dessert-mini-pavlova",
    "defaultWeight": 120,
    "ingredients": [
      { "name": "Białka", "amount": 60, "unit": "g" },
      { "name": "Cukier", "amount": 120, "unit": "g" },
      { "name": "Śmietanka 30%", "amount": 40, "unit": "ml" },
      { "name": "Owoce świeże", "amount": 40, "unit": "g" }
    ]
  },
  {
    "name": "Tarta czekoladowa",
    "recipeId": "dessert-tart-choco",
    "defaultWeight": 850,
    "ingredients": [
      { "name": "Kruche ciasto", "amount": 350, "unit": "g", "recipeId": "base-shortcrust" },
      { "name": "Ganache czekoladowy", "amount": 300, "unit": "g", "recipeId": "base-ganache" },
      { "name": "Czekolada 70%", "amount": 50, "unit": "g" }
    ]
  },
  {
    "name": "Tarta owocowa",
    "recipeId": "dessert-fruit-tart",
    "defaultWeight": 900,
    "ingredients": [
      { "name": "Kruche ciasto", "amount": 350, "unit": "g", "recipeId": "base-shortcrust" },
      { "name": "Krem waniliowy", "amount": 300, "unit": "g", "recipeId": "base-cream-vanilla" },
      { "name": "Owoce świeże", "amount": 250, "unit": "g" }
    ]
  },
  {
    "name": "Kremówka",
    "recipeId": "dessert-kremowka",
    "defaultWeight": 900,
    "ingredients": [
      { "name": "Ciasto francuskie", "amount": 300, "unit": "g" },
      { "name": "Krem waniliowy", "amount": 500, "unit": "g", "recipeId": "base-cream-vanilla" }
    ]
  },
  {
    "name": "Ciasto marchewkowe",
    "recipeId": "dessert-carrot-cake",
    "defaultWeight": 1000,
    "ingredients": [
      { "name": "Marchew", "amount": 250, "unit": "g" },
      { "name": "Cukier", "amount": 150, "unit": "g" },
      { "name": "Mąka pszenna", "amount": 200, "unit": "g" },
      { "name": "Olej", "amount": 120, "unit": "ml" },
      { "name": "Jajka", "amount": 150, "unit": "g" }
    ]
  },
  {
    "name": "Makaronik waniliowy",
    "recipeId": "dessert-macaron-vanilla",
    "defaultWeight": 40,
    "ingredients": [
      { "name": "Białka", "amount": 30, "unit": "g" },
      { "name": "Cukier puder", "amount": 40, "unit": "g" },
      { "name": "Mąka migdałowa", "amount": 40, "unit": "g" },
      { "name": "Krem waniliowy", "amount": 10, "unit": "g", "recipeId": "base-cream-vanilla" }
    ]
  },
  {
    "name": "Suflet czekoladowy",
    "recipeId": "dessert-choco-souffle",
    "defaultWeight": 150,
    "ingredients": [
      { "name": "Czekolada 70%", "amount": 50, "unit": "g" },
      { "name": "Masło", "amount": 20, "unit": "g" },
      { "name": "Jajka", "amount": 100, "unit": "g" },
      { "name": "Cukier", "amount": 20, "unit": "g" }
    ]
  },
  {
    "name": "Tarta słona karmelowa",
    "recipeId": "dessert-salted-caramel-tart",
    "defaultWeight": 900,
    "ingredients": [
      { "name": "Kruche ciasto", "amount": 350, "unit": "g", "recipeId": "base-shortcrust" },
      { "name": "Cukier", "amount": 150, "unit": "g" },
      { "name": "Śmietanka 30%", "amount": 150, "unit": "ml" },
      { "name": "Masło", "amount": 60, "unit": "g" },
      { "name": "Sól", "amount": 2, "unit": "g" }
    ]
  },
  {
    "name": "Babeczki waniliowe",
    "recipeId": "dessert-vanilla-cupcakes",
    "defaultWeight": 400,
    "ingredients": [
      { "name": "Mąka pszenna", "amount": 160, "unit": "g" },
      { "name": "Cukier", "amount": 120, "unit": "g" },
      { "name": "Masło", "amount": 80, "unit": "g" },
      { "name": "Jajka", "amount": 100, "unit": "g" },
      { "name": "Krem waniliowy", "amount": 80, "unit": "g", "recipeId": "base-cream-vanilla" }
    ]
  },
  {
    "name": "Tarta pistacjowa",
    "recipeId": "dessert-pistachio-tart",
    "defaultWeight": 950,
    "ingredients": [
      { "name": "Kruche ciasto", "amount": 350, "unit": "g", "recipeId": "base-shortcrust" },
      { "name": "Pasta pistacjowa", "amount": 100, "unit": "g" },
      { "name": "Śmietanka 30%", "amount": 200, "unit": "ml" },
      { "name": "Cukier", "amount": 80, "unit": "g" },
      { "name": "Masło", "amount": 40, "unit": "g" }
    ]
  },
  {
    "name": "Monoporcja malinowa",
    "recipeId": "dessert-raspberry-monop",
    "defaultWeight": 180,
    "ingredients": [
      { "name": "Biszkopt", "amount": 40, "unit": "g", "recipeId": "base-sponge" },
      { "name": "Maliny", "amount": 60, "unit": "g" },
      { "name": "Krem waniliowy", "amount": 60, "unit": "g", "recipeId": "base-cream-vanilla" }
    ]
  },
  {
    "name": "Ciasto jogurtowe",
    "recipeId": "dessert-yogurt-cake",
    "defaultWeight": 900,
    "ingredients": [
      { "name": "Jogurt naturalny", "amount": 200, "unit": "g" },
      { "name": "Cukier", "amount": 150, "unit": "g" },
      { "name": "Mąka pszenna", "amount": 250, "unit": "g" },
      { "name": "Olej", "amount": 120, "unit": "ml" },
      { "name": "Jajka", "amount": 150, "unit": "g" }
    ]
  },
  {
    "name": "Czekoladowa rolada",
    "recipeId": "dessert-choco-roll",
    "defaultWeight": 1000,
    "ingredients": [
      { "name": "Biszkopt", "amount": 300, "unit": "g", "recipeId": "base-sponge" },
      { "name": "Ganache czekoladowy", "amount": 300, "unit": "g", "recipeId": "base-ganache" },
      { "name": "Dżem malinowy", "amount": 100, "unit": "g" }
    ]
  },
  {
    "name": "Mus czekoladowy",
    "recipeId": "dessert-choco-mousse",
    "defaultWeight": 300,
    "ingredients": [
      { "name": "Czekolada 70%", "amount": 120, "unit": "g" },
      { "name": "Śmietanka 30%", "amount": 150, "unit": "ml" },
      { "name": "Jajka", "amount": 100, "unit": "g" }
    ]
  },
  {
    "name": "Tarta mango",
    "recipeId": "dessert-mango-tart",
    "defaultWeight": 900,
    "ingredients": [
      { "name": "Kruche ciasto", "amount": 350, "unit": "g", "recipeId": "base-shortcrust" },
      { "name": "Puree mango", "amount": 200, "unit": "g" },
      { "name": "Śmietanka 30%", "amount": 150, "unit": "ml" },
      { "name": "Cukier", "amount": 80, "unit": "g" },
      { "name": "Żelatyna", "amount": 6, "unit": "g" }
    ]
  }
]
