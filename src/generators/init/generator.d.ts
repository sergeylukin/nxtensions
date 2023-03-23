import type { GeneratorCallback, Tree } from '@nrwl/devkit';
import type { GeneratorOptions } from './schema';
export declare function initGenerator(tree: Tree, options: GeneratorOptions): Promise<GeneratorCallback>;
export default initGenerator;
