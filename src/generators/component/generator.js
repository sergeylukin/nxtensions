"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.componentGenerator = void 0;
const devkit_1 = require("@nrwl/devkit");
const utilities_1 = require("./utilities");
async function componentGenerator(tree, rawOptions) {
    const options = (0, utilities_1.normalizeOptions)(tree, rawOptions);
    (0, utilities_1.addComponentFile)(tree, options);
    const styleTask = (0, utilities_1.addStyleDependencies)(tree, options);
    await (0, devkit_1.formatFiles)(tree);
    return styleTask;
}
exports.componentGenerator = componentGenerator;
exports.default = componentGenerator;
//# sourceMappingURL=generator.js.map