"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.syncExecutor = void 0;
const devkit_1 = require("@nrwl/devkit");
const child_process_1 = require("child_process");
const semver_1 = require("semver");
const versions_1 = require("../../utilities/versions");
let childProcess;
async function syncExecutor(_options, context) {
    const astroVersion = (0, versions_1.getInstalledAstroVersion)();
    if (astroVersion && (0, semver_1.lt)(astroVersion, '1.8.0')) {
        throw new Error(`The Astro "sync" CLI command is only available from version 1.8.0. Your installed version is "${astroVersion}".`);
    }
    const projectRoot = context.workspace.projects[context.projectName].root;
    try {
        const exitCode = await runCliSync(context.root, projectRoot);
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
exports.syncExecutor = syncExecutor;
exports.default = syncExecutor;
function runCliSync(workspaceRoot, projectRoot) {
    return new Promise((resolve, reject) => {
        childProcess = (0, child_process_1.fork)(require.resolve('astro'), ['sync', ...getAstroBuildArgs(projectRoot)], {
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