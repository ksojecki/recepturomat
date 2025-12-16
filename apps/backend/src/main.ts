import express from 'express';

import { authentication, useAuthentication } from './api/authentication';
import * as https from 'node:https';
import { AppSettings } from './settings';
import * as fs from 'node:fs';
import cors from 'cors';
import { useErrorHandler } from './api/errorHandler';
import { getRecipeList } from './api/recipeList';
import { getRecipe } from './api/recipe';
import { ApiResponse } from '@recepturomat/data-model';

const app = express();

app.use(cors());
app.use(useErrorHandler);
app.use(express.json());

app.use('/api/authentication', authentication);
app.get('/api/recipe/list', useAuthentication, async (req, res) => {
  const recipes = await getRecipeList();
  res.json(recipes);
});

app.get('/api/recipe/:id', useAuthentication, async (req, res) => {
  const recipe = await getRecipe(req.params.id);
  res.json(recipe);
});

app.delete('/api/recipe/:id', useAuthentication, async (req, res) => {
  res.json({
    type: 'success',
    data: undefined,
  } satisfies ApiResponse<undefined>);
});

const port = process.env.PORT || 3333;

const httpsServer = https.createServer(
  {
    key: fs.readFileSync(AppSettings.HTTPS_KEY),
    cert: fs.readFileSync(AppSettings.HTTPS_CERT),
  },
  app
);

httpsServer.on('listening', () => console.log(`Listening on port ${port}`));
httpsServer.on('error', console.error);
httpsServer.on('clientError', console.error);
httpsServer.listen(port);
