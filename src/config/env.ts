const getEnvironmentVariable = (envRef: string): string => {
  const envValue = process.env.API_USERS_URL;

  if (!envValue) {
    throw new Error(`Environment variable ${envRef} not found`);
  }

  return envValue;
};

const config = {
  API: {
    users: {
      url: () => getEnvironmentVariable("API_USERS_URL"),
    },
  },
};

export default config;
