"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeOptions = void 0;
const devkit_1 = require("@nrwl/devkit");
function normalizeOptions(tree, options) {
    var _a, _b;
    const project = (0, devkit_1.readProjectConfiguration)(tree, options.project);
    let directory;
    if (options.directory) {
        directory = (0, devkit_1.joinPathFragments)(project.root, options.directory);
    }
    else if (project.projectType === 'library') {
        directory = (0, devkit_1.joinPathFragments)(project.root, 'src', 'lib');
    }
    else {
        directory = (0, devkit_1.joinPathFragments)(project.root, 'src', 'components');
    }
    return {
        ...options,
        capitalizeName: (_a = options.capitalizeName) !== null && _a !== void 0 ? _a : true,
        directory,
        style: (_b = options.style) !== null && _b !== void 0 ? _b : 'css',
    };
}
exports.normalizeOptions = normalizeOptions;
//# sourceMappingURL=normalize-options.js.map