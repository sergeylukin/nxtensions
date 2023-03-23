"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkExecutor = void 0;
const devkit_1 = require("@nrwl/devkit");
const child_process_1 = require("child_process");
let childProcess;
async function checkExecutor(_options, context) {
    const projectRoot = context.workspace.projects[context.projectName].root;
    try {
        const exitCode = await runCliCheck(context.root, projectRoot);
        return { success: exitCode === 0 };
    }
    catch (e) {
        devkit_1.logger.error(e);
        return { success: false };
    }
    finally {
        if (childProcess) {
            childProcess.kill();
        }
    }
}
exports.checkExecutor = checkExecutor;
exports.default = checkExecutor;
function runCliCheck(workspaceRoot, projectRoot) {
    return new Promise((resolve, reject) => {
        // TODO: use Astro CLI API once it's available.
        // See https://github.com/snowpackjs/astro/issues/1483.
        childProcess = (0, child_process_1.fork)(require.resolve('astro'), ['check', ...getAstroBuildArgs(projectRoot)], {
            cwd: workspaceRoot,
            stdio: 'inherit',
        });
        // Ensure the child process is killed when the parent exits
        process.on('exit', () => childProcess.kill());
        process.on('SIGTERM', () => childProcess.kill());
        childProcess.on('error', (err) => {
            reject(err);
        });
        childProcess.on('exit', (code) => {
            if (code === 0) {
                resolve(code);
            }
            else {
                reject(code);
            }
        });
    });
}
function getAstroBuildArgs(projectRoot) {
    const args = ['--root', projectRoot];
    return args;
}
//# sourceMappingURL=executor.js.map