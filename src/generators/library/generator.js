"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.libraryGenerator = void 0;
const devkit_1 = require("@nrwl/devkit");
const generator_1 = require("../init/generator");
const utilities_1 = require("./utilities");
async function libraryGenerator(tree, rawOptions) {
    if (rawOptions.publishable && !rawOptions.importPath) {
        throw new Error('For publishable libraries the "--importPath" must be provided. Please note it needs to be a valid npm package name (e.g. my-lib or @my-org/my-lib).');
    }
    const options = (0, utilities_1.normalizeOptions)(tree, rawOptions);
    const initTask = await (0, generator_1.initGenerator)(tree, { addCypressTests: false });
    (0, utilities_1.addProject)(tree, options);
    (0, utilities_1.addFiles)(tree, options);
    (0, utilities_1.addPathMapping)(tree, options);
    await (0, devkit_1.formatFiles)(tree);
    return initTask;
}
exports.libraryGenerator = libraryGenerator;
exports.default = libraryGenerator;
//# sourceMappingURL=generator.js.map