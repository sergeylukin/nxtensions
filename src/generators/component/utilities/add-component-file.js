"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addComponentFile = void 0;
const devkit_1 = require("@nrwl/devkit");
function addComponentFile(tree, options) {
    const componentNames = (0, devkit_1.names)(options.name);
    (0, devkit_1.generateFiles)(tree, (0, devkit_1.joinPathFragments)(__dirname, '..', 'files'), options.directory, {
        ...options,
        ...componentNames,
        componentFilename: options.capitalizeName
            ? componentNames.className
            : options.name,
        tmpl: '',
    });
}
exports.addComponentFile = addComponentFile;
//# sourceMappingURL=add-component-file.js.map