"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const devkit_1 = require("@nrwl/devkit");
const path_1 = require("path");
async function default_1(tree) {
    const projects = (0, devkit_1.getProjects)(tree);
    let hasAstroProject = false;
    for (const [projectName, project] of projects) {
        if (!isAstroProject(tree, project)) {
            continue;
        }
        hasAstroProject = true;
        project.targets = {
            ...project.targets,
            check: { executor: '@nxtensions/astro:check' },
        };
        (0, devkit_1.updateProjectConfiguration)(tree, projectName, project);
    }
    if (hasAstroProject) {
        addCacheableOperation(tree);
        await (0, devkit_1.formatFiles)(tree);
    }
}
exports.default = default_1;
function addCacheableOperation(tree) {
    const workspace = (0, devkit_1.readWorkspaceConfiguration)(tree);
    if (!workspace.tasksRunnerOptions) {
        return;
    }
    Object.keys(workspace.tasksRunnerOptions).forEach((taskRunnerName) => {
        var _a, _b, _c;
        const taskRunner = workspace.tasksRunnerOptions[taskRunnerName];
        taskRunner.options = {
            ...((_a = taskRunner.options) !== null && _a !== void 0 ? _a : {}),
            cacheableOperations: Array.from(new Set([...((_c = (_b = taskRunner.options) === null || _b === void 0 ? void 0 : _b.cacheableOperations) !== null && _c !== void 0 ? _c : []), 'check'])),
        };
    });
    (0, devkit_1.updateWorkspaceConfiguration)(tree, workspace);
}
function isAstroProject(tree, project) {
    var _a, _b;
    if (project.projectType === 'application') {
        return Object.values((_a = project.targets) !== null && _a !== void 0 ? _a : {}).some((target) => target.executor.startsWith('@nxtensions/astro:'));
    }
    // currently, libs don't have any targets, try to find Astro files
    return doesProjectContainAstroFiles(tree, (_b = project.sourceRoot) !== null && _b !== void 0 ? _b : project.root);
}
function doesProjectContainAstroFiles(tree, dirPath) {
    for (const child of tree.children(dirPath)) {
        const fullPath = (0, path_1.join)(dirPath, child);
        if (tree.isFile(fullPath)) {
            if ((0, path_1.extname)(fullPath) === '.astro') {
                return true;
            }
        }
        else {
            const result = doesProjectContainAstroFiles(tree, fullPath);
            if (result) {
                return true;
            }
        }
    }
    return false;
}
//# sourceMappingURL=add-check-target.js.map