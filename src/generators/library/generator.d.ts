import { GeneratorCallback, Tree } from '@nrwl/devkit';
import { GeneratorOptions } from './schema';
export declare function libraryGenerator(tree: Tree, rawOptions: GeneratorOptions): Promise<GeneratorCallback>;
export default libraryGenerator;
