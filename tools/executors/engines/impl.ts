import { ExecutorContext, readJsonFile, writeJsonFile } from '@nrwl/devkit';
import { readFile } from 'fs/promises';

export interface EnginesExecutorOptions {
  engines: {
    node: string;
    npm: string;
  };
}

export default async function enginesExecutor(
  options: EnginesExecutorOptions,
  context: ExecutorContext
) {
  const packPath = `./dist/apps/${context.projectName}/package.json`;
  const packJson = await readJsonFile(packPath);
  const { node, npm } = options.engines;
  packJson.engines = { node, npm };
  await writeJsonFile(packPath, packJson);
  return { success: true };
}
