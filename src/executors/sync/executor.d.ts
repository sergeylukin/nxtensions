import type { ExecutorContext } from '@nrwl/devkit';
import type { SyncExecutorOptions } from './schema';
export declare function syncExecutor(_options: SyncExecutorOptions, context: ExecutorContext): Promise<{
    success: boolean;
}>;
export default syncExecutor;
