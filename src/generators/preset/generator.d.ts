import type { GeneratorCallback, Tree } from '@nrwl/devkit';
import type { GeneratorOptions } from './schema';
export default function (tree: Tree, options: GeneratorOptions): Promise<GeneratorCallback | void>;
