import type { ExecutorContext } from '@nrwl/devkit';
import type { BuildExecutorOptions } from './schema';
export declare function buildExecutor(options: BuildExecutorOptions, context: ExecutorContext): Promise<{
    success: boolean;
}>;
export default buildExecutor;
