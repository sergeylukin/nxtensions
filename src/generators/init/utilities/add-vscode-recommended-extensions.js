"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addVSCodeRecommendedExtensions = void 0;
const devkit_1 = require("@nrwl/devkit");
function addVSCodeRecommendedExtensions(tree) {
    if (!tree.exists('.vscode/extensions.json')) {
        return;
    }
    (0, devkit_1.updateJson)(tree, '.vscode/extensions.json', (json) => {
        var _a;
        (_a = json.recommendations) !== null && _a !== void 0 ? _a : (json.recommendations = []);
        const extension = 'astro-build.astro-vscode';
        if (!json.recommendations.includes(extension)) {
            json.recommendations.push(extension);
        }
        return json;
    });
}
exports.addVSCodeRecommendedExtensions = addVSCodeRecommendedExtensions;
//# sourceMappingURL=add-vscode-recommended-extensions.js.map