"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildExecutor = void 0;
const devkit_1 = require("@nrwl/devkit");
const child_process_1 = require("child_process");
const fs_extra_1 = require("fs-extra");
const path_1 = require("path");
let childProcess;
async function buildExecutor(options, context) {
    var _a, _b;
    options = normalizeOptions(options);
    const projectRoot = context.workspace.projects[context.projectName].root;
    // TODO: use what's in the Astro config once the CLI API is available.
    // See https://github.com/snowpackjs/astro/issues/1483.
    let outputPath = `dist/${projectRoot}`;
    if ((_b = (_a = context.target) === null || _a === void 0 ? void 0 : _a.outputs) === null || _b === void 0 ? void 0 : _b[0]) {
        outputPath = (0, path_1.resolve)(context.target.outputs[0]
            .replace('{workspaceRoot}', context.root)
            .replace('{projectRoot}', projectRoot));
    }
    if (options.deleteOutputPath) {
        (0, fs_extra_1.removeSync)(outputPath);
    }
    try {
        const exitCode = await runCliBuild(context.root, projectRoot, options);
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
exports.buildExecutor = buildExecutor;
exports.default = buildExecutor;
function runCliBuild(workspaceRoot, projectRoot, options) {
    return new Promise((resolve, reject) => {
        // TODO: use Astro CLI API once it's available.
        // See https://github.com/snowpackjs/astro/issues/1483.
        childProcess = (0, child_process_1.fork)(require.resolve('astro'), ['build', ...getAstroBuildArgs(projectRoot, options)], {
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
function normalizeOptions(options) {
    return { deleteOutputPath: true, ...options };
}
function getAstroBuildArgs(projectRoot, options) {
    const args = ['--root', projectRoot];
    if (options.config) {
        args.push('--config', options.config);
    }
    if (options.drafts) {
        args.push('--drafts');
    }
    if (options.host !== undefined) {
        args.push('--host', options.host.toString());
    }
    if (options.silent) {
        args.push('--silent');
    }
    if (options.site) {
        args.push('site', options.site);
    }
    if (options.verbose) {
        args.push('--verbose');
    }
    return args;
}
//# sourceMappingURL=executor.js.map