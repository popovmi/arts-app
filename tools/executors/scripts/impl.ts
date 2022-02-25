import { ExecutorContext, readJsonFile, writeJsonFile } from '@nrwl/devkit';

export interface EnginesExecutorOptions {
  scripts: {
    [key: string]: string;
  };
}

export default async function enginesExecutor(
  options: EnginesExecutorOptions,
  context: ExecutorContext
) {
  const packPath = `./dist/apps/${context.projectName}/package.json`;
  const packJson = await readJsonFile(packPath);
  packJson.scripts = options.scripts;
  writeJsonFile(packPath, packJson);
  return { success: true };
}
