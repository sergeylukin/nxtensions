import type { ExecutorContext } from '@nrwl/devkit';
import type { CheckExecutorOptions } from './schema';
export declare function checkExecutor(_options: CheckExecutorOptions, context: ExecutorContext): Promise<{
    success: boolean;
}>;
export default checkExecutor;
