export type SettingName = string | number;
type AppSettings<T extends SettingName> = { [key in T]: string };

export type EnvTable = { [key: string]: string | undefined };

/**
 * Extracts app settings from environment variables.
 * @param variables - The names of the variables to extract.
 * @param envArray - The environment variables to extract from. By default, it uses `process.env` from Node.
 * @returns An object containing the extracted settings.
 * @throws {Error} If any of the required variables are missing.
 */
export function extractAppSettingsFromEnv<T extends SettingName>(
  variables: readonly T[],
  envArray: EnvTable = process.env
): AppSettings<T> {
  const missingVariables: T[] = [];
  const settings: AppSettings<T> = {} as AppSettings<T>;

  for (const variable of variables) {
    if (!envArray[variable]) {
      missingVariables.push(variable as T);
    } else {
      settings[variable as T] = envArray[variable] as string;
    }
  }

  if (missingVariables.length > 0) {
    throw new Error(
      `Missing required variables: ${missingVariables.join(', ')}`
    );
  }

  return settings;
}
