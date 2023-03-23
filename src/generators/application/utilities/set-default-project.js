"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setDefaultProject = void 0;
const devkit_1 = require("@nrwl/devkit");
function setDefaultProject(tree, projectName) {
    const workspace = (0, devkit_1.readWorkspaceConfiguration)(tree);
    if (!workspace.defaultProject) {
        workspace.defaultProject = projectName;
        (0, devkit_1.updateWorkspaceConfiguration)(tree, workspace);
    }
}
exports.setDefaultProject = setDefaultProject;
//# sourceMappingURL=set-default-project.js.map