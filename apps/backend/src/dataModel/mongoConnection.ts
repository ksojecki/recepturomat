import { AppSettings, AppSettingsType } from '../settings';
import { Db, MongoClient } from 'mongodb';

export type MongoSettings = Pick<
  AppSettingsType,
  'MONGO_URL' | 'MONGO_USER' | 'MONGO_PASSWORD' | 'MONGO_DATABASE'
>;

function getMongoConnection(settings: MongoSettings): Db {
  return new MongoClient(`${settings.MONGO_URL}/${settings.MONGO_DATABASE}`, {
    auth: {
      username: settings.MONGO_USER,
      password: settings.MONGO_PASSWORD,
    },
  }).db(settings.MONGO_DATABASE);
}

export const connection = getMongoConnection(AppSettings);
