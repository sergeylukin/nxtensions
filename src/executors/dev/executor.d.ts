import type { ExecutorContext } from '@nrwl/devkit';
import type { DevExecutorOptions } from './schema';
export declare function devExecutor(options: DevExecutorOptions, context: ExecutorContext): AsyncGenerator<{
    baseUrl?: string;
    success: boolean;
}>;
export default devExecutor;
