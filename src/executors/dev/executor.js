"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.devExecutor = void 0;
const tslib_1 = require("tslib");
const devkit_1 = require("@nrwl/devkit");
const child_process_1 = require("child_process");
const strip_ansi_1 = tslib_1.__importDefault(require("strip-ansi"));
let childProcess;
async function* devExecutor(options, context) {
    var _a;
    const projectRoot = context.workspace.projects[context.projectName].root;
    try {
        const success = await runCliDev(context.root, projectRoot, options);
        // TODO: build url from what's in the Astro config once the CLI API is available.
        // See https://github.com/snowpackjs/astro/issues/1483.
        yield { baseUrl: `http://localhost:${(_a = options.port) !== null && _a !== void 0 ? _a : 3000}`, success };
        // This Promise intentionally never resolves, leaving the process running
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        await new Promise(() => { });
    }
    catch (e) {
        devkit_1.logger.error(e);
        yield { success: false };
    }
    finally {
        if (childProcess) {
            childProcess.kill();
        }
    }
}
exports.devExecutor = devExecutor;
exports.default = devExecutor;
function runCliDev(workspaceRoot, projectRoot, options) {
    return new Promise((resolve, reject) => {
        // TODO: use Astro CLI API once it's available.
        // See https://github.com/snowpackjs/astro/issues/1483.
        childProcess = (0, child_process_1.fork)(require.resolve('astro'), ['dev', ...getAstroDevArgs(projectRoot, options)], {
            cwd: workspaceRoot,
            env: { ...process.env, FORCE_COLOR: 'true' },
            stdio: 'pipe',
        });
        // Ensure the child process is killed when the parent exits
        process.on('exit', () => childProcess.kill());
        process.on('SIGTERM', () => childProcess.kill());
        const serverStartedRegex = /(astro +v\d{1,3}.\d{1,3}.\d{1,3} started in \d+ms|Server started)/;
        childProcess.stdout.on('data', (data) => {
            process.stdout.write(data);
            if (serverStartedRegex.test((0, strip_ansi_1.default)(data.toString()))) {
                resolve(true);
            }
        });
        childProcess.stderr.on('data', (data) => {
            process.stderr.write(data);
        });
        childProcess.on('error', (err) => {
            reject(err);
        });
        childProcess.on('exit', (code) => {
            if (code !== 0) {
                reject(new Error('Could not start Astro Development Server. See errors above.'));
            }
        });
    });
}
function getAstroDevArgs(projectRoot, options) {
    const args = ['--root', projectRoot];
    if (options.config) {
        args.push('--config', options.config);
    }
    if (options.drafts) {
        args.push('--drafts');
    }
    if (options.host !== undefined) {
        if (typeof options.host === 'boolean') {
            args.push(options.host === true ? '--host' : '--no-host');
        }
        else {
            args.push('--host', options.host.toString());
        }
    }
    if (options.port) {
        args.push('--port', options.port.toString());
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