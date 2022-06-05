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

// cmd, not powershell! -> set RSS_name1=value1&&set RSS_name2=value2&&node env.js
parseEnv();