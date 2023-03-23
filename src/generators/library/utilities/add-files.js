"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addFiles = void 0;
const devkit_1 = require("@nrwl/devkit");
function addFiles(tree, options) {
    (0, devkit_1.generateFiles)(tree, (0, devkit_1.joinPathFragments)(__dirname, '..', 'files'), options.projectRoot, {
        ...options,
        ...(0, devkit_1.names)(options.name),
        offsetFromRoot: (0, devkit_1.offsetFromRoot)(options.projectRoot),
        tmpl: '',
    });
    if (!options.publishable) {
        tree.delete((0, devkit_1.joinPathFragments)(options.projectRoot, 'package.json'));
    }
}
exports.addFiles = addFiles;
//# sourceMappingURL=add-files.js.map