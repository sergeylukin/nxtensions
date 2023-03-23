"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addProjectGraphPlugin = void 0;
const devkit_1 = require("@nrwl/devkit");
function addProjectGraphPlugin(tree) {
    var _a;
    const workspace = (0, devkit_1.readWorkspaceConfiguration)(tree);
    (_a = workspace.plugins) !== null && _a !== void 0 ? _a : (workspace.plugins = []);
    if (!workspace.plugins.includes('@nxtensions/astro')) {
        workspace.plugins.push('@nxtensions/astro');
        (0, devkit_1.updateWorkspaceConfiguration)(tree, workspace);
    }
}
exports.addProjectGraphPlugin = addProjectGraphPlugin;
//# sourceMappingURL=add-project-graph-plugin.js.map