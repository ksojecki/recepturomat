db.createUser({
  user: 'recepturomat_user',
  pwd: 'recepturomat_password',
  roles: [
    {
      role: 'readWrite',
      db: 'recepturomat',
    },
  ],
});

db.createCollection('settings', { capped: false });

db.settings.insert({ id: 'schema', schemaVersion: 0 });
