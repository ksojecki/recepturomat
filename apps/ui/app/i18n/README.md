# Internationalization (i18n)

Simple i18n module for Recepturomat UI.

## Structure

```
i18n/
├── index.tsx           # Core i18n module (provider, hooks, utilities)
├── locales/
│   ├── en.json         # English translations
│   └── pl.json         # Polish translations
└── README.md           # This file
```

## Usage

### 1. Wrap your app with I18nProvider

```tsx
import { I18nProvider } from './i18n';

function App() {
  return (
    <I18nProvider>
      <YourApp />
    </I18nProvider>
  );
}
```

### 2. Use translations in components

```tsx
import { useTranslation } from '../i18n';

function MyComponent() {
  const t = useTranslation();

  return (
    <div>
      <h1>{t('recipes.title')}</h1>
      <button>{t('common.save')}</button>
    </div>
  );
}
```

### 3. Use with parameters

```tsx
const t = useTranslation();

// In JSON: "loggedInAs": "You are logged in as {{username}}"
t('auth.loggedInAs', { username: 'John' });
// Result: "You are logged in as John"
```

### 4. Change locale

```tsx
import { useI18n, AVAILABLE_LOCALES } from '../i18n';

function LanguageSwitcher() {
  const { locale, setLocale } = useI18n();

  return (
    <select value={locale} onChange={(e) => setLocale(e.target.value)}>
      {AVAILABLE_LOCALES.map(({ code, name }) => (
        <option key={code} value={code}>
          {name}
        </option>
      ))}
    </select>
  );
}
```

## Adding New Translations

1. Add new key to both `en.json` and `pl.json`
2. Use dot notation for nested keys (e.g., `recipes.title`)

### Translation Keys Convention

| Prefix | Usage |
|--------|-------|
| `app.*` | Application-wide strings |
| `auth.*` | Authentication-related |
| `menu.*` | Navigation menu items |
| `recipes.*` | Recipe list/view pages |
| `recipeForm.*` | Recipe form fields |
| `units.*` | Measurement units |
| `common.*` | Common UI elements (Yes/No, Save, etc.) |
| `errors.*` | Error messages |

## Default Locale

- Default: `pl` (Polish)
- Stored in localStorage as `recepturomat-locale`
- Falls back to browser language if available

