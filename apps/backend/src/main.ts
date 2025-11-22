import express from 'express';

import { authentication, useAuthentication } from './api/authentication';
import * as https from 'node:https';
import { AppSettings } from './settings';
import * as fs from 'node:fs';
import cors from 'cors';
import { useErrorHandler } from './api/errorHandler';
import { getRecipeList } from './api/recipeList';
import { getRecipe } from './api/recipe';

const app = express();

app.use(cors());
app.use(useErrorHandler);
app.use(express.json());

app.use('/api/authentication', authentication);
app.get('/api/recipe/list', useAuthentication, (req, res) => {
  res.json(getRecipeList());
});

app.get('/api/recipe/:id', useAuthentication, (req, res) => {
  res.json(getRecipe(req.params.id));
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
