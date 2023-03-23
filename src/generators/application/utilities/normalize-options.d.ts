import type { Tree } from '@nrwl/devkit';
import type { GeneratorOptions, NormalizedGeneratorOptions } from '../schema';
export declare function normalizeOptions(tree: Tree, options: GeneratorOptions): Promise<NormalizedGeneratorOptions>;
export declare function parseNpmName(spec: string): {
    scope?: string;
    name: string;
    subpath?: string;
} | undefined;
