import { ExecutorContext, readJsonFile, writeJsonFile } from '@nrwl/devkit';
import { readFile } from 'fs/promises';

export interface PackageJsonUpdaterOptions {
    scripts: {
        [key: string]: string;
    };
    engines: {
        node: string;
        npm: string;
    };
}

export default async function updatePJExecutor(options: PackageJsonUpdaterOptions, context: ExecutorContext) {
    // const packPath = `./dist/apps/${context.projectName}/package.json`;
    const packPath = `./dist/package.json`;
    const packJson = await readJsonFile(packPath);
    const { node, npm } = options.engines;
    packJson.engines = { node, npm };
    packJson.scripts = options.scripts;
    writeJsonFile(packPath, packJson);
    return { success: true };
}
