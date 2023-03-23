"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateWorkspaceConfiguration = void 0;
const devkit_1 = require("@nrwl/devkit");
const semver_1 = require("semver");
function updateWorkspaceConfiguration(tree) {
    var _a;
    const workspace = (0, devkit_1.readWorkspaceConfiguration)(tree);
    if (workspace.tasksRunnerOptions) {
        Object.keys(workspace.tasksRunnerOptions).forEach((taskRunnerName) => {
            var _a, _b, _c, _d, _e;
            const taskRunner = workspace.tasksRunnerOptions[taskRunnerName];
            if (!((_b = (_a = taskRunner.options) === null || _a === void 0 ? void 0 : _a.cacheableOperations) === null || _b === void 0 ? void 0 : _b.includes('check'))) {
                taskRunner.options = {
                    ...((_c = taskRunner.options) !== null && _c !== void 0 ? _c : {}),
                    cacheableOperations: [
                        ...((_e = (_d = taskRunner.options) === null || _d === void 0 ? void 0 : _d.cacheableOperations) !== null && _e !== void 0 ? _e : []),
                        'check',
                    ],
                };
            }
        });
    }
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { version: nxVersion } = require('nx/package.json');
    // inputs config started to be generated in Nx v14.7.0
    if ((0, semver_1.gte)(nxVersion, '14.7.0') &&
        workspace.targetDefaults &&
        ((_a = workspace.namedInputs) === null || _a === void 0 ? void 0 : _a.production) &&
        !workspace.targetDefaults.check) {
        workspace.targetDefaults.check = { inputs: ['production', '^production'] };
    }
    (0, devkit_1.updateWorkspaceConfiguration)(tree, workspace);
}
exports.updateWorkspaceConfiguration = updateWorkspaceConfiguration;
//# sourceMappingURL=update-workspace-configuration.js.map