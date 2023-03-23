"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addFiles = void 0;
const devkit_1 = require("@nrwl/devkit");
function addFiles(tree, options) {
    const rootOffset = (0, devkit_1.offsetFromRoot)(options.projectRoot);
    (0, devkit_1.generateFiles)(tree, (0, devkit_1.joinPathFragments)(__dirname, '..', 'files', 'project'), options.projectRoot, {
        ...options,
        ...(0, devkit_1.names)(options.name),
        offsetFromRoot: rootOffset,
        outDir: (0, devkit_1.joinPathFragments)(rootOffset, 'dist', options.projectRoot),
        tmpl: '',
    });
    if (options.integrations.find((i) => i.name === 'tailwind')) {
        (0, devkit_1.generateFiles)(tree, (0, devkit_1.joinPathFragments)(__dirname, '..', 'files', 'tailwind'), options.projectRoot, { tmpl: '' });
    }
}
exports.addFiles = addFiles;
//# sourceMappingURL=add-files.js.map