import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';

/**
 * Get user root directory
 * @param dir file path
 */
export function getRootPath(...dir: string[]) {
  return path.resolve(process.cwd(), ...dir);
}

/**
 * 获取当前环境下生效的配置文件名
 */
 function getConfFiles() {
    const script = process.env.npm_lifecycle_script;
    const reg = new RegExp('--mode ([a-z]+)');
    const result = reg.exec(script as string) as any;
    if (result) {
      const mode = result[1] as string;
      return [`.env.${mode}`];
    }
    return ['.env.production'];
  }

/**
 * Get the environment variables starting with the specified prefix
 * @param match prefix
 * @param confFiles ext
 */
export function getEnvConfig(match = 'VITE_GLOB_', confFiles = getConfFiles()) {
  let envConfig = {};
  confFiles.forEach(item => {
    try {
      const env = dotenv.parse(fs.readFileSync(path.resolve(process.cwd(), item)));
      envConfig = { ...envConfig, ...env };
    } catch (e) {
      console.error(`Error in parsing ${item}`, e);
    }
  });
  const reg = new RegExp(`^(${match})`);
  Object.keys(envConfig).forEach(key => {
    if (!reg.test(key)) {
      Reflect.deleteProperty(envConfig, key);
    }
  });
  return envConfig;
}
