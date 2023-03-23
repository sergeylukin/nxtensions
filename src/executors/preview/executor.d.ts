import { ExecutorContext } from '@nrwl/devkit';
import { PreviewExecutorOptions } from './schema';
export declare function previewExecutor(options: PreviewExecutorOptions, context: ExecutorContext): AsyncGenerator<{
    baseUrl?: string;
    success: boolean;
}>;
export default previewExecutor;
