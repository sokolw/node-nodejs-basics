const prefix = 'RSS_';

export const parseEnv = () => {
  const result = [];
  for (const key in process.env) {
    if (new RegExp(`^${prefix}`).test(key)){
      result.push(`${key}=${process.env[key]}`);
    }
  }

  console.log(result.join('; '));
};

// call function for test
parseEnv();