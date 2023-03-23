"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const devkit_1 = require("@nrwl/devkit");
const generator_1 = tslib_1.__importDefault(require("../application/generator"));
async function default_1(tree, options) {
    const applicationTask = await (0, generator_1.default)(tree, {
        name: options.astroAppName,
        addCypressTests: false,
        tags: options.tags,
    });
    await (0, devkit_1.formatFiles)(tree);
    return applicationTask;
}
exports.default = default_1;
//# sourceMappingURL=generator.js.map