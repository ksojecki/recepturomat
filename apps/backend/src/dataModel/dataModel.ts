import { hashPassword } from './users';
import { Collection, Db } from 'mongodb';
import { Settings } from './settings';
import { User } from '@recepturomat/data-model';
import { connection } from './mongoConnection';

const CLEAN_SCHEMA = 0;
const SUPPORTED_SCHEMA = 1;

export type DataModel = {
  readonly users: Collection<User>;
  readonly settings: Collection<Settings>;
};

async function prepareDataModel(db: Db): Promise<DataModel> {
  const currentSchema = await getSchemaVersion(db);

  if (currentSchema > SUPPORTED_SCHEMA) {
    throw new Error(`Current schema ${currentSchema} is higher than ${SUPPORTED_SCHEMA},
      application is not updated or database is corrupted.`);
  }

  await migrateSchema(currentSchema, db);

  return {
    users: db.collection<User>('users'),
    settings: db.collection<Settings>('settings'),
  };
}

async function getSchemaVersion(db: Db): Promise<number> {
  const collections = await db.listCollections().toArray();
  if (!collections.includes({ name: 'settings' })) {
    return CLEAN_SCHEMA;
  } else {
    const settings = await db.collection<Settings>('settings').findOne();
    return settings?.schemaVersion ?? CLEAN_SCHEMA;
  }
}

async function migrateSchema(currentSchema: number, db: Db) {
  if (currentSchema == CLEAN_SCHEMA) {
    const users = await db.createCollection('users', { capped: false });
    await users.createIndex({ username: 'text' }, { unique: true });

    const defaultCredentials = hashPassword({
      username: 'admin',
      password: 'password',
    });

    await users.insertOne({
      ...defaultCredentials,
      email: '',
      forceChangePassword: true,
    });

    const settings = db.collection('settings');
    await settings.createIndex({ id: 'text' }, { unique: true });
    await settings.findOneAndUpdate(
      { id: 'schema' },
      { $set: { schemaVersion: 1 } }
    );
    currentSchema++;
  }
}

export const dataModel = await prepareDataModel(connection);
