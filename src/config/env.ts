interface RuntimeEnv {
  BACKEND_URL: string;
}

function createEnv(): RuntimeEnv {
  const config: Partial<RuntimeEnv> = {
    BACKEND_URL: 'http://localhost:8000/api',
  };

  for (const [key, value] of Object.entries(config)) {
    if (value === undefined) {
      throw new Error(`Environment variable ${key} is not defined.`);
    }
  }

  return config as RuntimeEnv;
}

export const runtimeEnv = createEnv();
