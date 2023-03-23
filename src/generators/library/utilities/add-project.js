"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addProject = void 0;
const devkit_1 = require("@nrwl/devkit");
function addProject(tree, options) {
    (0, devkit_1.addProjectConfiguration)(tree, options.projectName, {
        root: options.projectRoot,
        sourceRoot: options.projectRoot,
        projectType: 'library',
        targets: { check: { executor: '@nxtensions/astro:check' } },
        tags: options.tags,
    }, options.standaloneConfig);
}
exports.addProject = addProject;
//# sourceMappingURL=add-project.js.map